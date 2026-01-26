import Block, { BlockProps } from '../../framework/Block';
import template from './navLineLeft.hbs.ts';

import { wrapRouter } from '../../utils/wrapRouter';
import { RouterInterface } from '../../types/routerType';

interface NavLineLeftProps extends BlockProps, RouterInterface {
  nav?: boolean;
  name: string;
  avatar?: boolean;
  routerLink?: string;
}

class NavLineLeft extends Block {
  constructor(props: NavLineLeftProps) {

    const eventObject = {
      events: {
        click: (event: Event) => {
          if (props.nav && props.routerLink) {
            event.preventDefault();
            props.router.go(props.routerLink);
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

const NavLineLeftRouter = wrapRouter(NavLineLeft);
export { NavLineLeftRouter as NavLineLeft };
