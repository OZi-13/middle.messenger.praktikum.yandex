import Block, { BlockProps } from '../../framework/Block';
import template from './navLineRight.hbs.ts';
import {ChatNavBtn} from "../chatNavBtn";

interface NavLineRightProps extends BlockProps {
  nav?: boolean;
  chatNav?: boolean;
  name: string;
  avatar?: boolean;
  users?: string;
}

export class NavLineRight extends Block {
  constructor(props: NavLineRightProps) {
    super({
      ...props,
        ChatNavBtnAdd: new ChatNavBtn({chatMenuId: 'chat_user_add', btnSymbol: '+'}),
        ChatNavBtnDel: new ChatNavBtn({chatMenuId: 'chat_user_del', btnSymbol: '−'}),
        ChatNavBtnDelChat: new ChatNavBtn({chatMenuId: 'chat_delete', btnSymbol: 'x'}),
        Users: 'Пользователи: ' + props.users,
    });
  }

  render(): string {
    return template;
  }
}
