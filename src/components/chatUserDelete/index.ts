import Block, { BlockProps } from '../../framework/Block';
import { UserList } from '../userList';
import { wrapStore } from '../../utils/wrapStore';
import { AppStateType } from '../../types/appType';
import ChatService from '../../services/chatService';
import { ChatsUsersAddType } from '../../types/chatType';
import { UserDTO } from '../../types/apiType';

interface ChatUserDeleteProps extends BlockProps {
  selectedChatUsers: UserDTO[];
}

class ChatUserDelete extends Block {
  constructor(props: ChatUserDeleteProps) {
    const chatService = new ChatService(window.store);

    super({
      ...props,
      UserList: new UserList({
        users: props.selectedChatUsers || [],
        buttonText: 'Удалить',
        buttonClass: 'btn-red btn-small',
        onUserClick: (userId: number) => {
          const data: ChatsUsersAddType = { users: String(userId) };
          chatService.chatUserDelete(data).catch(console.error);
        },
      }),
    });
  }

  protected override componentDidUpdate(oldProps: ChatUserDeleteProps, newProps: ChatUserDeleteProps): boolean {
    if (oldProps.selectedChatUsers !== newProps.selectedChatUsers) {
      const chatService = new ChatService(window.store);
      this.children.UserList = new UserList({
        users: newProps.selectedChatUsers || [],
        buttonText: 'Удалить',
        buttonClass: 'btn-red btn-small',
        onUserClick: (userId: number) => {
          const data: ChatsUsersAddType = { users: String(userId) };
          chatService.chatUserDelete(data).catch(console.error);
        },
      });
      return true;
    }
    return false;
  }

  render() {
    return '{{{UserList}}}';
  }
}

const mapStateToProps = (state: AppStateType) => {
  const allUsers = state.selectedChat?.users || [];
  const currentUserId = state.user?.id;
  // Фильтруем пользователей, исключая текущего
  const filteredUsers = allUsers.filter(user => user.id !== currentUserId);

  return {
    selectedChatUsers: filteredUsers as unknown as UserDTO[],
  };
};

export const ChatUserDeleteConnected = wrapStore(mapStateToProps)(ChatUserDelete);
