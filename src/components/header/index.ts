import Block, { BlockProps } from '../../framework/Block';
import template from './header.hbs.ts';
import './header.pcss';

import Router from '../../framework/router';
import { ROUTER } from '../../links';

import { Link } from '../link';

const router = new Router('');

interface HeaderProps extends BlockProps {
  isLoginPage?: string;
  isRegistrationPage?: string;
  isChatsPage?: string;
  isProfilePage?: string;
  isNoPage?: string;
  isNoServerPage?: string;
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
          router.go(ROUTER.login);
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
          router.go(ROUTER.registration);
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
            router.go(ROUTER.chats);
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
            router.go(ROUTER.profile);
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
            router.go(ROUTER.noPage);
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
            router.go(ROUTER.noServer);
        },
      }),
    });
  }

  override render(): string {
    return template;
  }
}
