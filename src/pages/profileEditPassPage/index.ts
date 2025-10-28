import Block, { BlockProps } from '../../framework/Block';
import { PageName } from '../../App';
import template from './profileEditPassPage.hbs';

import { Header } from '../../components/header';
import { Label } from '../../components/label';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { BoxHeader } from '../../components/boxHeader';
import { Form } from '../../components/form';
import { NavLineLeft } from '../../components/navLineLeft';
import { NavLineRight } from '../../components/navLineRight';

interface ProfileEditPassPageProps extends BlockProps {
    changePage: (page: PageName) => void;
}

export class ProfileEditPassPage extends Block {
    constructor(props: ProfileEditPassPageProps) {

        const formChildren = [
            new Label({
                forAttr: 'form-password',
                text: 'Новый пароль'
            }),
            new Input({
                id: 'form-password',
                class: 'form-validate',
                name: 'password',
                type: 'password'
            }),
            new Label({
                forAttr: 'form-password',
                text: 'Повторить новый пароль'
            }),
            new Input({
                id: 'form-password-copy',
                class: 'form-validate',
                name: 'password-copy',
                type: 'password'
            }),
            new Button({
                tag: 'button',
                type: 'submit',
                id: 'form-btn',
                text: 'Сохранить',
            })
        ];

        super({
            ...props,
            Header: new Header({
                isProfilePage: '1',
                changePage: props.changePage,
            }),
            BoxHeader: new BoxHeader({
                header: 'Изменить данные',
            }),
            NavLineLeft: new NavLineLeft({
                name: 'Назад',
                nav: true,
                changePage: props.changePage,
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
            })
        })
    }

    override render() {
        return template;
    }
}
