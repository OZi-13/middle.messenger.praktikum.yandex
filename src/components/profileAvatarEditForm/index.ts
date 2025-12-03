import Block from '../../framework/Block';
import template from './profileAvatarEditForm.hbs';

import { Label } from '../label';
import { Input } from '../input';
import { Button } from '../button';
import { Form } from '../form';
import UserService from '../../services/userService';
import * as Type from '../../types/userType';
import { FormResult } from '../../types/validatorType';

export class ProfileAvatarEditForm extends Block {
  constructor() {

    const UserServiceInit = new UserService({
      store: window.store,
      router: window.router,
    });

    const formChildren = [
      new Label({
        forAttr: 'form-avatar',
        text: 'Загрузить новый аватар',
      }),
      new Input({
        id: 'form-avatar',
        class: 'form-validate',
        name: 'avatar',
        type: 'file',
        accept: 'image/png, image/jpeg',
      }),
      new Button({
        tag: 'button',
        type: 'submit',
        id: 'form-btn',
        text: 'Загрузить',
      }),
    ];

    super({
      Form: new Form({
        id: 'form',
        class: 'info-box_content',
        children: formChildren,
          onFormSubmit: (data: FormResult) => {
          UserServiceInit.userEditAvatar(data as unknown as Type.UserEditAvatarType);
        },
      }),
    });
  }

  render(): string {
    return template;
  }
}
