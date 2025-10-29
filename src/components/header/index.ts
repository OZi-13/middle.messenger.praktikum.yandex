import Block, { BlockProps } from '../../framework/Block';
import { PageName } from '../../App';
import template from './header.hbs.ts';
import './header.pcss';

import { Link } from '../link';

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
          props.changePage('chatsPage');
        },
      }),
      LinkProfilePage: new Link({
        href: '#',
        class: props.isProfilePage ? 'nav-btn active' : 'nav-btn',
        dataPage: 'profilePage',
        text: 'Профиль',
        onClick: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();
          props.changePage('profilePage');
        },
      }),
      LinkNoPage: new Link({
        href: '#',
        class: props.isNoPage ? 'nav-btn active' : 'nav-btn',
        dataPage: 'noPage',
        text: '404',
        onClick: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();
          props.changePage('noPage');
        },
      }),
      LinkNoServerPage: new Link({
        href: '#',
        class: props.isNoServerPage ? 'nav-btn active' : 'nav-btn',
        dataPage: 'noServerPage',
        text: '5**',
        onClick: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();
          props.changePage('noServerPage');
        },
      }),
    });
  }

  override render(): string {
    return template;
  }
}
