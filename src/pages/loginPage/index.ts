import Block, { BlockProps } from '../../framework/Block';
import template from './loginPage.hbs';

import { Header } from '../../components/header';
import { BoxHeader } from '../../components/boxHeader';
import { Label } from '../../components/label';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Link } from '../../components/link';
import { Form } from '../../components/form';
import { ErrorBox } from '../../components/errorBox';

import { ROUTER } from '../../utils/links.ts';
import { wrapRouter } from '../../utils/wrapRouter';
import { wrapStore } from '../../utils/wrapStore';
import { wrapProtected } from '../../utils/wrapProtected';
import AuthService from '../../services/authService';

import { LoginType } from '../../types/authType';
import { AppStateType } from '../../types/appType';
import { RouterInterface } from '../../types/routerType';

type StoreType = Pick<AppStateType, 'responseError'>;
interface LoginPageProps extends BlockProps, RouterInterface, StoreType {}

class LoginPage extends Block {
  constructor(props: LoginPageProps) {

    const authServiceInit = new AuthService({
      store: window.store,
      router: window.router,
    });

    const formChildren = [
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
        text: 'Войти',
      }),
      new Link({
        class: 'nav-btn',
        href: ROUTER.registration,
        text: 'Нет аккаунта?',
        onClick: (event: Event) => {
          event.preventDefault();
          props.router.go(ROUTER.registration);
        },
      }),
    ];

    super({
      ...props,
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
        onFormSubmit: (data: Record<string, string>) => {
          authServiceInit.login(data as LoginType).catch(console.error);
        },
      }),
      ErrorBox:  new ErrorBox({ text: props.responseError }),
    });
  }

  protected override componentDidUpdate(oldProps: LoginPageProps, newProps: LoginPageProps): boolean {

    if (oldProps.responseError !== newProps.responseError && newProps.responseError !== null) {

      (this as Block).setProps({
        ErrorBox: new ErrorBox({ text: newProps.responseError }),
      } as Partial<LoginPageProps>);

      return false;
    }
    return super.componentDidUpdate(oldProps, newProps);
  }

  override render() {
    return template;
  }
}

const mapStateToProps = (state: AppStateType): StoreType =>  {
  return {
    responseError: state.responseError,
  };
};

const LoginPageRouter = wrapRouter(wrapProtected(wrapStore(mapStateToProps)(LoginPage)));
export { LoginPageRouter as LoginPage };
