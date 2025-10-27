import Block, { BlockProps } from '../../framework/Block';
import template from './input.hbs.ts';
import { FormValidator } from '../../modules/FormValidator';

interface InputProps extends BlockProps {
    id?: string,
    class?: string,
    type: string,
    name: string,
    value?: string,
    placeholder?: string,
}

export class Input extends Block {
    constructor(props: InputProps) {
        super({
            ...props,
            events: {
                blur: (e: Event) => {
                    e.preventDefault();
                    const inputElement = e.target as HTMLInputElement;
                    FormValidator.formValidateElement(inputElement, 'blur');
                }
            }
        });
    }

    override render(): string {
        return template
    }
}
