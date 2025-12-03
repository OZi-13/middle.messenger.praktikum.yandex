import Block, { BlockProps } from '../../framework/Block';
import { FormValidator } from '../../utils/formValidator';
import { FormResult } from '../../types/validatorType';
import template from '../chatForm/chatForm.hbs';
import MessageService from '../../services/messageService';

interface chatFormProps extends BlockProps {
  message: Block;
  button: Block;
  selectedChatId: number
}

export class ChatForm extends Block {
  constructor(props: chatFormProps) {

      const messageServiceInit = new MessageService();

      const submitHandler = (e: Event) => {
          e.preventDefault();
          const validationResult: FormResult | null = FormValidator.submitForm(e);

          if (validationResult) {
              const currentChatId = props.selectedChatId;
              const messageContent = validationResult.message;

              if (currentChatId && typeof messageContent === 'string') {
                  messageServiceInit.sendMessage(currentChatId, messageContent);
                  props.message.setProps({ value: '' });
              }
          }
      }

    super({
      ...props,
      events: {
        submit: submitHandler,
      },
    });
  }

    override render(): string {
        return template;
    }
}
