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
import UserService from '../../services/userService';
import { UserEditPassType } from '../../types/userType.ts';

type StoreType = Pick<AppStateType, 'user'>;
interface ProfileEditPassPageProps extends BlockProps, StoreType {}

class ProfileEditPassPage extends Block {
  constructor(props: ProfileEditPassPageProps) {

    const userServiceInit = new UserService({
      store: window.store,
      router: window.router,
    });

    const UserName: string = props.user?.display_name || props.user?.login || '';

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
        avatar: true,
        name: UserName,
      }),
      Form: new Form({
        id: 'form',
        class: 'info-box_content',
        children: formChildren,
        onFormSubmit: (data: Record<string, string>) => {
          userServiceInit.userEditPassword(data as UserEditPassType).catch(console.error);
        },
      }),

    });
  }

  override render() {
    return template;
  }
}

const mapStateToProps = (state: AppStateType): StoreType => {
  return {
    user: state.user,
  };
};

const ProfileEditPassPageRouter = wrapProtected(wrapStore(mapStateToProps)(ProfileEditPassPage));
export { ProfileEditPassPageRouter as ProfileEditPassPage };
