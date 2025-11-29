import Block, { BlockProps } from '../../framework/Block';
import template from './modalModal.hbs';

interface ModalModalProps extends BlockProps {
  id?: string,
  class?: string,
  content: Block;
}

export class ModalModal extends Block {
  constructor(props: ModalModalProps) {

    super({
      ...props,
    });
  }

  override render(): string {
    return template;
  }
}
