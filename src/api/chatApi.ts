import HTTPTransport from '../framework/httpTransport';
import * as Type from '../types/chatType.ts';
import {ChatDeleteResponseType, ChatDeleteType} from "../types/chatType.ts";

const chatApiInst = new HTTPTransport('chats');

export default class ChatApi {

    //// Chats ////

    async chatList(): Promise<Type.ChatListResponseType> {
        return chatApiInst.get<Type.ChatListResponseType>('/');
    }

    async chatCreate(data: Type.ChatCreateType): Promise<Type.ChatCreateResponseType> {
        return chatApiInst.post<Type.ChatCreateResponseType>('/', { data });
    }

    async chatDelete(data: Type.ChatDeleteType): Promise<Type.ChatDeleteResponseType> {
        return chatApiInst.delete<Type.ChatDeleteResponseType>('/', { data });
    }

    //// Chat Users ////

    async chatUsersList(id: number): Promise<Type.ChatsUsersListResponseType> {
        return chatApiInst.get<Type.ChatsUsersListResponseType>(`/${id}/users`);
    }

    async chatUsersAdd(data: Type.ChatsUsersToggleType)  {
        return chatApiInst.put('/users', { data });
    }

    async chatUsersDelete(data: Type.ChatDeleteType): Promise<ChatDeleteResponseType>{
        return chatApiInst.delete<ChatDeleteResponseType>('/users', { data });
    }

    async getToken(id: number): Promise<Type.ChatTokenResponseType> {
        return chatApiInst.post<Type.ChatTokenResponseType>(`/token/${id}`);
    }
}
