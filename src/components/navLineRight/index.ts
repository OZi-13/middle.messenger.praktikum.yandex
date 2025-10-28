import Block, { BlockProps } from '../../framework/Block';
import template from './navLineRight.hbs.ts';

interface NavLineRightProps extends BlockProps {
  nav?: boolean;
  name: string;
  avatar?: boolean;
}

export class NavLineRight extends Block {
  constructor(props: NavLineRightProps) {
    super({
      ...props,
    });
  }

  render(): string {
    return template;
  }
}
