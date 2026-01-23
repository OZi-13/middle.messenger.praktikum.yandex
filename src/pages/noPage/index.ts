import Block, { BlockProps } from '../../framework/Block';
import template from './noPage.hbs.ts';

import { wrapRouter } from '../../utils/wrapRouter';
import { ROUTER } from '../../utils/links';
import { RouterInterface } from '../../types/routerType';

import { Header } from '../../components/header';
import { Button } from '../../components/button';

interface NoPageProps extends BlockProps, RouterInterface {}

class NoPage extends Block {
  constructor(props: NoPageProps) {
    super({
      Header: new Header({
        isNoPage: '1',
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

const NoPageRouter = wrapRouter(NoPage);
export { NoPageRouter as NoPage };
