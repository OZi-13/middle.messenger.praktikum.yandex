import Block, { BlockProps } from '../../framework/Block';
import template from './chatNavBtn.hbs';

import modal from '../../utils/Modal';

export class ChatNavBtn extends Block {
  constructor() {

    super({
        events: {
            click: (event: Event) => {
                event.preventDefault();
                modal.open('chat_menu');
            },
        },
    });
  }

  override render() {
    return template;
  }
}
