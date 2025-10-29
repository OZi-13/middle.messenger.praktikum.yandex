import Block, { BlockProps } from '../../framework/Block';
import template from './link.hbs.ts';

interface LinkProps extends BlockProps {
  id?: string;
  class: string;
  href: string;
  text: string;
  onClick?: (e: Event) => void;
}

export class Link extends Block {
  constructor(props: LinkProps) {

    super({
      ...props,
      events: {
        click: (e: Event) => {
          if (props.onClick) {
            props.onClick(e);
          }
        },
      },
    });
  }

  render(): string {
    return template;
  }
}
