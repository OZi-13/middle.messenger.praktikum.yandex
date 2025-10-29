import Block, { BlockProps } from '../../framework/Block';
import template from './label.hbs.ts';
import './label.pcss';

interface LabelProps extends BlockProps {
  forAttr: string;
  text: string
}

export class Label extends Block {
  constructor(props: LabelProps) {
    super({
      ...props,
    });
  }

  override render(): string {
    return template;
  }
}
