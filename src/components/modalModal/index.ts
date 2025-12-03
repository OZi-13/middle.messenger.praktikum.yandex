import Block, { BlockProps } from '../../framework/Block';
import template from './modalModal.hbs';

interface ModalModalProps extends BlockProps {
  classBox: string,
  id1?: string,
  id2?: string,
  id3?: string,
  id4?: string,
  id5?: string | null,
  modalContent1?: Block;
  modalContent2?: Block;
  modalContent3?: Block;
  modalContent4?: Block;
  modalContent5?: Block | null;
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
