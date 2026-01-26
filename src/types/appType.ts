import * as Type from './apiType';
import { ChatsListMappedType, ChatSelectedType } from './chatType';
import { MessageListType } from './messageType';
import { StoreEvents, Action } from '../framework/Store';
import { EventCallback } from '../framework/EventBus';

export type AppStateType = {
  user: Type.UserDTO | null;
  responseError: string | null;
  chats: ChatsListMappedType | [];
  selectedChat: ChatSelectedType | null;
  messages: MessageListType | [];
  apiError?: Type.ResponseError | null;
};

export const DEFAULT_STATE: AppStateType = {
  user: null,
  responseError: null,
  chats: [],
  selectedChat: null,
  messages: [],
  apiError: null,
};

export interface StoreInterface {
  on(event: StoreEvents.Updated, callback: (oldState: AppStateType, newState: AppStateType) => void): void;
  on(event: string, callback: EventCallback): void;
  off(event: string, callback: EventCallback): void;
  emit(event: string, ...args: unknown[]): void;
  getState(): AppStateType;
  get<T extends keyof AppStateType>(key: T): AppStateType[T];
  set(nextStateOrPath: Partial<AppStateType> | string, value?: unknown): void;
  dispatch(action: Action): void;
}
