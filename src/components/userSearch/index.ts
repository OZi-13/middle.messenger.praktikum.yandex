import Block, { BlockProps } from '../../framework/Block';
import template from './userSearch.hbs.ts';
import { Input } from '../input';
import { Button } from '../button';
import { UserList } from '../userList';
import UserService from '../../services/userService';
import { UserDTO } from '../../types/apiType';

interface UserSearchProps extends BlockProps {
  onUserSelect: (userId: number) => void;
}

export class UserSearch extends Block {
  constructor(props: UserSearchProps) {
    const userService = new UserService({
      store: window.store,
      router: window.router,
    });

    const searchInput = new Input({
      id: 'user-search-input',
      name: 'login',
      type: 'text',
      placeholder: 'Введите логин',
      class: 'form-control',
    });

    const searchButton = new Button({
      tag: 'button',
      type: 'button',
      text: 'Найти',
      onClick: (e: Event) => {
        e.preventDefault();
        const login = (document.getElementById('user-search-input') as HTMLInputElement).value;
        if (login) {
          userService.searchUsers(login).then(users => {
            this.updateResults(users);
          }).catch(console.error);
        }
      },
    });

    super({
      ...props,
      SearchInput: searchInput,
      SearchButton: searchButton,
      SearchResults: '', // Изначально пусто
    });
  }

  private updateResults(users: UserDTO[]) {
    const userList = new UserList({
      users: users,
      buttonText: 'Добавить',
      onUserClick: (userId: number) => {
        (this.props as UserSearchProps).onUserSelect(userId);
      },
    });

    this.children.SearchResults = userList;
    this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.props, this.props);
  }

  render(): string {
    return template;
  }
}
