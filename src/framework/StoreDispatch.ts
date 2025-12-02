import { AppStateType } from '../types/appType';
import { MessageListType, MessageType } from '../types/messageType';
import { Action } from './Store';

/**
 * Обрабатывает действие и возвращает обновленную часть State.
 * @param state Текущее состояние
 * @param action Объект действия (action)
 * @returns Часть состояния, которую нужно обновить
 */
export const handleDispatch = (state: AppStateType, action: Action): Partial<AppStateType> => {

    if (action.type === 'ADD_OLD_MESSAGES') {
        const oldMessages = state.messages as MessageListType;
        const incomingMessages = action.payload as MessageListType;

        const updatedMessages = [...incomingMessages].reverse().concat(oldMessages);

        return { messages: updatedMessages };

    } else if (action.type === 'ADD_NEW_MESSAGE') {
        const currentMessages = state.messages as MessageListType;
        const newMessage = action.payload as MessageType;

        const updatedMessages = [...currentMessages, newMessage];

        return { messages: updatedMessages };
    }

    return {};
};