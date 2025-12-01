import Block, { BlockProps } from '../../framework/Block';
import template from './modalModal.hbs';

interface ModalModalProps extends BlockProps {
    classBox: string,
    id1: string,
    id2: string | null,
    id3: string | null,
    id4: string | null,
    id5: string | null,
    content1: Block;
    content2: Block | null;
    content3: Block | null;
    content4: Block | null;
    content5: Block | null;
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
