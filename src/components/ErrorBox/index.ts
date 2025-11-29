import Block, { BlockProps } from '../../framework/Block';
import template from './errorBox.hbs';
import './errorBox.pcss';

interface ErrorBoxProps extends BlockProps {
  text: string | null,
}

export class ErrorBox extends Block {
  constructor(props: ErrorBoxProps) {
      super({
          ...props,
      });
  }

  override render() {
    return template;
  }
}
