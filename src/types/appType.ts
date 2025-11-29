import * as Type from './apiType';
import { ChatListResponseType } from './chatType';

export type AppStateType = {
    user: Type.UserDTO | null;
    responseError: string | null;
    chats: ChatListResponseType;
    selectedChatId?: number| null;
    messages: any[];
    apiError?: Type.ResponseError | null;
};

export const DEFAULT_STATE: AppStateType = {
    user: null,
    responseError: null,
    chats: [],
    selectedChatId: null,
    messages: [],
    apiError: null,
};
