import Block, { BlockProps } from '../../framework/Block';
import template from './chatsPage.hbs';
import './chatsPage.pcss';

import { Header } from '../../components/header';
import { NavLineLeft } from '../../components/navLineLeft';
import { NavLineRight } from '../../components/navLineRight';
import { ChatsListItem } from '../../components/chatsListItem';
import { Chat } from '../../components/chat';
import { Form } from '../../components/form';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { ChatAddForm } from '../../components/chatAddForm';
import {ModalBox} from '../../components/modalBox';
import modal from '../../utils/modal';

import { ROUTER } from '../../utils/links';
import { wrapRouter } from '../../utils/wrapRouter';
import { wrapStore } from '../../utils/wrapStore';
import { wrapProtected } from '../../utils/wrapProtected';
import ChatService from '../../services/chatService';

import { AppStateType } from '../../types/appType';
import * as Type from '../../types/chatType';
import { RouterInterface } from '../../types/routerType';
import {ChatDeleteType, ChatsItemType, ChatUserResponseType} from "../../types/chatType";
import {ChatNavMenu} from "../../components/chatNavMenu";
import {Label} from "../../components/label";
import * as ChatType from "../../types/chatType.ts";

const createChat = (selectedChatId: number | null): Chat | null => {
    return selectedChatId !== null ? new Chat() : null;
};

const createNavLineRight = (chatName: string | null, propsUsersName: ChatType.ChatUserResponseType[] | null): NavLineRight | null => {
    let usersNameString = '';

    if (propsUsersName) {
        const chatUsers = propsUsersName;

        if (Array.isArray(chatUsers) && chatUsers.length > 0) {
            const namesArray = chatUsers.map(user => user.first_name);
            usersNameString = namesArray.join(', ');
        }
    }
    console.log('usersNameString (в функции):', usersNameString);

    return chatName !== null ? new NavLineRight({avatar: true, name: chatName, chatNav: true, users: usersNameString}) : null;
};

type StoreType = Pick<AppStateType, 'user' | 'selectedChatId' | 'chats' | 'chatUsers'>;
interface ChatsPageProps extends BlockProps, RouterInterface, StoreType {}

class ChatsPage extends Block {
  constructor(props: ChatsPageProps) {

      const chatServiceInit = new ChatService({
          store: window.store,
          router: window.router,
      });

      const formAddUserCld = [
          new Label({
              forAttr: 'form_newuser_id',
              text: 'Добавить пользователя по ID',
          }),
          new Input({
              id: 'form_newuser_id',
              class: 'form-validate',
              name: 'users[]',
              type: 'text'
          }),
          new Button({
              tag: 'button',
              type: 'submit',
              text: 'Добавить'
          })
      ];

      const formDelUserCld = [
          new Label({
              forAttr: 'form_olduser_id',
              text: 'Удалить пользователя по ID',
          }),
          new Input({
              id: 'form_olduser_id',
              class: 'form-validate',
              name: 'users[]',
              type: 'text',
          }),
          new Button({
              tag: 'button',
              type: 'submit',
              text: 'Удалить',
          })
      ];

      const formDeleteCld = [
          new Button({
              tag: 'button',
              type: 'submit',
              text: 'Удалить чат',
          })
      ];

      const modalBoxInstance = new ModalBox({
          id1: 'add_chat',
          id2: 'chat_user_add',
          id3: 'chat_user_del',
          id4: 'chat_delete',
          modalContent1: new ChatAddForm(),
          modalContent2: new Form({
              id: 'form-adduser',
              class: 'info-box_content',
              children: formAddUserCld,
              onFormSubmit: (data: Record<string, string>) => {
                  chatServiceInit.chatUserAdd(data as ChatType.ChatsUsersToggleType);
              },
          }),
          modalContent3: new Form({
              id: 'form-deluser',
              class: 'info-box_content',
              children: formDelUserCld,
              onFormSubmit: (data: Record<string, string>) => {
                  chatServiceInit.chatUserDelete(data as ChatType.ChatsUsersToggleType);
              },
          }),
          modalContent4: new Form({
              id: 'form-chat_delete',
              class: 'info-box_content',
              children: formDeleteCld,
              onFormSubmit: (data: Record<string, string>) => {
                  chatServiceInit.chatDelete(data as ChatType.ChatDeleteType);
              },
          })
      });

    const message = new Input({
      id: 'message',
      class: 'form-validate',
      name: 'message',
      type: 'input',
      placeholder: 'Сообщение',
    });
    const button = new Button({
      tag: 'button',
      type: 'submit',
      id: 'form-btn',
      text: '>',
    });

    chatServiceInit.chatList(); // получаем в стор объект с чатами
    const ChatsListItems = Object.values(props.chats as Type.ChatsListType).map(
      (chat: Type.ChatsItemType) => new ChatsListItem(chat),
    );

    const UserName: string = props.user?.display_name || props.user?.login || '';
    const ChatTitle: string | null =  props.selectedChatId ? props.chats[props.selectedChatId]?.title || null : null;

    super({
      ...props,
      Header: new Header({
        isChatsPage: '1',
      }),
      NavLineLeft: new NavLineLeft({
        name: UserName,
        avatar: true,
        nav: true,
        routerLink: ROUTER.profile,
      }),
      NavLineRight: createNavLineRight(ChatTitle as string, props.chatUsers as ChatType.ChatUserResponseType[]),
      AddChatBtn: new Button({
          tag: 'div',
          id: 'modal-btn',
          class: 'btn btn-blue',
          text: 'Добавить чат',
          onClick: (event: Event) => {
              event.preventDefault();
              modal.open('add_chat');
          },
      }),
      ChatsListItem: ChatsListItems,
      ModalBox: modalBoxInstance,

      Form: new Form({
        id: 'form',
        class: 'chats_bottom',
        template: 'templateMessage',
        message: message,
        button: button,
      }),
      Chat: createChat(props.selectedChatId as number | null)
    });
  }

    protected override componentDidUpdate(oldProps: ChatsPageProps, newProps: ChatsPageProps): boolean {

        if (oldProps.chats !== newProps.chats) {

            const ChatsListItems = Object.values(newProps.chats as Type.ChatsListType).map(
                (chat: Type.ChatsItemType) => new ChatsListItem(chat),
            );

            (this as Block).setProps({
                ChatsListItem: ChatsListItems
            } as Partial<ChatsPageProps>);

            return false;
        }
/*
        if (oldProps.selectedChatId !== newProps.selectedChatId) {
            const ChatTitle: string | null =  newProps.selectedChatId ? newProps.chats[newProps.selectedChatId]?.title || null : null;
            const newChat = createChat(newProps.selectedChatId as number | null);

            const newNavLineRight = createNavLineRight(ChatTitle as string | null, newProps.chatUsers as ChatType.ChatUserResponseType[] | null);

            (this as Block).setProps({
                Chat: newChat,
                NavLineRight: newNavLineRight,
            } as Partial<ChatsPageProps>);

            return false;
        }
*/
        if (oldProps.chatUsers !== newProps.chatUsers) {
            const ChatTitle: string | null =  newProps.selectedChatId
                ? newProps.chats[newProps.selectedChatId]?.title || null
                : 'Чат';

            const newChat = createChat(newProps.selectedChatId as number | null);

            const newNavLineRight = createNavLineRight(
                ChatTitle, newProps.chatUsers as ChatType.ChatUserResponseType[] | null);

            (this as Block).setProps({
                Chat: newChat,
                NavLineRight: newNavLineRight,
            } as Partial<ChatsPageProps>);

            return false;
        }


        return super.componentDidUpdate(oldProps, newProps);
    }

  override render() {
    return template;
  }
}

const mapStateToProps = (state: AppStateType): StoreType =>  {
    return {
        user: state.user,
        chats: state.chats,
        selectedChatId: state.selectedChatId || null,
        chatUsers: state.chatUsers || null,
    };
};

const ChatsPageRouter = wrapRouter(wrapProtected(wrapStore(mapStateToProps)(ChatsPage)));
export { ChatsPageRouter as ChatsPage };
