import Block, { BlockProps } from '../../framework/Block';
import template from './profileEditPassPage.hbs';

import { Header } from '../../components/header';
import { Label } from '../../components/label';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { BoxHeader } from '../../components/boxHeader';
import { Form } from '../../components/form';
import { NavLineLeft } from '../../components/navLineLeft';
import { NavLineRight } from '../../components/navLineRight';

import { wrapProtected } from '../../utils/wrapProtected';
import { wrapStore } from '../../utils/wrapStore';
import { ROUTER } from '../../utils/links';

import { AppStateType } from '../../types/appType';
import { RouterPropsInterface } from '../../types/routerType';
import UserService from '../../services/userService';
import { UserEditPass } from '../../types/authType.ts';
import {ProfileStoreInterface} from "../../types/userType.ts";

interface ProfileEditPassPageProps extends BlockProps, ProfileStoreInterface, RouterPropsInterface {}

class ProfileEditPassPage extends Block {
  constructor(props: ProfileEditPassPageProps) {

      const userServiceInit = new UserService({
          store: window.store,
          router: window.router,
      });

    const formChildren = [
      new Label({
        forAttr: 'form-password',
        text: 'Старый пароль',
      }),
      new Input({
        id: 'form-password',
        class: 'form-validate',
        name: 'oldPassword',
        type: 'password',
      }),
      new Label({
        forAttr: 'form-password',
        text: 'Новый пароль',
      }),
      new Input({
        id: 'form-password-copy',
        class: 'form-validate',
        name: 'newPassword',
        type: 'password',
      }),
      new Button({
        tag: 'button',
        type: 'submit',
        id: 'form-btn',
        text: 'Сохранить',
      }),
    ];

    super({
      ...props,
      Header: new Header({
        isProfilePage: '1',
      }),
      BoxHeader: new BoxHeader({
        header: 'Изменить данные',
      }),
      NavLineLeft: new NavLineLeft({
        name: 'Назад',
        nav: true,
        routerLink: ROUTER.profile,
      }),
      NavLineRight: new NavLineRight({
        nav: true,
        avatar: true,
        name: 'Ваш профиль',
      }),
      Form: new Form({
        id: 'form',
        class: 'info-box_content',
        children: formChildren,
        onFormSubmit: (data: Record<string, string>) => {
            userServiceInit.editUserPassword(data as UserEditPass);
        },
      }),
    });
  }

  override render() {
    return template;
  }
}

const mapStateToProps = (state: AppStateType): ProfileStoreInterface => {
    return {
        user: state.user,
        userName: state.user?.display_name || state.user?.login || '',
    };
};

const ProfileEditPassPageRouter = wrapProtected(wrapStore(mapStateToProps)(ProfileEditPassPage));
export { ProfileEditPassPageRouter as ProfileEditPassPage };
