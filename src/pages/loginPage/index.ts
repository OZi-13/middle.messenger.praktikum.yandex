import Block, {BlockProps} from '../../framework/Block';
import {PageName} from '../../App';
import template from './loginPage.hbs.ts';

import {Header} from '../../components/header';
import {BoxHeader} from '../../components/boxHeader';
import {Label} from '../../components/label';
import {Input} from '../../components/input';
import {Button} from '../../components/button';
import {Link} from '../../components/link';
import {Form} from '../../components/form';

interface LoginPageProps extends BlockProps {
    changePage: (page: PageName) => void;
}

export class LoginPage extends Block {
    constructor(props: LoginPageProps) {

        const formChildren = [
            new Label({
                forAttr: 'form-login',
                text: 'Логин'
            }),
            new Input({
                id: 'form-login',
                class: 'form-validate',
                name: 'login',
                type: 'text'
            }),
            new Label({
                forAttr: 'form-password',
                text: 'Пароль'
            }),
            new Input({
                id: 'form-password',
                class: 'form-validate',
                name: 'password',
                type: 'password'
            }),
            new Button({
                tag: 'button',
                type: 'submit',
                id: 'form-btn',
                text: 'Авторизоваться',
            }),
            new Link({
                class: 'nav-btn',
                href: '#',
                dataPage: 'registrationPage',
                text: 'Нет аккаунта?',
                onClick: (event: Event) => {
                    event.preventDefault();
                    props.changePage('registrationPage');
                }
            })
        ];

        super({
            Header: new Header({
                isLoginPage: '1',
                changePage: props.changePage,
            }),
            BoxHeader: new BoxHeader({
                header: 'Вход',
            }),

            LoginForm: new Form({
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

