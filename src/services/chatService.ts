import ChatApi from '../api/chatApi';
import { ResponseError } from "../types/apiType.ts";
import  * as ChatType from '../types/chatType.ts';
import modal from '../utils/Modal';

interface ChatServiceDependencies {
    store: typeof window.store;
    router: typeof window.router;
}

export default class ChatService {
    private readonly api: ChatApi;
    private readonly store: typeof window.store;
    private readonly router: typeof window.router;

    constructor({ store, router }: ChatServiceDependencies) {
        this.api = new ChatApi();
        this.store = store;
        this.router = router;
    }

    public async chatSelect(chatId: number): Promise<void> {
        this.store.set({
            responseError: null,
        });
        try {
            const chatUsers: ChatType.ChatsUsersListResponseType = await this.api.chatUsersList(chatId);

            const chats = this.store.get('chats');
            const chatData = chats[chatId];
            const title = chatData.title;

            let usersNameString = '';
            if (Array.isArray(chatUsers) && chatUsers.length > 0) {
                const namesArray = chatUsers.map(user => user.first_name);
                usersNameString = namesArray.join(', ');
            }

            const chatSelected = {
                id: chatId,
                header: '[ ' + title + ' ] : :  Участники: ' + usersNameString
            };
            this.store.set({ selectedChat: chatSelected });

        }  catch (error) {
            const reason = (error as ResponseError).reason || 'Неизвестная ошибка выбора чата';
            this.store.set({ responseError: reason });
        }
    }

    private chatsMapping(chats: ChatType.ChatListResponseType): ChatType.ChatsListType {

        return chats.reduce((chats, chat: ChatType.ChatItemType) => {
            const last_message = chat.last_message;

            chats[chat.id] = {
                id: chat.id,
                title: chat.title,
                last_message_user_name: last_message ? last_message.user.first_name : ': ',
                time: last_message ? last_message.time : '',
                unread_count: chat.unread_count || 0,
                content: last_message ? last_message.content : 'Нет сообщений',
                events: {
                    click: (event: Event) => {
                        event.preventDefault();
                        this.chatSelect(chat.id);
                    }
                }
            };
            return chats;
        }, {} as ChatType.ChatsListType);
    }

    public async chatCreate(data: ChatType.ChatCreateType): Promise<void> {
        this.store.set({
            responseError: null,
        });

        try {
            const chatResponse: ChatType.ChatCreateResponseType = await this.api.chatCreate(data);

            const chats: ChatType.ChatListResponseType = await this.api.chatList();
            const chatsMapped: ChatType.ChatsListType = this.chatsMapping(chats as ChatType.ChatListResponseType);
            this.store.set({ chats: chatsMapped });

            await this.chatSelect(chatResponse.id as number);
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
            const chatsMapped: ChatType.ChatsListType = this.chatsMapping(chats as ChatType.ChatListResponseType);
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
        const chatSelect = this.store.get('selectedChat');
        const chatId = chatSelect.id;
        const chatDeleteData: ChatType.ChatDeleteType = { chatId: chatId }
        try {
            await this.api.chatDelete(chatDeleteData);
            this.store.set({ selectedChat: null });

            modal.close();
            await this.chatList();
        } catch (error) {
            const reason = (error as ResponseError).reason || 'Неизвестная ошибка удаления чата';
            this.store.set({ responseError: reason });
        }


    }

    public async chatUserAdd(data: ChatType.ChatsUsersToggleType): Promise<void> {
        this.store.set({
            responseError: null,
        });

        try {
            const chatSelectId = this.store.get('chatSelectId');
            await this.api.chatUsersAdd(data);
            modal.close();

        } catch (error) {
            const reason = (error as ResponseError).reason || 'Неизвестная ошибка добавления пользователя в чат';
            this.store.set({ responseError: reason });
        }
    }

    public async chatUserDelete(data: ChatType.ChatsUsersToggleType): Promise<void> {
        this.store.set({
            responseError: null,
        });

        try {
            await this.api.chatUsersDelete(data);
            modal.close();

        } catch (error) {
            const reason = (error as ResponseError).reason || 'Неизвестная ошибка удаления пользователя из чата';
            this.store.set({ responseError: reason });
        }
    }

    public async chatUserToken(data: string): Promise<void> {
        this.store.set({
            responseError: null,
        });

        try {
            const userToken: ChatType.ChatTokenResponseType = await this.api.chatToken(data as string);

        } catch (error) {
            const reason = (error as ResponseError).reason || 'Неизвестная ошибка получения токена пользователя для чата';
            this.store.set({ responseError: reason });
        }
    }
}
