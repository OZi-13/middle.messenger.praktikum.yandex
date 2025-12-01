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
import {Label} from "../../components/label";
import * as ChatType from "../../types/chatType.ts";

const createChat = (selectedChatId: number | null): Chat | null | '' => {
    return selectedChatId !== null ? new Chat() : '';
};

const createNavLineRight = (selectedChatHeader: string | null): NavLineRight | null | '' => {

    return selectedChatHeader !== null ?
        new NavLineRight({avatar: true, name: selectedChatHeader, chatNav: true}) :
        '';
};

type StoreType = Pick<AppStateType, 'user' | 'chats' | 'selectedChat'>;
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
                  chatServiceInit.chatDelete();
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
      NavLineRight: createNavLineRight(props.selectedChat?.header || null as string | null),
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
      Chat: createChat(props.selectedChat?.id || null as number | null)
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

        if (oldProps.selectedChat !== newProps.selectedChat) {

            const newChat = createChat(newProps.selectedChat?.id || 0 as number);
            const newNavLineRight = createNavLineRight(newProps.selectedChat?.header || null as string);
            console.log('Обновили newChat ' + newChat);
            console.log('Обновили newNavLineRight ' + newNavLineRight);

            (this as Block).setProps({
                Chat: newChat === null ? undefined : newChat,
                NavLineRight: newNavLineRight === null ? undefined : newNavLineRight,
            } as Partial<ChatsPageProps>);

            console.log('Обновили');

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
        selectedChat: state.selectedChat || null,
    };
};

const ChatsPageRouter = wrapRouter(wrapProtected(wrapStore(mapStateToProps)(ChatsPage)));
export { ChatsPageRouter as ChatsPage };
