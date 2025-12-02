import ChatApi from "../api/chatApi.ts";
import * as apiType from "./apiType.ts";

type LastMessageUserType = {
    first_name: string;
    second_name: string;
    avatar: string | null;
    email: string;
    login: string;
    phone: string;
};

type LastMessageType = {
    user: LastMessageUserType;
    time: string;
    content: string;
};

export type ChatItemType = {
    id: number;
    title: string;
    avatar: string | null;
    unread_count: number | null;
    created_by: number;
    last_message: LastMessageType | null;
};

export type ChatListResponseType = ChatItemType[];

export type ChatCreateType = {
    title: string;
};

export type ChatCreateResponseType = {
    id: number;
};

export type ChatDeleteType = {
    chatId: number;
};

type ChatDeleteResultType = {
        id: number,
        title: string,
        avatar: string | null,
        created_by: number
};

export type ChatDeleteResponseType = {
    userId: number,
    result: ChatDeleteResultType
};

export type ChatMappedType = {
    id: number,
    title: string,
    last_message_user_name: string,
    time: string,
    unread_count: number,
    content: string,
    admin: number,
    events: {
        click: (event: Event) => void;
    };
}

export type ChatsListMappedType = Record<number, ChatMappedType>

export type ChatsUsersListResponseType = {
    id: number
    first_name: string
    second_name: string
    display_name: string
    login: string
    avatar: string
    role: string
}[]

export type ChatsUsersToggleType = {
    users: number[]
    chatId: number
}

export type ChatsUsersAddType = {
    users: string
}

export type ChatTokenResponseType = [
    {token: string}
]

export type ChatUserResponseType = Omit<apiType.UserDTO, 'phone' | 'email'>  & {
    role: string
}

export type ChatSelectedType = {
    id: number
    header: string
    admin: number
}
