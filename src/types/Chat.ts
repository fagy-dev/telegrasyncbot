export type Chat = {
    id: number
    type:  "private" | "group" | "supergroup" | "channel"
    title?: string
    username?: string
    first_name?: string
    is_forum?: true
}