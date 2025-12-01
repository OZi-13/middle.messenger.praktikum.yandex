import Block, { BlockProps } from '../../framework/Block';
import template from './navLineRight.hbs.ts';
import {ChatNavBtn} from "../chatNavBtn";

interface NavLineRightProps extends BlockProps {
  nav?: boolean;
  chatNav?: boolean;
  name: string;
  avatar?: boolean;
}

export class NavLineRight extends Block {
  constructor(props: NavLineRightProps) {
    super({
      ...props,
        ChatNavBtn: new ChatNavBtn(),
    });
  }

  render(): string {
    return template;
  }
}
