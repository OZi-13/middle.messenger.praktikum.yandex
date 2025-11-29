import HTTPTransport from '../framework/httpTransport';
import * as Type from '../types/chatType.ts';

const chatApi = new HTTPTransport('chats');

export default class ChatApi {

    async chatList(): Promise<Type.ChatListResponseType> {
        return chatApi.get<Type.ChatListResponseType>('/');
    }

    async chatCreate(data: Type.ChatCreateType): Promise<Type.ChatCreateResponseType> {
        return chatApi.post<Type.ChatCreateResponseType>('/', { data });
    }

    async chatDelete(data: Type.ChatDeleteType): Promise<Type.ChatDeleteResponseType> {
        return chatApi.delete<Type.ChatDeleteResponseType>('/', { data });
    }
}
