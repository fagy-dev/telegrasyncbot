import { Chat } from "./Chat.ts";

export type MessageId = {
    message_id: number
}

export type InaccessibleMessage = {
    chat: Chat
    message_id: number
    date: 0
}