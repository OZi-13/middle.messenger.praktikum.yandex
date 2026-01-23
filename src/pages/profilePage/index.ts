import Block, { BlockProps } from '../../framework/Block';
import template from './profilePage.hbs';
import './profilePage.pcss';

import { Header } from '../../components/header';
import { Button } from '../../components/button';
import { Link } from '../../components/link';
import { ProfileListItem } from '../../components/profileListItem';
import { ProfileAvatar } from '../../components/profileAvatar';

import { ROUTER } from '../../utils/links';
import { wrapRouter } from '../../utils/wrapRouter';
import { wrapStore } from '../../utils/wrapStore';
import AuthService from '../../services/authService';

import { AppStateType } from '../../types/appType';
import { UserDTO } from '../../types/apiType';
import { profileInfoConst } from '../../types/userType';
import { wrapProtected } from '../../utils/wrapProtected';
import { ModalBox } from '../../components/modalBox';
import { ProfileAvatarEditForm } from '../../components/profileAvatarEditForm';
import getSourceLink from '../../utils/getSourceLink';
import { RouterInterface } from '../../types/routerType';

type StoreType = Pick<AppStateType, 'user'>;
interface ProfilePageProps extends BlockProps, RouterInterface, StoreType {}

const UserProfileList = (user: UserDTO | null): ProfileListItem[] => {
  if (!user) {
    return [];
  }
  return profileInfoConst.map(({ header, name }) => {
    const value = user[name] ? String(user[name]) : '';
    return new ProfileListItem({ header, value });
  });
};

class ProfilePage extends Block {
  constructor(props: ProfilePageProps) {

    const authServiceInit = new AuthService({
      store: window.store,
      router: window.router,
    });

    const modalBoxInstance: ModalBox = new ModalBox({
      id1: 'avatar_edit',
      modalContent1: new ProfileAvatarEditForm(),
    });

    const userFromProps = props.user;
    const ProfileList = UserProfileList(userFromProps);
    const UserName: string = props.user?.display_name || props.user?.login || '';

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
          authServiceInit.logout().catch(console.error);
        },
      }),
      Avatar: new ProfileAvatar({
        avatar: props.user?.avatar ? getSourceLink(props.user?.avatar) : '',
      }),
      ProfileList: ProfileList,
      ModalBox: modalBoxInstance,
      UserName: UserName,
    });
  }

  protected override componentDidUpdate(oldProps: ProfilePageProps, newProps: ProfilePageProps): boolean {

    if (oldProps.user?.avatar !== newProps.user?.avatar) {

      (this as Block).setProps({
        Avatar: new ProfileAvatar({
          avatar: getSourceLink(newProps.user?.avatar as string),
        }),
      } as Partial<ProfilePageProps>);

      return false;
    }

    return super.componentDidUpdate(oldProps, newProps);
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

const ProfilePageRouter = wrapRouter(wrapProtected(wrapStore(mapStateToProps)(ProfilePage)));
export { ProfilePageRouter as ProfilePage };
