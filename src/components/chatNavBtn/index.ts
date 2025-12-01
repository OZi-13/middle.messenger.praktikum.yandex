import Block, { BlockProps } from '../../framework/Block';
import template from './chatNavBtn.hbs';

import modal from '../../utils/Modal';

interface ChatNavBtnProps extends BlockProps {
    chatMenuId: string,
    btnSymbol: string,
}
export class ChatNavBtn extends Block {
  constructor(props: ChatNavBtnProps) {

    super({
        ...props,
        events: {
            click: (event: Event) => {
                event.preventDefault();
                modal.open(props.chatMenuId);
            },
        },
    });
  }

  override render() {
    return template;
  }
}
