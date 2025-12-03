import WSTransport, { WSEvents } from '../framework/WSTransport';
import ChatApi from '../api/chatApi';
import { ChatTokenResponseType } from '../types/chatType';
import { Store } from '../framework/Store';
import { escapeHtml } from '../utils/sanitize';
import { MessageType } from '../types/messageType';

export default class MessageService {
  private readonly api: ChatApi;

  private sockets: Record<number, WSTransport> = {};

  private store: Store;

  constructor() {
    this.api = new ChatApi();
    this.store = Store.getInstance();
  }

  public async connectToChat(chatId: number): Promise<void> {
      const tokenResponse: ChatTokenResponseType = await this.api.getToken(chatId);

      const tokenObject = tokenResponse[0];
      const { token } = tokenObject;

      const currentUser = this.store.get('user');
    const currentUserId = currentUser?.id;
    if (!currentUserId) {
      throw new Error('Пользователь не авторизован');
    }

    const socket = new WSTransport(currentUserId, chatId, token);
    this.sockets[chatId] = socket;

    socket.on(WSEvents.Message, this.handleNewMessages);
    socket.on(WSEvents.Connected, () => this.afterConnected(chatId));

    socket.connect();
  }

  private afterConnected(chatId: number): void {
    this.getOldMessages(chatId, 0);
  }

  public sendMessage(chatId: number, content: string): void {
    const socket = this.sockets[chatId];
    if (socket) {
      const sanitizedContent = escapeHtml(content);

      socket.send({
        content: sanitizedContent,
        type: 'message',
      });
    }
    //console.log('Сообщение отправлено')
  }

  public getOldMessages(chatId: number, offset: number): void {
    const socket = this.sockets[chatId];
    if (socket) {
      socket.send({
        content: String(offset),
        type: 'get old',
      });
    }
  }

  private handleNewMessages = (data: unknown) => {
    //console.log('Сообщение пришло' + data)

    if (Array.isArray(data)) {
      // Экранирование массива старых сообщений
      const sanitizedData = (data as MessageType[]).map(msg => {
        if (msg.content) {
          msg.content = escapeHtml(msg.content);
        }
        return msg;
      });

      this.store.dispatch({
        type: 'ADD_OLD_MESSAGES',
        payload: sanitizedData,
      });

    } else if (data && typeof data === 'object' && 'type' in data) {
      const message = data as MessageType;

      if (message.type === 'message' || message.type === 'file' || message.type === 'sticker') {

        // Экранирование нового единичного сообщения
        if (message.content) {
          message.content = escapeHtml(message.content);
        }

        this.store.dispatch({
          type: 'ADD_NEW_MESSAGE',
          payload: message,
        });
      } else if (message.type === 'user connected') {
        console.log(`Пользователь ${message.content} подключился`);
      }
    }
  };

  public disconnectFromChat(chatId: number): void {
    const socket = this.sockets[chatId];
    if (socket) {
      socket.close();
      delete this.sockets[chatId];
    }
  }
}