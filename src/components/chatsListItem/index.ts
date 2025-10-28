import Block, { BlockProps } from '../../framework/Block';
import template from './chatsListItem.hbs.ts';

interface ChatsListItemProps extends BlockProps {
    name: string;
    last: string;
    newCount?: string;
}

export class ChatsListItem extends Block {
    constructor(props: ChatsListItemProps) {

        super({
            ...props
        });
    }

    render(): string {
        return template
    }
}
