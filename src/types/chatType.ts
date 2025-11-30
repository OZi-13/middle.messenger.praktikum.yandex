import ChatApi from "../api/chatApi.ts";

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
    id: string;
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

export type ChatsListMockType = {
    name: string;
    last: string;
    newCount?: string;
};

export type ChatsItemType = {
    id: number,
    title: string,
    last_message_user_name: string,
    time: string,
    unread_count: number,
    content: string,
    events: {
        click: (event: Event) => void;
    };
}

export type ChatsListType = Record<number, ChatsItemType>

