import Block, { BlockProps } from '../../framework/Block';
import template from './boxHeader.hbs.ts';
import './boxHeader.pcss';

interface BoxHeaderProps extends BlockProps {
  header: string;
}

export class BoxHeader extends Block {
  constructor(props: BoxHeaderProps) {
    super({
      ...props,
    });
  }

  override render(): string {
    return template;
  }
}
