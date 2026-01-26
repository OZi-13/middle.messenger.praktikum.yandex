import Block, { BlockProps } from '../../framework/Block';
import { FormValidator } from '../../utils/formValidator.ts';
import templateForm from './form.hbs.ts';
import templateMessage from './formMessage.hbs.ts';
import { FormResult } from '../../types/validatorType';

interface FormProps extends BlockProps {
  id: string;
  class?: string;
  onFormSubmit?: (data: FormResult) => void;
  template?: 'templateForm' | 'templateMessage';
  message?: Block;
  button?: Block;
}

export class Form extends Block {
  constructor(props: FormProps) {

    const submitHandler = (e: Event) => {
      const validationResult: FormResult | null = FormValidator.submitForm(e);
      if (validationResult && props.onFormSubmit) {
        props.onFormSubmit(validationResult);
      }
    };
    const templateName = props.template == 'templateMessage' ? templateMessage : templateForm;

    super({
      ...props,
      template: templateName,
      events: {
        submit: submitHandler,
      },
    });
  }

  override render(): string {
    return this.props.template as string;
  }
}
