import Block, { BlockProps } from '../../framework/Block';
import template from './profilePage.hbs';
import './profilePage.pcss';

import { Header } from '../../components/header';
import { Button } from '../../components/button';
import { Link } from '../../components/link';
import { ProfileListItem } from '../../components/profileListItem';
import { ProfileAvatarEditForm } from '../../components/profileAvatarEditForm';
import { ModalBox } from '../../components/modalBox';

import { ROUTER } from '../../utils/links.ts';
import { wrapRouter } from '../../utils/wrapRouter';
import { wrapStore } from '../../utils/wrapStore';
import AuthService from '../../services/authService';

import { AppStateType } from '../../types/appType';
import * as Type from '../../types/apiType';
import { profileInfoConst, ProfileStoreInterface } from '../../types/userType';
import { RouterPropsInterface } from '../../types/routerType';
import { wrapProtected } from '../../utils/wrapProtected';

interface ProfilePageProps extends BlockProps, RouterPropsInterface {}

const UserProfileList = (user: UserDTO | null): ProfileListItem[] => {
    if (!user) {
        return [];
    }
    return profileInfoConst.map(({ header, name }) => {
        const value = user[name] ? String(user[name]) : '';
        return new ProfileListItem({ header, value });
    });
}

class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {

      const authServiceInit = new AuthService({
          store: window.store,
          router: window.router,
      });

    const modalBoxInstance = new ModalBox({
      modalContent: new ProfileAvatarEditForm(),
    });

    const userFromProps = props.user as UserDTO | null;
    const ProfileList = UserProfileList(userFromProps);

    super({
      ...props,
      Header: new Header({
        isProfilePage: '1',
        changePage: props.changePage,
      }),
      ButtonData: new Button({
        tag: 'div',
        class: 'nav-btn btn',
        text: 'Изменить данные',
        onClick: (event: Event) => {
          event.preventDefault();
          props.router.go(ROUTER.profileEdit);
        },
      }),
      ButtonPass: new Button({
        tag: 'div',
        class: 'nav-btn btn',
        text: 'Изменить пароль',
        onClick: (event: Event) => {
          event.preventDefault();
          props.router.go(ROUTER.profileEditPass);
        },
      }),
      Link: new Link({
        class: 'nav-btn',
        href: ROUTER.login,
        text: 'Выйти',
        onClick: (event: Event) => {
          event.preventDefault();
            authServiceInit.logout();
        },
      }),
      ModalBtn: new Button({
        tag: 'div',
        id: 'modal-btn',
        class: 'profile-avatar',
        onClick: (event: Event) => {
          event.preventDefault();
          modalBoxInstance.modal();
        },
      }),
      ProfileList: ProfileList,
      ModalBox: modalBoxInstance,
      UserName: props.user.display_name || props.user.login || '',
    });
  }

  override render() {
    return template;
  }
}

const mapStateToProps = (state: AppStateType): ProfileStoreInterface => {
    return {
        user: state.user,
    };
};

const ConnectedProfilePage = wrapStore<ProfilePageProps>(mapStateToProps)(ProfilePage);
const ProfilePageRouter = wrapRouter(wrapProtected(ConnectedProfilePage));

export { ProfilePageRouter as ProfilePage };
