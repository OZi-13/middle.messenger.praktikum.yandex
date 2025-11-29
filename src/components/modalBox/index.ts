import Block, { BlockProps } from '../../framework/Block';
import template from './modalBox.hbs';

import { Button } from '../button';
import { ModalModal } from '../modalModal';
import { ProfileAvatarEditForm } from '../profileAvatarEditForm';

interface ModalBoxProps extends BlockProps {
  modalContent: ProfileAvatarEditForm;
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
        this.modal();
      },
    });
    const modalMain = new ModalModal({
      id: 'modal-avatar',
      class: 'modal info-box info-box_400 info-box_white none',
      content: props.modalContent,
    });

    super({
      ...props,
      ModalBack: modalBack,
      ModalModal: modalMain,
    });

    this._modalBack = modalBack;
    this._modalMain = modalMain;
  }

  modal(): void  {
    const modalBackElement = this._modalBack.getContent();
    const modalElement = this._modalMain.getContent();

    if (modalBackElement) {
      modalBackElement.classList.toggle('none');
    }
    if (modalElement) {
      modalElement.classList.toggle('none');
    }
  }

  override render(): string {
    return template;
  }
}
