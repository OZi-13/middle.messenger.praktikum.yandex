import Block from '../../framework/Block';
import template from './profileAvatarEdit.hbs.ts';

import { Label } from '../label';
import { Input } from '../input';
import { Button } from '../button';

export class ProfileAvatarEdit extends Block {
  constructor() {

    super({
      Label: new Label({
        forAttr: 'form-avatar',
        text: 'Загрузить новый аватар',
      }),
      Input: new Input({
        id: 'form-avatar',
        name: 'avatar',
        type: 'file',
        accept: 'image/png, image/jpeg',
      }),
      Button: new Button({
        id: 'form-btn',
        text: 'Загрузить',
        tag: 'div',
      }),
    });
  }

  render(): string {
    return template;
  }
}
