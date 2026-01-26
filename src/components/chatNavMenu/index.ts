import Block from '../../framework/Block';
import template from './chatNavMenu.hbs';
import { Label } from '../label';
import { Input } from '../input';
import { Button } from '../button';
import { Form } from '../form';
import ChatService from '../../services/chatService.ts';
import * as ChatType from '../../types/chatType.ts';

export class ChatNavMenu extends Block {
  constructor() {

    const chatServiceInit = new ChatService(window.store);

    const formChildren1 = [
      new Label({
        forAttr: 'form_newuser_id',
        text: 'Добавить пользователя по ID',
      }),
      new Input({
        id: 'form_newuser_id',
        class: 'form-validate',
        name: 'users[]',
        type: 'text',
      }),
      new Button({
        tag: 'button',
        type: 'submit',
        text: 'Добавить',
      }),
    ];

    const formChildren2 = [
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
      }),
    ];

    super({
      Form1: new Form({
        id: 'form',
        class: 'info-box_content',
        children: formChildren1,
        onFormSubmit: (data: Record<string, string>) => {
          chatServiceInit.chatUserAdd(data as ChatType.ChatsUsersAddType).catch(console.error);
        },
      }),
      Form2: new Form({
        id: 'form',
        class: 'info-box_content',
        children: formChildren2,
        onFormSubmit: (data: Record<string, string>) => {
          chatServiceInit.chatUserDelete(data as ChatType.ChatsUsersAddType).catch(console.error);
        },
      }),
    });
  }

  override render() {
    return template;
  }
}
