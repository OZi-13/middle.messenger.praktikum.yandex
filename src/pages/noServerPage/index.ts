import Block, { BlockProps } from '../../framework/Block';
import { PageName } from '../../App';
import template from './noServerPage.hbs.ts';

import { Header } from '../../components/header';
import { Button } from '../../components/button';

interface NoServerPageProps extends BlockProps {
  changePage: (page: PageName) => void;
}

export class NoServerPage extends Block {
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
        dataPage: 'chatsPage',
        onClick: (event: Event) => {
          event.preventDefault();
          props.changePage('chatsPage');
        },
      }),
    });
  }

  override render() {
    return template;
  }
}
