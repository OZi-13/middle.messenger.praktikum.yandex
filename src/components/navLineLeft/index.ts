import Block, { BlockProps } from '../../framework/Block';
import template from './navLineLeft.hbs.ts';
import { PageName } from '../../App';

interface NavLineLeftProps extends BlockProps {
  nav?: boolean;
  name: string;
  avatar?: boolean;
  changePage: (page: PageName) => void;
}

export class NavLineLeft extends Block {
  constructor(props: NavLineLeftProps) {

    const eventObject = {
      events: {
        click: (event: Event) => {
          if (props.nav) {
            event.preventDefault();
            props.changePage('profilePage');
          }
        },
      },
    };

    super({
      ...props,
      ...eventObject,
    });
  }

  render(): string {
    return template;
  }
}
