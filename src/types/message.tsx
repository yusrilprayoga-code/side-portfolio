export type Message = {
    role: 'user' | 'bot'
    content: string
    fullContent?: string
}