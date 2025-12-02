import { AppStateType } from '../types/appType';
import { Action } from './Store';

/**
 * Обрабатывает действие и возвращает обновленную часть State.
 * @param state Текущее состояние
 * @param action Объект действия (action)
 * @returns Часть состояния, которую нужно обновить
 */
export const handleDispatch = (state: AppStateType, action: Action): Partial<AppStateType> => {

    if (action.type === 'ADD_OLD_MESSAGES') {
        const oldMessages = state.messages as unknown[];
        const incomingMessages = action.payload as unknown[];

        const updatedMessages = [...incomingMessages.reverse(), ...oldMessages];

        return { messages: updatedMessages };

    } else if (action.type === 'ADD_NEW_MESSAGE') {
        const currentMessages = state.messages as unknown[];
        const newMessage = action.payload;

        // Добавляем новое сообщение в конец.
        const updatedMessages = [...currentMessages, newMessage];

        return { messages: updatedMessages };
    }

    return {};
};