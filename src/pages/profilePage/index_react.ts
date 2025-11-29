import Block, { BlockProps } from '../../framework/Block';
import template from './profilePage.hbs';
import './profilePage.pcss';

import { Header } from '../../components/header';
import { Button } from '../../components/button';
import { Link } from '../../components/link';
import { ProfileListItem } from '../../components/profileListItem';
import { ProfileAvatarEditForm } from '../../components/profileAvatarEditForm';
import { ModalBox } from '../../components/modalBox';
import getSourceLink from '../../utils/getSourceLink';

import { ROUTER } from '../../utils/links.ts';
import { wrapRouter } from '../../utils/wrapRouter';
import { wrapStore } from '../../utils/wrapStore';

import { services, AuthServiceType, UserServiceType } from '../../framework/___ServiceLocator.ts';

import { AppStateType } from '../../types/appType';
import { UserDTO } from '../../types/apiType';
import { profileInfoConst } from '../../types/userType';
import { wrapProtected } from '../../utils/wrapProtected';

type StoreType = Pick<AppStateType, 'user'>;
interface ProfilePageProps extends BlockProps, StoreType {}

const UserProfileList = (user: UserDTO | null): ProfileListItem[] => {
    if (!user) {
        return [];
    }
    return profileInfoConst.map(({ header, name }) => {
        const value = user[name] ? String(user[name]) : '';
        return new ProfileListItem({ header, value });
    });
}

const modalBoxInstance: ModalBox = new ModalBox({
    modalContent: new ProfileAvatarEditForm(),
});

const createModalBtn = (propsUserAvatar: string | null): Button | null => {
    return propsUserAvatar !== null ?
        new Button({
            tag: 'div',
            id: 'modal-btn',
            class: 'profile-avatar',
            //background: getSourceLink(propsUserAvatar),
            onClick: (event: Event) => {
                event.preventDefault();
                modalBoxInstance.modal();
            },
        }) : null;
}

class ProfilePage extends Block {

  constructor(props: ProfilePageProps) {

      const userFromProps = props.user as UserDTO | null;
      const ProfileList = UserProfileList(userFromProps);
      //const userService = services.get('UserService');

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
          const authService = services.get('AuthService');
          authService.logout();
        },
      }),
      ModalBtn: createModalBtn(props.user.avatar as string | null),
      ProfileList: ProfileList,
      ModalBox: modalBoxInstance,
      UserName: props.user.display_name || props.user.login || '',
    });
  }


    protected override componentDidUpdate(oldProps: ProfilePageProps, newProps: ProfilePageProps): boolean {

        if (oldProps.user.avatar !== newProps.user.avatar) {

            const newModalBtn = createModalBtn(newProps.user.avatar as string | null);

            (this as Block).setProps({
                ModalBtn: newModalBtn,
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

const ConnectedProfilePage = wrapStore<ProfilePageProps>(mapStateToProps)(ProfilePage);
const ProfilePageRouter = wrapRouter(wrapProtected(ConnectedProfilePage));

export { ProfilePageRouter as ProfilePage };
