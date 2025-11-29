import Block, { BlockProps } from '../../framework/Block';
import template from './profileAvatar.hbs';
import './profileAvatar.pcss';

interface ProfileAvatarProps extends BlockProps {
    avatar: string,
}

export class ProfileAvatar extends Block {
  constructor(props: ProfileAvatarProps) {

    super({
        events: {
            click: (event: Event) => {
                event.preventDefault();
                this.modalBnt();
            },
        },
        Avatar: `style = "background-image: url('${props.avatar}')"`,
    });
  }

    modalBnt(): void  {
        const modalBackElement = document.getElementById('modal-back');
        const modalElement = document.getElementById('modal-avatar');

        if (modalBackElement) {
            modalBackElement.classList.toggle('none');
        }
        if (modalElement) {
            modalElement.classList.toggle('none');
        }
    }

  override render() {
    return template;
  }
}
