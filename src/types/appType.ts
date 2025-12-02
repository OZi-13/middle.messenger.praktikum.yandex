import * as Type from './apiType';
import {ChatListResponseType, ChatSelectedType,} from './chatType';
import {MessageListType} from './messageType';

export type AppStateType = {
    user: Type.UserDTO | null;
    responseError: string | null;
    chats: ChatListResponseType | [];
    selectedChat: ChatSelectedType | null;
    messages: MessageListType | [];
    apiError?: Type.ResponseError | null;
};

export const DEFAULT_STATE: AppStateType = {
    user: null,
    responseError: null,
    chats: [],
    selectedChat: null,
    messages: [],
    apiError: null,
};
