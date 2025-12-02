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

        const messageComponents = props.messages.map((msg: MessageType) => {
            return new MessageItem({...msg});
        });

        super({
            ...props,
            messageComponents
        });
    }

    protected override componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {

        if (oldProps.messages !== newProps.messages) {
            const messageComponents = newProps.messages.map((msg: MessageType) => {
                return new MessageItem({...msg});
            });

            this.setProps({
                messageComponents: messageComponents
            });

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
        messages: state.messages || [],
        user: state.user || null,
    };
};

const WrappedChat = wrapStore(mapStateToProps)(Chat);
export { WrappedChat as Chat };
