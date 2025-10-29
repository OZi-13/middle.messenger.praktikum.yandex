import Block, { BlockProps } from '../../framework/Block';
import template from './profileListItem.hbs.ts';

interface ProfileListItemProps extends BlockProps {
  header: string;
  value: string;
}

export class ProfileListItem extends Block {
  constructor(props: ProfileListItemProps) {

    super({
      ...props,
    });
  }

  render(): string {
    return template;
  }
}
