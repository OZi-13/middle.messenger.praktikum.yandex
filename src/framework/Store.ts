import EventBus from './eventBus';
import { AppStateType, DEFAULT_STATE } from '../types/appType';

import cloneDeep from '../utils/cloneDeep'
import isPlainObject from '../utils/isPlainObject';
import isEqual from '../utils/isEqual';
import setByPath from '../utils/set';
import {UserDTO} from "../types/apiType.ts";

export enum StoreEvents {
    Updated = 'Updated',
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
            nextState = { ...nextState, ...(nextStateOrPath as Partial<AppStateType>) } as AppStateType;

        } else {
            return;
        }

        if (isEqual(prevState, nextState)) {
            return;
        }

        this.state = nextState;

        this.emit(StoreEvents.Updated, prevState, nextState);
    }
}
