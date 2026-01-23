import Block, { BlockProps } from '../../framework/Block';
import template from './chatsListItem.hbs.ts';
import { ChatMappedType } from '../../types/chatType';

interface ChatsListItemProps extends BlockProps, Omit<ChatMappedType, 'events'> {
  isSelected?: boolean;
  events?: Record<string, (e: Event) => void>;
}

export class ChatsListItem extends Block {
  constructor(props: ChatsListItemProps) {
    super({
      ...props,
      attr: {
        class: props.isSelected ? 'active_chat' : '',
      }
    });
  }

  render(): string {
    return template;
  }
}
