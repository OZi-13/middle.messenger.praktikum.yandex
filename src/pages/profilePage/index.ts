import Block, { BlockProps } from '../../framework/Block';
import { PageName } from '../../App';
import template from './profilePage.hbs';
import { profileInfo, ProfileInfoType } from '../../helpers/mockDataProfile';
import './profilePage.pcss'

import { Header } from '../../components/header';
import {Button} from '../../components/button';
import {Link} from '../../components/link';
import { ProfileListItem } from '../../components/profileListItem';
import { ProfileAvatarEdit } from '../../components/profileAvatarEdit';
import { ModalBox } from '../../components/modalBox';

interface ProfilePageProps extends BlockProps {
    changePage: (page: PageName) => void;
}

export class ProfilePage extends Block {
    constructor(props: ProfilePageProps) {

        const modalBoxInstance = new ModalBox({
            modalContent: new ProfileAvatarEdit()
        });

        const ProfileList = profileInfo.map(
            ({ header, value }: ProfileInfoType) => new ProfileListItem ({
                header,
                value
            })
        )

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
                dataPage: 'profileEditPage',
                onClick: (event: Event) => {
                    event.preventDefault();
                    props.changePage('profileEditPage');
                }
            }),
            ButtonPass: new Button({
                tag: 'div',
                class: 'nav-btn btn',
                text: 'Изменить пароль',
                dataPage: 'profileEditPassPage',
                onClick: (event: Event) => {
                    event.preventDefault();
                    props.changePage('profileEditPassPage');
                }
            }),
            Link: new Link({
                class: 'nav-btn',
                href: '#',
                dataPage: 'loginPage',
                text: 'Выйти',
                onClick: (event: Event) => {
                    event.preventDefault();
                    props.changePage('loginPage');
                }
            }),
            ModalBtn: new Button({
                tag: 'div',
                id: 'modal-btn',
                class: 'profile-avatar',
                onClick: (event: Event) => {
                    event.preventDefault();
                    modalBoxInstance.modal();
                }
            }),
            ProfileList: ProfileList,

            ModalBox: modalBoxInstance,
        })
    }

    override render() {
        return template;
    }
}
