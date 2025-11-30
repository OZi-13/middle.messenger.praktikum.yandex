import EventBus from './EventBus';
import { Store } from './Store';
import { apiUrl } from '../config';

//const socket = new WebSocket(apiUrl);

export enum WSEvents {
    Connected = 'connected',
    Error = 'error',
    Message = 'message',
    Close = 'close',
}

export default class WSTransport extends EventBus {
    private socket: WebSocket | null = null;
    private interval: ReturnType<typeof setInterval> | null = null;
    private url: string;

    constructor(userId: number, chatId: number, token: string) {
        super();
        // Формируем полный URL согласно документации: /chats/{chatId}/{userId}/{token}
        // *Важно:* в документации указан URL: /chats/{chatId}/ и передача куки.
        // На практике часто требуется передача user/token в пути, как в старых версиях API.
        // Если API требует **только** куки, ваш URL будет `this.url = ${WS_API_URL}/chats/${chatId}/`;
        // Но для более надежного соединения используем токен, если он доступен:
        this.url = `${apiUrl}/chats/${chatId}/${userId}/${token}`;
    }

    public connect(): void {
        if (this.socket) {
            // Если уже есть, закрываем перед новым подключением
            this.close();
        }

        // Заменяем 'https' в apiUrl на 'wss' для WebSocket, если нужно
        this.socket = new WebSocket(this.url);
        this.subscribe(this.socket);
        this.setupPing();
    }

    private setupPing(): void {
        // Устанавливаем интервал для пинга каждые 30 секунд
        this.interval = setInterval(() => {
            this.send({ type: 'ping' });
        }, 30000);
    }

    private subscribe(socket: WebSocket): void {
        socket.addEventListener('open', () => {
            console.log('Соединение WS установлено');
            this.emit(WSEvents.Connected);
        });

        socket.addEventListener('close', event => {
            this.emit(WSEvents.Close, event);
            this.clearInterval();
            if (!event.wasClean) {
                // Здесь можно реализовать логику реконнекта
                console.error('Обрыв соединения WS');
            }
        });

        socket.addEventListener('message', event => {
            try {
                const data = JSON.parse(event.data);
                if (Array.isArray(data)) {
                    // Обработка старых сообщений (get old)
                    this.emit(WSEvents.Message, data);
                } else if (data.type === 'pong') {
                    // Игнорируем pong, он только для поддержания соединения
                } else {
                    // Обработка новых сообщений, user connected и др.
                    this.emit(WSEvents.Message, data);
                }
            } catch (e) {
                console.error('Не удалось распарсить WS сообщение:', event.data);
            }
        });

        socket.addEventListener('error', event => {
            this.emit(WSEvents.Error, event);
        });
    }

    public send(data: unknown): void {
        if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
            throw new Error('WebSocket не подключен или находится в процессе подключения');
        }

        // Отправляем объект в виде JSON-строки
        this.socket.send(JSON.stringify(data));
    }

    public close(): void {
        this.socket?.close();
        this.clearInterval();
    }

    private clearInterval(): void {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}
