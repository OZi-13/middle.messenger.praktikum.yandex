import Block, {BlockProps} from '../../framework/Block';
import template from './button.hbs.ts';
import './button.pcss'

interface ButtonProps extends BlockProps {
        tag: string,
        id?: string,
        type: string,
        text: string
}

export class Button extends Block {
    constructor(props: ButtonProps) {
        const eventObject = props.onClick ? {
            events: {
                click: (e: Event) => {
                    props.onClick!(e);
                },
            },
        } : {};

        super({
            ...props,
            ...eventObject, // Объект events добавится ТОЛЬКО, если props.onClick есть
            attr: {
                class: props.attr?.class || 'btn',
            }
        });
    }

    override render() {
        return template;
    }
}
