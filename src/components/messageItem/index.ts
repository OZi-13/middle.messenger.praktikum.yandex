import Block, { BlockProps } from '../../framework/Block';
import template from './messageItem.hbs';
import { MessageInHtmlType } from '../../types/messageType';

interface MessageItemProps extends BlockProps, MessageInHtmlType {}

export class MessageItem extends Block {
  constructor(props: MessageItemProps) {

    super({
      ...props,
    });
  }

  render(): string {
    return template;
  }
}
