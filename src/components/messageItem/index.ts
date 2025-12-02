import Block, { BlockProps } from '../../framework/Block';
import template from './messageItem.hbs';
import { MessageType } from '../../types/messageType';

interface MessageItemProps extends BlockProps, MessageType {}

export class MessageItem extends Block {
    constructor(props: MessageItemProps) {
        const time = new Date(props.time).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        const messageClass = props.isOutgoing ? 'member-2' : 'member-1';

        super({
            ...props,
            time,
            messageClass,
        });
    }

    render(): string {
        return template;
    }
}