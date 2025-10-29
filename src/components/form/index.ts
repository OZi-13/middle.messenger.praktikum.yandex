import Block, { BlockProps } from '../../framework/Block';
import { FormValidator } from '../../modules/formValidator';
import templateForm from './form.hbs.ts';
import templateMessage from './formMessage.hbs.ts';

interface FormProps extends BlockProps {
  id: string;
  class?: string;
  onFormSubmit?: (data: Record<string, string>) => void;
  template?: 'templateForm' | 'templateMessage';
  message?: Block;
  button?: Block;
}

export class Form extends Block {
  constructor(props: FormProps) {

    const submitHandler = (e: Event) => {
      const validationResult = FormValidator.submitForm(e);
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
