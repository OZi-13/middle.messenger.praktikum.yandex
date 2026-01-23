import Block, { BlockProps } from '../../framework/Block';
import template from './header.hbs';
import './header.pcss';

import { ROUTER } from '../../utils/links';
import { wrapRouter } from '../../utils/wrapRouter';

import { Link } from '../link';
import { RouterInterface } from '../../types/routerType.ts';

interface HeaderProps extends BlockProps {
  isLoginPage?: string;
  isRegistrationPage?: string;
  isChatsPage?: string;
  isProfilePage?: string;
  isNoPage?: string;
  isNoServerPage?: string;
}

interface HeaderAddProps extends HeaderProps, RouterInterface {}

class Header extends Block {
  constructor(props: HeaderAddProps) {
    super({
      ...props,
      LinkLoginPage: new Link({
        href: ROUTER.login,
        class: props.isLoginPage ? 'nav-btn active' : 'nav-btn',
        text: 'Войти',
        onClick: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();
          props.router.go(ROUTER.login);
        },
      }),
      LinkRegistrationPage: new Link({
        href: ROUTER.registration,
        class: props.isRegistrationPage ? 'nav-btn active' : 'nav-btn',
        text: 'Регистрация',
        onClick: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();
          props.router.go(ROUTER.registration);
        },
      }),
      LinkChatsPage: new Link({
        href: ROUTER.chats,
        class: props.isChatsPage ? 'nav-btn active' : 'nav-btn',
        text: 'Чаты',
        onClick: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();
          props.router.go(ROUTER.chats);
        },
      }),
      LinkProfilePage: new Link({
        href: ROUTER.profile,
        class: props.isProfilePage ? 'nav-btn active' : 'nav-btn',
        text: 'Профиль',
        onClick: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();
          props.router.go(ROUTER.profile);
        },
      }),
      LinkNoPage: new Link({
        href: ROUTER.noPage,
        class: props.isNoPage ? 'nav-btn active' : 'nav-btn',
        text: '404',
        onClick: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();
          props.router.go(ROUTER.noPage);
        },
      }),
      LinkNoServerPage: new Link({
        href: ROUTER.noServer,
        class: props.isNoServerPage ? 'nav-btn active' : 'nav-btn',
        text: '5**',
        onClick: (event: Event) => {
          event.preventDefault();
          event.stopPropagation();
          props.router.go(ROUTER.noServer);
        },
      }),
    });
  }

  override render(): string {
    return template;
  }
}

const HeaderRouter = wrapRouter(Header);
export { HeaderRouter as Header };
