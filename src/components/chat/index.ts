import Block, {BlockProps} from '../../framework/Block';
import template from './chat.hbs.ts';
import { MessageType } from '../../types/messageType';
import {AppStateType} from "../../types/appType.ts";

import { MessageItem } from '../messageItem';

import { wrapStore } from '../../utils/wrapStore';

type StoreType = Pick<AppStateType, 'user' | 'messages'>;

interface ChatProps extends BlockProps, MessageType, StoreType {}
class Chat extends Block {
    constructor(props: ChatProps) {

        // Создаем массив компонентов сообщений
        const messageComponents = props.messages.map((msg: MessageType) => {
            const isOutgoing = msg.user_id === String(props.user.id); // Сравнение ID

            return new MessageItem({
                ...msg,
                isOutgoing: isOutgoing
            });
        });

        super({
            ...props,
            messageComponents // Передаем массив в HBS
        });
    }

    protected override componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {
        // Основное обновление происходит при смене списка сообщений
        if (oldProps.messages !== newProps.messages) {
            const messageComponents = newProps.messages.map((msg: MessageType) => {
                const isOutgoing = msg.user_id === String(newProps.currentUserId);

                return new MessageItem({
                    ...msg,
                    isOutgoing: isOutgoing
                });
            });

            this.setProps({
                messageComponents: messageComponents
            });

            // Возвращаем false, т.к. мы уже обновили внутренние пропсы
            return false;
        }

        return super.componentDidUpdate(oldProps, newProps);
    }

    render(): string {
        return template;
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        // Предполагаем, что вы храните сообщения в store.messages
        messages: state.messages || [],
        user: state.user || null,
    };
};

// Оборачиваем Chat для получения данных из Store
const WrappedChat = wrapStore(mapStateToProps)(Chat);

export { WrappedChat as Chat };
