import Block, { BlockProps } from '../../framework/Block';
import { PageName } from '../../App';
import { Link } from '../link';
import template from './header.hbs.ts';
import './header.pcss'

interface HeaderProps extends BlockProps {
    isLoginPage?: string;
    isRegistrationPage?: string;
    isChatsPage?: string;
    isProfilePage?: string;
    isNoPage?: string;
    isNoServerPage?: string;
    changePage: (page: PageName) => void;
}

export class Header extends Block {
    constructor(props: HeaderProps) {
        super({
            ...props,
            LinkLoginPage: new Link({
                href: '#',
                class: props.isLoginPage ? 'nav-btn active' : 'nav-btn',
                dataPage: 'loginPage',
                text: 'Войти',
                onClick: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    //const page = props.dataPage as PageName;
                    props.changePage('loginPage');
                },
            }),
            LinkRegistrationPage: new Link({
                href: '#',
                class: props.isRegistrationPage ? 'nav-btn active' : 'nav-btn',
                dataPage: 'registrationPage',
                text: 'Регистрация',
                onClick: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    //const page = props.dataPage as PageName;
                    props.changePage('registrationPage');
                },
            }),
            LinkChatsPage: new Link({
                href: '#',
                class: props.isChatsPage ? 'nav-btn active' : 'nav-btn',
                dataPage: 'chatsPage',
                text: 'Чаты',
                onClick: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            LinkProfilePage: new Link({
                href: '#',
                class: props.isProfilePage ? 'nav-btn active' : 'nav-btn',
                dataPage: '_profilePage',
                text: 'Профиль',
                onClick: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            LinkNoPage: new Link({
                href: '#',
                class: props.isNoPage ? 'nav-btn active' : 'nav-btn',
                dataPage: '_noPage',
                text: '404',
                onClick: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
            LinkNoServerPage: new Link({
                href: '#',
                class: props.isNoServerPage ? 'nav-btn active' : 'nav-btn',
                dataPage: '_noServerPage',
                text: '5**',
                onClick: (event: Event) => {
                    event.preventDefault();
                    event.stopPropagation();
                },
            }),
        });
    }

    override render(): string {
        return template
    }
}
