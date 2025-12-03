import Block, { BlockProps } from '../../framework/Block';
import template from './profileAvatar.hbs';
import './profileAvatar.pcss';

import modal from '../../utils/Modal';

interface ProfileAvatarProps extends BlockProps {
  avatar: string,
}

export class ProfileAvatar extends Block {
  constructor(props: ProfileAvatarProps) {

    super({
      events: {
        click: (event: Event) => {
          event.preventDefault();
          modal.open('avatar_edit');
        },
      },
      Avatar: `style = "background-image: url('${props.avatar}')"`,
    });
  }

  override render() {
    return template;
  }
}
