import Block, { BlockProps } from '../../framework/Block';
import {PageName} from '../../App';
import template from './noPage.hbs.ts';

import { Header } from '../../components/header';
import { Button } from '../../components/button';

interface NoPageProps extends BlockProps {
    changePage: (page: PageName) => void;
}

export class NoPage extends Block {
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
                dataPage: 'chatsPage',
                onClick: (event: Event) => {
                    event.preventDefault();
                    props.changePage('chatsPage');
                }
            }),
        })
    }

    override render() {
        return template;
    }
}
