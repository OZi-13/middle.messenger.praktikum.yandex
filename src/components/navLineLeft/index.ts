import Block, { BlockProps } from '../../framework/Block';
import template from './navLineLeft.hbs.ts';

import { wrapRouter } from "../../utils/wrapRouter.ts";

interface NavLineLeftProps extends BlockProps {
  nav?: boolean;
  name: string;
  avatar?: boolean;
}

class NavLineLeft extends Block {
  constructor(props: NavLineLeftProps) {

    const eventObject = {
      events: {
        click: (event: Event) => {
          if (props.nav) {
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
