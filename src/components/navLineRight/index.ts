import Block, { BlockProps } from '../../framework/Block';
import template from './navLineRight.hbs.ts';

interface navLineRightProps extends BlockProps {
    nav?: boolean;
    name: string;
    avatar?: boolean;
}

export class NavLineRight extends Block {
    constructor(props: navLineRightProps) {
        super({
            ...props
        });
    }

    render(): string {
        return template
    }
}
