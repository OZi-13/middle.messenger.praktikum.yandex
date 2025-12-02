import * as Type from './apiType';
import {ChatListResponseType, ChatSelectedType, ChatUserResponseType} from './chatType';

export type AppStateType = {
    user: Type.UserDTO | null;
    responseError: string | null;
    chats: ChatListResponseType;
    selectedChat: ChatSelectedType | null;
    messages: unknown[];
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
