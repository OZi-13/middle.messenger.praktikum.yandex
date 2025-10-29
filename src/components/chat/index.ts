import Block from '../../framework/Block';
import template from './chat.hbs.ts';

export class Chat extends Block {

  render(): string {
    return template;
  }
}
