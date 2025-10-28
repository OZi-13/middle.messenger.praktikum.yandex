import Block, { BlockProps } from '../../framework/Block';
import template from './navLineLeft.hbs.ts';
import { PageName } from '../../App';

interface navLineLeftProps extends BlockProps {
    nav?: boolean;
    name: string;
    avatar?: boolean;
    changePage: (page: PageName) => void;
}

export class NavLineLeft extends Block {
    constructor(props: navLineLeftProps) {

        const eventObject = {
            events: {
                click: (event: Event) => {
                    if (props.nav) {
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
        return template
    }
}
