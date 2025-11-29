import ChatApi from '../api/chatApi';
import {ResponseError } from "../types/authType.ts";
import {ROUTER} from '../utils/links.ts';
import * as Type from '../types/chatType.ts';
import {ChatCreateResponseType} from "../types/chatType.ts";

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

    public async chatCreate(data: Type.ChatCreateType): Promise<void> {
        this.store.set({
            responseError: null,
        });

        try {
            const newChat: ChatCreateResponseType = await this.api.chatCreate(data);
            console.log('Создали чат ', newChat);
            this.store.set({ chats: newChat });

        } catch (error) {
            const reason = (error as ResponseError).reason || 'Неизвестная ошибка';
            this.store.set({ responseError: reason });
        }
    }
}
