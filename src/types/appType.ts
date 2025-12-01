import * as Type from './apiType';
import { ChatListResponseType, ChatUserResponseType } from './chatType';

export type AppStateType = {
    user: Type.UserDTO | null;
    responseError: string | null;
    chats: ChatListResponseType;
    chatUsers: ChatUserResponseType[] | null;
    selectedChatId?: number| null;
    messages: any[];
    apiError?: Type.ResponseError | null;
};

export const DEFAULT_STATE: AppStateType = {
    user: null,
    responseError: null,
    chats: [],
    chatUsers: null,
    selectedChatId: null,
    messages: [],
    apiError: null,
};
