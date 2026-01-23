import ChatApi from '../api/chatApi';
import { ResponseError } from '../types/apiType';
import  * as ChatType from '../types/chatType';
import modal from '../utils/Modal';
import { ChatsUsersAddType, ChatsUsersToggleType } from '../types/chatType';
import { StoreInterface } from '../types/appType';

export default class ChatService {
  private readonly api: ChatApi;
  private readonly store: StoreInterface;


  constructor(store: StoreInterface) {
    this.api = new ChatApi();
    this.store = store;
  }

  public async chatSelect(chatId: number): Promise<void> {
    this.store.set({
      responseError: null,
    });

    const chats = this.store.get('chats') as ChatType.ChatsListMappedType;
    const chatData = chats[chatId];
    if (chatData) {
      this.store.set({
        selectedChat: {
          id: chatId,
          header: '[ ' + chatData.title + ' ] : :  Загрузка участников...',
          admin: chatData.admin,
          usersCount: 0
        }
      });
    }

    try {
      await this.UsersList(chatId);

    }  catch (error) {
      const reason = (error as ResponseError).reason || 'Неизвестная ошибка выбора чата';
      this.store.set({ responseError: reason });
    }
  }

  private async UsersList(chatId: number): Promise<void> {
    const chatUsers: ChatType.ChatsUsersListResponseType = await this.api.chatUsersList(chatId);

      const chats = this.store.get('chats') as ChatType.ChatsListMappedType;
    const chatData: ChatType.ChatMappedType = chats[chatId];
    const title: string = chatData.title;

    let usersNameString = '';
    let usersCount = 0;

    if (Array.isArray(chatUsers)) {
      usersCount = chatUsers.length;
      if (usersCount > 0) {
        const usersTmp = chatUsers.map(user => {
          return `${user.display_name || user.first_name} (ID: ${user.id})`;
        });
        usersNameString = usersTmp.join(', ');
      }
    }

    const chatSelected: ChatType.ChatSelectedType = {
      id: chatId,
      header: '[ ' + title + ' ] : :  Участники: ' + usersNameString,
      admin: chatData.admin,
      usersCount: usersCount
    };
    this.store.set({ selectedChat: chatSelected });
  }

  private chatsMapping(chats: ChatType.ChatListResponseType): ChatType.ChatsListMappedType {

    return chats.reduce((chats, chat: ChatType.ChatItemType)  => {
      const last_message = chat.last_message;

      chats[chat.id] = {
        id: chat.id,
        title: chat.title,
        last_message_user_name: last_message ? last_message.user.first_name : ': ',
        time: last_message ? last_message.time : '',
        unread_count: chat.unread_count || 0,
        content: last_message ? last_message.content : 'Нет сообщений',
        admin: chat.created_by,
        events: {
          click: (event: Event) => {
            event.preventDefault();
            this.chatSelect(chat.id);
          },
        },
      };
      return chats;
    }, {} as ChatType.ChatsListMappedType);
  }

  public async chatCreate(data: ChatType.ChatCreateType): Promise<void> {
    this.store.set({
      responseError: null,
    });

    try {
      const chatResponse: ChatType.ChatCreateResponseType = await this.api.chatCreate(data);

      const chats: ChatType.ChatListResponseType = await this.api.chatList();
      const chatsMapped: ChatType.ChatsListMappedType = this.chatsMapping(chats);
      this.store.set({ chats: chatsMapped });

      await this.chatSelect(chatResponse.id);
      modal.close();

    } catch (error) {
      const reason = (error as ResponseError).reason || 'Неизвестная ошибка создания чата';
      this.store.set({ responseError: reason });
    }
  }

  public async chatList(): Promise<void> {
    this.store.set({
      responseError: null,
    });

    try {
      const chats: ChatType.ChatListResponseType = await this.api.chatList();
      console.log('chats', chats);
      const chatsMapped: ChatType.ChatsListMappedType = this.chatsMapping(chats);
      this.store.set({ chats: chatsMapped });

    } catch (error) {
      const reason = (error as ResponseError).reason || 'Неизвестная ошибка получения списка чатов';
      this.store.set({ responseError: reason });
    }
  }

  public async chatDelete(): Promise<void> {
    this.store.set({
      responseError: null,
    });
      const chatSelect = this.store.get('selectedChat') as ChatType.ChatSelectedType | null;
      if (!chatSelect) {
          console.warn("Попытка удаления чата, когда selectedChat: null");
          return;
      }
      const chatId = chatSelect.id;
      const chatDeleteData: ChatType.ChatDeleteType = { chatId: chatId };

    try {
      await this.api.chatDelete(chatDeleteData);
      this.store.set({ selectedChat: null, messages: [] });

      modal.close();
      await this.chatList();
    } catch (error) {
      const reason = (error as ResponseError).reason || 'Неизвестная ошибка удаления чата';
      this.store.set({ responseError: reason });
    }
  }

  private chatUsersConverse(data: ChatsUsersAddType, chatId: number): ChatsUsersToggleType {

    let usersArr = [];
    const usersArrayOfStrings = data.users
      .split(',')
      .map(id => id.trim())
      .filter(id => id !== '');
    usersArr = usersArrayOfStrings.map(id => Number(id));

    return {
      users: usersArr,
      chatId: chatId,
    };
  }


  public async chatUserAdd(data: ChatType.ChatsUsersAddType): Promise<void> {
    this.store.set({
      responseError: null,
    });

      try {
          const chatSelect = this.store.get('selectedChat') as ChatType.ChatSelectedType | null;
          if (!chatSelect) {
              console.warn('Попытка добавления пользователя, когда чат не выбран.');
              return;
          }

          const dataOut: ChatType.ChatsUsersToggleType = this.chatUsersConverse(data, chatSelect.id);
          console.log('formUserData data=', dataOut);

          await this.api.chatUsersAdd(dataOut);
          await this.UsersList(chatSelect.id);
          modal.close();

      } catch (error) {
          const reason = (error as ResponseError).reason || 'Неизвестная ошибка добавления пользователя в чат';
          this.store.set({ responseError: reason });
    }
  }

  public async chatUserDelete(data: ChatType.ChatsUsersAddType): Promise<void> {
    this.store.set({
      responseError: null,
    });

      try {
          const chatSelect = this.store.get('selectedChat') as ChatType.ChatSelectedType | null;

          if (!chatSelect) {
              console.warn('Попытка удаления пользователя, когда чат не выбран.');
              return;
          }

          const dataOut: ChatType.ChatsUsersToggleType = this.chatUsersConverse(data, chatSelect.id);
          console.log('formUserData data=', dataOut);

          await this.api.chatUsersDelete(dataOut);
          await this.UsersList(chatSelect.id);
          modal.close();

      } catch (error) {
      const reason = (error as ResponseError).reason || 'Неизвестная ошибка удаления пользователя из чата';
      this.store.set({ responseError: reason });
    }
  }
}
