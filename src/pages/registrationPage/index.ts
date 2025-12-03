import Block, { BlockProps } from '../../framework/Block';
import template from './registrationPage.hbs';

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

import { RegistrationType } from '../../types/authType';
import { AppStateType } from '../../types/appType';
import { RouterInterface } from '../../types/routerType';

type StoreType = Pick<AppStateType, 'responseError'>;
interface RegistrationPageProps extends BlockProps, RouterInterface, StoreType {}

class RegistrationPage extends Block {
  constructor(props: RegistrationPageProps) {

    const authServiceInit = new AuthService({
      store: window.store,
      router: window.router,
    });

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
        href: ROUTER.login,
        text: 'Войти',
        onClick: (event: Event) => {
          event.preventDefault();
          props.router.go(ROUTER.login);
        },
      }),
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

        onFormSubmit: (data: Record<string, string>) => {
          console.log('Данные формы:', data);
          authServiceInit.registration(data as RegistrationType);
        },

      }),
      ErrorBox:  new ErrorBox({ text: props.responseError }),
    });
  }

  protected override componentDidUpdate(oldProps: RegistrationPageProps, newProps: RegistrationPageProps): boolean {

    if (oldProps.responseError !== newProps.responseError && newProps.responseError !== null) {

      (this as Block).setProps({
        ErrorBox: new ErrorBox({ text: newProps.responseError }),
      } as Partial<RegistrationPageProps>);

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
    responseError: state.responseError,
  };
};

const RegistrationPageRouter = wrapRouter(wrapProtected(wrapStore(mapStateToProps)(RegistrationPage)));
export { RegistrationPageRouter as RegistrationPage };
