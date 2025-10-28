import Block, { BlockProps } from '../../framework/Block';
import { PageName } from '../../App';
import template from './chatsPage.hbs.ts';
import { chatsListMock, ChatsListMockType } from '../../helpers/mockData';
import './chatsPage.pcss'

import { Header } from '../../components/header';
import { NavLineLeft } from '../../components/navLineLeft';
import { NavLineRight } from '../../components/navLineRight';
import { ChatsListItem } from '../../components/chatsListItem';
import { Chat } from '../../components/chat';
import { Form } from '../../components/form';
import { Input } from '../../components/input';
import { Button } from '../../components/button';

interface ChatsProps extends BlockProps {
    changePage: (page: PageName) => void;
}

export class ChatsPage extends Block {
    constructor(props: ChatsProps) {

        const message = new Input ({
                id: 'message',
                class: 'form-validate',
                name: 'message',
                type: 'input',
                placeholder: 'Сообщение'
        })
        const button = new Button ({
            tag: 'button',
            type: 'submit',
            id: 'form-btn',
            text: '>',
        })

        const ChatsListItems = chatsListMock.map(
            ({ name, last, newCount }: ChatsListMockType) => new ChatsListItem({
                name,
                last,
                newCount
            })
        );

        super({
            ...props,
            Header: new Header({
                isChatsPage: '1',
                changePage: props.changePage,
            }),
            NavLineLeft: new NavLineLeft({
                name: 'Ольга',
                avatar: true,
                nav: true,
                changePage: props.changePage,
            }),
            NavLineRight: new NavLineRight({
                nav: true,
                avatar: true,
                name: 'Собеседник',
            }),
            InputSearch: new Input({
                id: 'search',
                name: 'search',
                type: 'input',
                placeholder: 'Поиск',
            }),
            ChatsListItem: ChatsListItems,

            Form: new Form({
                id: 'form',
                class: 'chats_bottom',
                template: 'templateMessage',
                message: message,
                button: button,
            }),
            Chat: new Chat(),

        })
}

override render() {
    return template;
    }
}
