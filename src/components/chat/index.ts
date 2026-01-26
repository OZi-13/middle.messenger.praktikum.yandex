import Block, { BlockProps } from '../../framework/Block';
import template from './chat.hbs.ts';
import { MessageListType } from '../../types/messageType';
import { AppStateType } from '../../types/appType.ts';

import { MessageItem } from '../messageItem';
import { wrapStore } from '../../utils/wrapStore';

const messageComponents = (messages: MessageListType | null) => {
  let currentUserId = 0;

  return messages !== null ?

    Object.values(messages).map((msg, index): MessageItem => {

      if (index === 0) currentUserId = msg.user_id;
      const memberId = msg.user_id !== currentUserId ? 2 : 1;
      const time = new Date(msg.time).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });

      return new MessageItem({
        memberId: memberId,
        content: msg.content,
        time: time,
        is_read: msg.is_read,
        type: msg.type,
      });

    })  : null;
};

type StoreType = Pick<AppStateType, 'user' | 'messages'>;
interface ChatProps extends BlockProps, StoreType {}
class Chat extends Block {
  constructor(props: ChatProps) {

    const messages = messageComponents(props.messages as MessageListType);

    super({
      ...props,
      messages,
    });
  }

  protected override componentDidUpdate(oldProps: ChatProps, newProps: ChatProps): boolean {

    if (oldProps.messages !== newProps.messages) {

      const messages = messageComponents(newProps.messages as MessageListType);
      this.setProps({
        messageComponents: messages,
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
