import Block, { BlockProps } from '../../framework/Block';
import template from './messageItem.hbs';
import { AppStateType } from '../../types/appType';
import { MessageType } from '../../types/messageType';

interface MessageItemProps extends BlockProps, MessageType {
    isOutgoing: boolean;
}

export class MessageItem extends Block {
    constructor(props: MessageItemProps) {
        // Форматирование времени, определение класса и т.д.
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