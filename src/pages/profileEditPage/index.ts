import Block, { BlockProps } from '../../framework/Block';
import template from './profileEditPage.hbs';

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
import { UserDTO, UserEdit } from '../../types/authType';
import { profileInfoConst, ProfileStoreInterface } from '../../types/userType';

const UserProfileList = (user: UserDTO | null) => {
    if (!user) {
        return [];
    }
    const profileListAll =  profileInfoConst.map(({ header, name }): [Label, Input] => {
        const value: string = user[name] ? String(user[name]) : '';
        return [
            new Label({ forAttr: name, text: header }),
            new Input({ id: name, class: 'form-validate', name: name, type: 'input', value: value }),
        ];
    }).flat();
    profileListAll.push(new Button({ tag:'button', type:'submit', id:'form-btn', text:'Записать' }));

    return profileListAll;
}

interface ProfileEditPageProps extends BlockProps, ProfileStoreInterface, RouterPropsInterface {}

class ProfileEditPage extends Block {
  constructor(props: ProfileEditPageProps) {

      const userFromProps = props.user as UserDTO | null;
      const ProfileList = UserProfileList(userFromProps);

      const userServiceInit = new UserService({
          store: window.store,
          router: window.router,
      });

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
        children: ProfileList,
        onFormSubmit: (data: Record<string, string>) => {
            userServiceInit.editUser(data as UserEdit);
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

const LoginPageRouter = wrapProtected(wrapStore(mapStateToProps)(ProfileEditPage));
export { LoginPageRouter as ProfileEditPage };
