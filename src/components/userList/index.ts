import Block, { BlockProps } from '../../framework/Block';
import template from './userList.hbs.ts';
import { Button } from '../button';
import { UserDTO } from '../../types/apiType';
import { UserItem } from '../userItem';
import './userList.pcss';

interface UserListProps extends BlockProps {
  users: UserDTO[];
  onUserClick: (userId: number) => void;
  buttonText: string;
  buttonClass?: string;
}

export class UserList extends Block {
  constructor(props: UserListProps) {
    const userItems = props.users.map(user => {
      return new UserItem({
        ...user,
        Button: new Button({
          tag: 'button',
          type: 'button',
          class: props.buttonClass || 'btn-small',
          text: props.buttonText,
          onClick: (e: Event) => {
            e.preventDefault();
            props.onUserClick(user.id);
          },
        }),
      });
    });

    super({
      ...props,
      users: userItems,
    });
  }

  render(): string {
    // Проверяем длину массива, который был передан в конструктор
    // и который Block поместил в this.lists
    if (!this.lists.users || this.lists.users.length === 0) {
      return '<div class="info-box_content">Нет пользователей для отображения</div>';
    }
    return template;
  }
}
