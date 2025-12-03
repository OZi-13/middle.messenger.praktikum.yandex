import Block from '../../framework/Block';
import template from './chatAddForm.hbs.ts';

import { Label } from '../label';
import { Input } from '../input';
import { Button } from '../button';
import { Form } from '../form';
import ChatService from '../../services/chatService';
import { ChatCreateType } from '../../types/chatType.ts';

export class ChatAddForm extends Block {
  constructor() {

    const chatServiceInit = new ChatService(window.store);

    const formChildren = [
      new Label({
        forAttr: 'form-avatar',
        text: 'Название нового чата',
      }),
      new Input({
        id: 'form-title',
        class: 'form-validate',
        name: 'title',
        type: 'text',
      }),
      new Button({
        tag: 'button',
        type: 'submit',
        id: 'form-btn',
        text: 'Загрузить',
      }),
    ];

    super({
      Form: new Form({
        id: 'form',
        class: 'info-box_content',
        children: formChildren,
        onFormSubmit: (data: Record<string, string>) => {
          chatServiceInit.chatCreate(data as ChatCreateType);
        },
      }),
    });
  }

  render(): string {
    return template;
  }
}
