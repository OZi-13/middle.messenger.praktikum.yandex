import EventBus from './EventBus';
import { AppStateType, DEFAULT_STATE } from '../types/appType';
import { handleDispatch } from './StoreDispatch';

import cloneDeep from '../utils/cloneDeep';
import isPlainObject from '../utils/isPlainObject';
import isEqual from '../utils/isEqual';
import setByPath from '../utils/set';

export enum StoreEvents {
  Updated = 'Updated',
}

export interface Action {
  type: 'ADD_OLD_MESSAGES' | 'ADD_NEW_MESSAGE' | string; // Определяем типы действий
  payload?: unknown;
}

export class Store extends EventBus {
  private static __instance: Store | null = null;

  private state: AppStateType = DEFAULT_STATE;

  private constructor() {
    super();
    this.state = DEFAULT_STATE;
  }

  public static getInstance(): Store {
    if (!Store.__instance) {
      Store.__instance = new Store();
    }
    return Store.__instance;
  }

  public getState(): AppStateType {
    return cloneDeep(this.state);
  }

    public get<T extends keyof AppStateType>(key: T): AppStateType[T] {
        const value = this.state[key];
        if (value === undefined) {
            return value as AppStateType[T];
        }
        return cloneDeep(value) as AppStateType[T];
    }

  /**
     * Обновление вложенных свойств по пути: set('user.firstName', 'Ivan')
     * * @param nextStateOrPath
     * @param value Новое значение
     */
  public set(nextStateOrPath: Partial<AppStateType> | string, value?: unknown): void {
    const prevState = this.state;

    let nextState: AppStateType = cloneDeep(prevState);

    if (typeof nextStateOrPath === 'string' && value !== undefined) {
      setByPath(nextState, nextStateOrPath, value);

    } else if (isPlainObject(nextStateOrPath)) {
      nextState = { ...nextState, ...(nextStateOrPath) } as AppStateType;

    } else {
      return;
    }
    if (isEqual(prevState, nextState)) {
      return;
    }

    this.state = nextState;
    this.emit(StoreEvents.Updated, prevState, nextState);
  }

  public dispatch(action: Action): void {

    const currentState = this.getState();
    const changes = handleDispatch(currentState, action);

    if (Object.keys(changes).length > 0) {
      this.set(changes);
    } else {
      console.warn(`[Store Dispatch] Действие ${action.type} не привело к изменениям.`);
    }
  }
}
