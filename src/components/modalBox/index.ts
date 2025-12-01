import Block, { BlockProps } from '../../framework/Block';
import template from './modalBox.hbs';

import { Button } from '../button';
import { ModalModal } from '../modalModal';

import modal from '../../utils/Modal';

interface ModalBoxProps extends BlockProps {
  id1: string,
  id2?: string,
  id3?: string,
  id4?: string,
  id5?: string,
  modalContent1: Block;
  modalContent2?: Block;
  modalContent3?: Block;
  modalContent4?: Block;
  modalContent5?: Block;
}

export class ModalBox extends Block {
  private _modalBack: Button;

  private _modalMain: ModalModal;

  constructor(props: ModalBoxProps) {

    const modalBack = new Button({
      tag: 'div',
      id: 'modal-back',
      class: 'modal-back none',
      onClick: (event: Event) => {
        event.preventDefault();
          modal.close();
      },
    });
    const modalMain = new ModalModal({
      id1: props.id1,
      id2: props.id2 || null,
      id3: props.id3 || null,
      id4: props.id4 || null,
      id5: props.id5 || null,
      classBox: 'info-box info-box_400 info-box_white',
      content1: props.modalContent1,
      content2: props.modalContent2 || null,
      content3: props.modalContent3 || null,
      content4: props.modalContent3 || null,
      content5: props.modalContent3 || null
    });

    super({
      ...props,
      ModalBack: modalBack,
      ModalModal: modalMain,
    });

    this._modalBack = modalBack;
    this._modalMain = modalMain;
  }

  override render(): string {
    return template;
  }
}
