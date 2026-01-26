import Block, { BlockProps } from '../../framework/Block';
import template from './noServerPage.hbs.ts';

import { wrapRouter } from '../../utils/wrapRouter';
import { ROUTER } from '../../utils/links';
import { RouterInterface } from '../../types/routerType';

import { Header } from '../../components/header';
import { Button } from '../../components/button';

interface NoServerPageProps extends BlockProps, RouterInterface {}

class NoServerPage extends Block {
  constructor(props: NoServerPageProps) {

    super({
      Header: new Header({
        isNoServerPage: '1',
        changePage: props.changePage,
      }),
      Button: new Button({
        tag: 'button',
        class: 'nav-btn btn btn-red',
        text: 'Назад к чатам',
        onClick: (event: Event) => {
          event.preventDefault();
          props.router.go(ROUTER.chats);
        },
      }),
    });
  }

  override render() {
    return template;
  }
}

const NoServerPageRouter = wrapRouter(NoServerPage);
export { NoServerPageRouter as NoServerPage };
