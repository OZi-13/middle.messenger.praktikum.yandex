import Block, { BlockProps } from '../../framework/Block';
import { PageName } from '../../App';
import template from './registrationPage.hbs.ts';

import { Header } from '../../components/header';
import { BoxHeader } from '../../components/boxHeader';
import { Label } from '../../components/label';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Link } from '../../components/link';
import { Form } from '../../components/form';

interface RegistrationPageProps extends BlockProps {
    changePage: (page: PageName) => void;
}

export class RegistrationPage extends Block {
    constructor(props: RegistrationPageProps) {

        const formChildren = [
            new Label({
                forAttr: 'form-first_name',
                text: 'Имя',
            }),
            new Input({
                id: 'form-first_name',
                class: 'form-validate',
                name: 'first_name',
                type: 'text',
            }),
            new Label({
                forAttr: 'form-second_name',
                text: 'Фамилия',
            }),
            new Input({
                id: 'form-second_name',
                class: 'form-validate',
                name: 'second_name',
                type: 'text',
            }),
            new Label({
                forAttr: 'form-login',
                text: 'Логин',
            }),
            new Input({
                id: 'form-login',
                class: 'form-validate',
                name: 'login',
                type: 'text',
            }),
            new Label({
                forAttr: 'form-email',
                text: 'Почта',
            }),
            new Input({
                id: 'form-email',
                class: 'form-validate',
                name: 'email',
                type: 'email',
            }),
            new Label({
                forAttr: 'form-phone',
                text: 'Телефон',
            }),
            new Input({
                id: 'form-phone',
                class: 'form-validate',
                name: 'phone',
                type: 'text',
            }),
            new Label({
                forAttr: 'form-password',
                text: 'Пароль',
            }),
            new Input({
                id: 'form-password',
                class: 'form-validate',
                name: 'password',
                type: 'password',
            }),

            new Button({
                tag: 'button',
                type: 'submit',
                id: 'form-btn',
                text: 'Зарегистрироваться',
            }),
            new Link({
                class: 'nav-btn',
                href: '#',
                dataPage: 'loginPage',
                 text: 'Войти',
                onClick: (event: Event) => {
                    event.preventDefault();
                    props.changePage('loginPage');
                }
            })
        ];

        super({
            Header: new Header({
                isRegistrationPage: '1',
                changePage: props.changePage,
            }),
            BoxHeader: new BoxHeader({
                header: 'Регистрация',
            }),
            RegistrationForm: new Form({
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
