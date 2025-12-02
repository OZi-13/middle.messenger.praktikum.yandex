export type MessageType = {
    id: number
    time: string
    user_id: number
    content: string
    type: 'message' | 'file' | 'sticker';
    chat_id: number
    file: string | null
    is_read: boolean
}

export type MessageListType = MessageType[]

export type MessageInHtmlType = {
    memberId: number
    content: string
    time: string
    is_read: boolean
    type: 'message' | 'file' | 'sticker';
}
