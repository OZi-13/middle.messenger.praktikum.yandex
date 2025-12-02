import Block, { BlockProps } from '../../framework/Block';
import template from './input.hbs.ts';
import { FormValidator } from '../../utils/formValidator';

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
          value: props.value || '',
          events: {
              blur: (e: Event) => {
                  e.preventDefault();
                  const inputElement = e.target as HTMLInputElement;
                  FormValidator.formValidateElement(inputElement, 'blur');
              },
              input: (e: Event) => {
                  const inputElement = e.target as HTMLInputElement;
                  this.setProps({ value: inputElement.value });
              }
          },
      });
  }

  override render(): string {
    return template;
  }
}
