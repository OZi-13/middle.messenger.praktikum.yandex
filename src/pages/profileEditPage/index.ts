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
import UserService from '../../services/userService';
import { UserDTO } from '../../types/apiType';
import { UserEditType } from '../../types/userType';
import { profileInfoConst } from '../../types/userType';

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
};

type StoreType = Pick<AppStateType, 'user'>;
interface ProfileEditPageProps extends BlockProps, StoreType {}

class ProfileEditPage extends Block {
  constructor(props: ProfileEditPageProps) {

    const userFromProps = props.user;
    const ProfileList = UserProfileList(userFromProps);

    const userServiceInit = new UserService({
      store: window.store,
      router: window.router,
    });

    const UserName: string = props.user?.display_name || props.user?.login || '';

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
        children: ProfileList,
        onFormSubmit: (data: Record<string, string>) => {
          userServiceInit.userEdit(data as UserEditType).catch(console.error);
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

const LoginPageRouter = wrapProtected(wrapStore(mapStateToProps)(ProfileEditPage));
export { LoginPageRouter as ProfileEditPage };
