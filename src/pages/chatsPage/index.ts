import Block, { BlockProps } from '../../framework/Block';
import template from './chatsPage.hbs';
import { chatsListMock, ChatsListMockType } from '../../helpers/mockData';
import './chatsPage.pcss';

import { Header } from '../../components/header';
import { NavLineLeft } from '../../components/navLineLeft';
import { NavLineRight } from '../../components/navLineRight';
import { ChatsListItem } from '../../components/chatsListItem';
import { Chat } from '../../components/chat';
import { Form } from '../../components/form';
import { Input } from '../../components/input';
import { Button } from '../../components/button';

import { ROUTER } from '../../utils/links';
import { wrapRouter } from '../../utils/wrapRouter';
import { wrapStore } from '../../utils/wrapStore';
import { wrapProtected } from '../../utils/wrapProtected';
import ChatService from '../../services/chatService';

import { AppStateType } from '../../types/appType';
import { RouterInterface } from '../../types/routerType';
import {ModalBox} from '../../components/modalBox';
import { ChatAddForm } from '../../components/chatAddForm';

const createChat = (selectedChatId: number | null): Chat | null => {
    return selectedChatId !== null ? new Chat() : null;
};

const createNavLineRight = (chatName: string | null): NavLineRight | null => {
    return chatName !== null ? new NavLineRight({avatar: true, name: chatName}) : null;
};

type StoreType = Pick<AppStateType, 'user' | 'selectedChatId'>;
interface ChatsPageProps extends BlockProps, RouterInterface, StoreType {}

class ChatsPage extends Block {
  constructor(props: ChatsPageProps) {

      const chatServiceInit = new ChatService({
          store: window.store,
          router: window.router,
      });

      const modalBoxInstance = new ModalBox({
          modalContent: new ChatAddForm(),
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

    const ChatsListItems = chatsListMock.map(
      ({ name, last, newCount }: ChatsListMockType) => new ChatsListItem({
          id: 1,
        name,
        last,
        newCount,
        events: {
            click: () => chatServiceInit.chatSelect(1)
        }
      }),
    );

    const UserName: string = props.user?.display_name || props.user?.login || '';
    const ChatTitle: string | null = null; // TODO пока задаём жестко, потом надо из пропсов доставать имя выбранного чата

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
      NavLineRight: createNavLineRight(ChatTitle),
        ModalBtn: new Button({
          tag: 'div',
          id: 'modal-btn',
          class: 'btn btn-blue',
          text: 'Добавить чат',
          onClick: (event: Event) => {
              event.preventDefault();
              modalBoxInstance.modal();
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

        if (oldProps.selectedChatId !== newProps.selectedChatId) {

            const ChatTitle: string | null = 'Тест чата'; // TODO пока задаём жестко, потом надо из пропсов доставать имя выбранного чата

            const newChat = createChat(newProps.selectedChatId as number | null);
            const newNavLineRight = createNavLineRight(ChatTitle as string | null);

            (this as Block).setProps({
                Chat: newChat,
                NavLineRight: newNavLineRight,
            } as Partial<ChatsPageProps>);

            // можно вернуть true, чтобы перерисовать ChatsPage полностью
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
        selectedChatId: state.selectedChatId || null,
    };
};

const ChatsPageRouter = wrapRouter(wrapProtected(wrapStore(mapStateToProps)(ChatsPage)));
export { ChatsPageRouter as ChatsPage };
