import Block, { BlockProps } from '../../framework/Block';
import template from './modalModal.hbs.ts';

import { ProfileAvatarEdit } from '../profileAvatarEdit';

interface ModalModalProps extends BlockProps {
    id?: string,
    class?: string,
    content: ProfileAvatarEdit;
}

export class ModalModal extends Block {
    constructor(props: ModalModalProps) {

        super({
            ...props,
        });
    }

    override render(): string {
        return template
    }
}
