export interface MessageType {
    id: string;
    time: string;
    user_id: string;
    content: string;
    type: 'message' | 'file' | 'sticker';
}
