import Block, { BlockProps } from '../../framework/Block';
import template from './chatsListItem.hbs.ts';
import { ChatsListType } from '../../types/chatType';

interface ChatsListItemProps extends BlockProps, ChatsListType {}

export class ChatsListItem extends Block {
  constructor(props: ChatsListItemProps) {

    super({
      ...props,
    });
  }

  render(): string {
    return template;
  }
}
