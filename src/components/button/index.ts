import Block, { BlockProps } from '../../framework/Block';
import template from './button.hbs';

interface ButtonProps extends BlockProps {
  tag: string,
  id?: string,
  class?: string,
  type?: string,
  dataPage?: string,
  disabled?: boolean,
  text?: string,
  onClick?: (e: Event) => void;
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    const eventObject = props.onClick ? {
      events: {
        click: (e: Event) => {
          props.onClick!(e);
        },
      },
    } : {};

    super({
      ...props,
      ...eventObject,
    });
  }

  override render() {
    return template;
  }
}
