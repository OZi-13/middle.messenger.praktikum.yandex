import Block, { BlockProps } from '../../framework/Block';
import template from './chatsListItem.hbs.ts';
import { ChatsListMappedType } from '../../types/chatType';

interface ChatsListItemProps extends BlockProps, ChatsListMappedType {}

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
