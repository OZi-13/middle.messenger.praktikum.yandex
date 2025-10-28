import Block, { BlockProps } from '../../framework/Block';
import template from './chat.hbs.ts';

export class Chat extends Block {
    constructor() {

        super({
        });
    }

    render(): string {
        return template
    }
}
