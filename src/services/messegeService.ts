import WSTransport, { WSEvents } from '../framework/WSTransport';
import chatApi from '../api/chatApi';
import { Store } from '../framework/Store';

// Пример
class ChatService {
    private sockets: Record<number, WSTransport> = {};
    private store: typeof window.store;

    constructor(store: typeof Store) {
        this.store = store;
    }

    // 1. Получаем токен и подключаемся
    public async connectToChat(chatId: number): Promise<void> {
        // Получаем токен
        const tokenResponse = await chatApi.getToken(chatId);
        const { token } = tokenResponse; // Предполагаем, что ответ - { token: string }

        // Получаем id текущего пользователя из Store
        const currentUserId = this.store.getState().user?.id;
        if (!currentUserId) {
            throw new Error('Пользователь не авторизован');
        }

        // Создаем и сохраняем инстанс WSTransport
        const socket = new WSTransport(currentUserId, chatId, token);
        this.sockets[chatId] = socket;

        // Подписываемся на события сокета
        socket.on(WSEvents.Message, this.handleNewMessages);
        socket.on(WSEvents.Connected, () => this.afterConnected(chatId));

        // Инициируем подключение
        socket.connect();
    }

    // 2. Логика после успешного подключения
    private afterConnected(chatId: number): void {
        // После подключения сразу запрашиваем старые сообщения
        this.getOldMessages(chatId, 0);
    }

    // 3. Отправка сообщения
    public sendMessage(chatId: number, content: string): void {
        const socket = this.sockets[chatId];
        if (socket) {
            socket.send({
                content: content,
                type: 'message',
            });
        }
    }

    // 4. Получение старых сообщений
    public getOldMessages(chatId: number, offset: number): void {
        const socket = this.sockets[chatId];
        if (socket) {
            socket.send({
                content: String(offset),
                type: 'get old',
            });
        }
    }

    // 5. Обработка входящих сообщений и обновление Store
    private handleNewMessages = (data: unknown) => {
        // Здесь должна быть логика обновления Store
        if (Array.isArray(data)) {
            // Массив старых сообщений (get old)
            this.store.dispatch({
                type: 'ADD_OLD_MESSAGES',
                payload: data
            });
        } else if (data && typeof data === 'object' && 'type' in data) {
            const message = data as { type: string, content: string, user_id: string };

            if (message.type === 'message' || message.type === 'file' || message.type === 'sticker') {
                // Новое сообщение
                this.store.dispatch({
                    type: 'ADD_NEW_MESSAGE',
                    payload: data
                });
            } else if (message.type === 'user connected') {
                // Уведомление о подключении пользователя
                console.log(`Пользователь ${message.content} подключился`);
            }
        }
    }

    // 6. Отключение от чата
    public disconnectFromChat(chatId: number): void {
        const socket = this.sockets[chatId];
        if (socket) {
            socket.close();
            delete this.sockets[chatId];
        }
    }
}