import ChatApi from '../api/chatApi';
import { ResponseError } from "../types/apiType.ts";
import {ROUTER} from '../utils/links.ts';
import  * as ChatType from '../types/chatType.ts';
import * as ApiType from '../types/apiType.ts';
import modal from '../utils/Modal';
import {ChatsListItem} from "../components/chatsListItem";
import {ChatItemType} from "../types/chatType.ts";
import * as Type from "../types/chatType.ts";

interface ChatServiceDependencies {
    store: typeof window.store;
    router: typeof window.router;
}

export default class ChatService {
    private readonly api: ChatApi;
    private readonly store: typeof window.store;
    private readonly router: typeof window.router;

    constructor({ store, router }: ChatServiceDependencies) {
        this.api = new ChatApi();
        this.store = store;
        this.router = router;
    }

    public chatSelect(chatId: number): void {
        window.store.set({ selectedChatId: chatId });
    }

    private chatsMapping(chats: ChatType.ChatListResponseType): ChatType.ChatsListType {

        return chats.reduce((chats, chat: ChatType.ChatItemType) => {
            const last_message = chat.last_message;

            chats[chat.id] = {
                id: chat.id,
                title: chat.title,
                last_message_user_name: last_message ? last_message.user.first_name : ': ',
                time: last_message ? last_message.time : '',
                unread_count: chat.unread_count || 0,
                content: last_message ? last_message.content : 'Нет сообщений',
                events: {
                    click: (event: Event) => {
                        event.preventDefault();
                        this.chatSelect(chat.id);
                    }
                }
            };
            return chats;
        }, {} as ChatType.ChatsListType);
    }

    public async chatCreate(data: ChatType.ChatCreateType): Promise<void> {
        this.store.set({
            responseError: null,
        });

        try {
            await this.api.chatCreate(data);

            const chats: ChatType.ChatListResponseType = await this.api.chatList();
            const chatsMapped: ChatType.ChatsListType = this.chatsMapping(chats as ChatType.ChatListResponseType);

            this.store.set({ chats: chatsMapped });
            modal.close();

        } catch (error) {
            const reason = (error as ResponseError).reason || 'Неизвестная ошибка';
            this.store.set({ responseError: reason });
        }
    }

    public async chatList(): Promise<void> {
        this.store.set({
            responseError: null,
        });

        try {
            const chats: ChatType.ChatListResponseType = await this.api.chatList();
            const chatsMapped: ChatType.ChatsListType = this.chatsMapping(chats as ChatType.ChatListResponseType);
            console.log('Отмапили чат ', chatsMapped);
            this.store.set({ chats: chatsMapped });

        } catch (error) {
            const reason = (error as ResponseError).reason || 'Неизвестная ошибка';
            this.store.set({ responseError: reason });
        }
    }

    public async chatUsers(): Promise<void> {
        this.store.set({
            responseError: null,
        });

        try {
            const users: ChatType.ChatsUsersListResponseType = await this.api.chatUsersList();
            console.log('Пользователи: ', users);


            //const chatsMapped: ChatType.ChatsListType = this.chatsMapping(chats as ChatType.ChatListResponseType);
            //console.log('Отмапили чат ', chatsMapped);
            //this.store.set({ chats: chatsMapped });

        } catch (error) {
            const reason = (error as ResponseError).reason || 'Неизвестная ошибка';
            this.store.set({ responseError: reason });
        }
    }

    public async chatUserAdd(data: ChatType.ChatsUsersToggleType): Promise<void> {
        this.store.set({
            responseError: null,
        });

        try {
            const chatSelectId = this.store.get('chatSelectId');
            await this.api.chatUsersAdd(data);
            modal.close();

        } catch (error) {
            const reason = (error as ResponseError).reason || 'Неизвестная ошибка';
            this.store.set({ responseError: reason });
        }
    }

    public async chatUserDelete(data: ChatType.ChatsUsersToggleType): Promise<void> {
        this.store.set({
            responseError: null,
        });

        try {
            await this.api.chatUsersDelete(data);
            modal.close();

        } catch (error) {
            const reason = (error as ResponseError).reason || 'Неизвестная ошибка';
            this.store.set({ responseError: reason });
        }
    }

    public async chatUserToken(data: string): Promise<void> {
        this.store.set({
            responseError: null,
        });

        try {
            const userToken: ChatType.ChatTokenResponseType = await this.api.chatToken(data as string);

        } catch (error) {
            const reason = (error as ResponseError).reason || 'Неизвестная ошибка';
            this.store.set({ responseError: reason });
        }
    }
}
