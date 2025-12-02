import EventBus from './EventBus';
//import { Store } from './Store';
import { apiUrl, wsUrl } from '../config';

export enum WSEvents {
    Connected = 'connected',
    Error = 'error',
    Message = 'message',
    Close = 'close',
}

//const socket = new WebSocket('wss://ya-praktikum.tech/ws/chats/<USER_ID>/<CHAT_ID>/<TOKEN_VALUE>');
export interface WSData {
    type: string;
    content?: string;
}

export interface WSCloseEvent extends CloseEvent {}

export interface WSErrorEvent extends Event {}

export default class WSTransport extends EventBus {
    private socket: WebSocket | null = null;
    private interval: ReturnType<typeof setInterval> | null = null;
    private url: string;

    constructor(userId: number, chatId: number, token: string) {
        super();
        this.url = `${wsUrl}chats/${userId}/${chatId}/${token}`;
    }

    public connect(): void {
        if (this.socket) {
            this.close();
        }

        this.socket = new WebSocket(this.url);
        this.subscribe(this.socket!);
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

        socket.addEventListener('close', (event: WSCloseEvent) => {
            this.emit(WSEvents.Close, event);
            this.clearInterval();
            if (!event.wasClean) {
                // Здесь можно реализовать логику реконнекта
                console.error('Обрыв соединения WS');
            }
        });

        socket.addEventListener('message', event => {
            const dataString = event.data;

            if (!dataString || dataString === '[]') {
                console.log('WS: Получен пустой или незначащий ответ.');
                return;
            }

            try {
                const data = JSON.parse(dataString);

                if (Array.isArray(data)) {
                    this.emit(WSEvents.Message, data);
                } else if (data && data.type === 'pong') {
                } else {
                    this.emit(WSEvents.Message, data);
                }
            } catch (e) {
                console.error('Не удалось распарсить WS сообщение:', dataString);
            }
        });

        socket.addEventListener('error', (event: WSErrorEvent) => {
            this.emit(WSEvents.Error, event);
        });
    }

    public send(data: WSData): void {

        if (!this.socket) {
            throw new Error('WebSocket не инициализирован');
        }

        if (this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(data));
        } else if (this.socket.readyState === WebSocket.CONNECTING) {
            console.warn('WS: Соединение еще не открыто, ждем...');
            this.socket.addEventListener('open', () => {
                this.socket!.send(JSON.stringify(data));
            }, { once: true });
        } else {
            throw new Error(`WebSocket не подключен или находится в процессе подключения. ReadyState: ${this.socket.readyState}`);
        }
    }

    public close(): void {
        if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
            this.socket.close(1000, 'User changed chat or page');
        }
        this.clearInterval();
        this.socket = null;
    }

    private clearInterval(): void {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }
}
