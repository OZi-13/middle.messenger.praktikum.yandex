import Block, { BlockProps } from '../../framework/Block';
import template from './modalBox.hbs.ts';

import { Button } from '../button';
import { ModalModal } from '../modalModal';
import { ProfileAvatarEdit } from '../profileAvatarEdit';

interface ModalBoxProps extends BlockProps {
    modalContent: ProfileAvatarEdit;
}

export class ModalBox extends Block {
    private _modalBack: Button;
    private _modalMain: ModalModal;

    constructor(props: ModalBoxProps) {

        const modalBack = new Button({
            tag: 'div',
            class: 'modal-back none',
            onClick: (event: Event) => {
                event.preventDefault();
                this.modal();
            }
        });
        const modalMain = new ModalModal({
            id: 'modal-avatar',
            class: 'modal info-box info-box_400 info-box_white none',
            content: props.modalContent
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
        return template
    }
}
