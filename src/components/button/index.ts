import Block, { BlockProps } from '../../framework/Block';
import template from './button.hbs.ts';
import './button.pcss';

interface ButtonProps extends BlockProps {
  tag: string,
  id?: string,
  class?: string,
  background?: string,
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
        attr: {
            style: props.background ? `background-image: url('${props.background}')` : '',
            class: props.background ? `${props.class} with-image` : props.class,
        }
    } : {};

    super({
      ...props,
      ...eventObject, // Объект events добавится ТОЛЬКО, если props.onClick есть
    });
  }

  override render() {
    return template;
  }
}
