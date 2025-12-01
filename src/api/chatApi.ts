import HTTPTransport from '../framework/httpTransport';
import * as Type from '../types/chatType.ts';
import {ChatsUsersResponseType, ChatsUsersToggleType, ChatTokenResponseType} from "../types/chatType.ts";

const chatApi = new HTTPTransport('chats');

export default class ChatApi {

    //// Chats ////

    async chatList(): Promise<Type.ChatListResponseType> {
        return chatApi.get<Type.ChatListResponseType>('/');
    }

    async chatCreate(data: Type.ChatCreateType): Promise<Type.ChatCreateResponseType> {
        return chatApi.post<Type.ChatCreateResponseType>('/', { data });
    }

    async chatDelete(data: Type.ChatDeleteType): Promise<Type.ChatDeleteResponseType> {
        return chatApi.delete<Type.ChatDeleteResponseType>('/', { data });
    }

    //// Chat Users ////

    async chatUsersList(): Promise<Type.ChatsUsersListResponseType> {
        return chatApi.get<Type.ChatsUsersListResponseType>('/users');
    }

    async chatUsersAdd(data: Type.ChatsUsersToggleType)  {
        return chatApi.put('/users', { data });
    }

    async chatUsersDelete(data: Type.ChatsUsersToggleType) {
        return chatApi.delete('/users', { data });
    }

    async chatToken(id: string): Promise<Type.ChatTokenResponseType> {
        return chatApi.post<Type.ChatTokenResponseType>('/token/{$id}');
    }
}
