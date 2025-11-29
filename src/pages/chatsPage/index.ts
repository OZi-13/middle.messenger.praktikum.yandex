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
import { RouterInterface, RouterPropsInterface } from '../../types/routerType';
import {ProfileStoreInterface} from '../../types/userType.ts';
import {ModalBox} from '../../components/modalBox';
import { ChatAddForm } from '../../components/chatAddForm';

interface ChatsProps {
    selectedChatId: number | null;
}
interface ChatsPageProps extends BlockProps, RouterInterface, ProfileStoreInterface, ChatsProps {}

const createChatComponent = (selectedChatId: number | null): Chat | null => {
    return selectedChatId !== null ? new Chat() : null;
};

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

    super({
      ...props,
      Header: new Header({
        isChatsPage: '1',
      }),
      NavLineLeft: new NavLineLeft({
        name: props.userName,
        avatar: true,
        nav: true,
        routerLink: ROUTER.profile,
      }),
      NavLineRight: new NavLineRight({
        nav: true,
        avatar: true,
        name: 'Собеседник',
      }),
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
      Chat: createChatComponent(props.selectedChatId as number | null)
    });
  }

    protected override componentDidUpdate(oldProps: ChatsPageProps, newProps: ChatsPageProps): boolean {

        if (oldProps.selectedChatId !== newProps.selectedChatId) {

            const newChatComponent = createChatComponent(newProps.selectedChatId as number | null);

            (this as Block).setProps({
                Chat: newChatComponent,
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

interface ChatsStoreProps extends ProfileStoreInterface, ChatsProps {}
const mapStateToProps = (state: AppStateType): ChatsStoreProps =>  {
    return {
        user: state.user,
        userName: state.user?.display_name || state.user?.login || '',
        selectedChatId: state.selectedChatId || null,
    };
};

const ChatsPageRouter = wrapRouter(wrapProtected(wrapStore(mapStateToProps)(ChatsPage)));
export { ChatsPageRouter as ChatsPage };
