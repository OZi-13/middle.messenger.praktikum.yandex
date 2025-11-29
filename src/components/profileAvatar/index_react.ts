import Block, { BlockProps } from '../../framework/Block';
import template from './profileAvatar.hbs';
import './profileAvatar.pcss';

import { wrapStore } from "../../utils/wrapStore.ts";
import { AppStateType } from '../../types/appType';
import { wrapProtected } from '../../utils/wrapProtected';
import getSourceLink from '../../utils/getSourceLink';
import { ModalBox } from '../modalBox';
import { ProfileAvatarEditForm } from '../profileAvatarEditForm';

type StoreType = Pick<AppStateType, 'user'>;
interface ProfileAvatarProps extends BlockProps, StoreType {}

class ProfileAvatar extends Block {
  constructor(props: ProfileAvatarProps) {

    super({
        events: {
            click: (event: Event) => {
                event.preventDefault();
                this.modalBnt();
            },
        },
        Avatar: props.user.avatar ? `style = "background-image: url('${getSourceLink(props.user.avatar)}')"` : '',
    });
  }

    modalBnt(): void  {
        const modalBackElement = document.getElementById('modal-back');
        const modalElement = document.getElementById('modal-avatar');

        if (modalBackElement) {
            modalBackElement.classList.toggle('none');
        }
        if (modalElement) {
            modalElement.classList.toggle('none');
        }
    }

    protected override componentDidUpdate(oldProps: ProfileAvatarProps, newProps: ProfileAvatarProps): boolean {

        if (oldProps.user.avatar !== newProps.user.avatar) {

            (this as Block).setProps({
                Avatar: `style = "background-image: url('${getSourceLink(newProps.user.avatar)}')"`,
            } as Partial<ProfileAvatarProps>);

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

const ConnectedProfileAvatar = wrapStore<ProfileAvatarProps>(mapStateToProps)(ProfileAvatar);
export { ConnectedProfileAvatar as ProfileAvatar };
