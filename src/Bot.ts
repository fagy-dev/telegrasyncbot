import { User } from "./types/User.ts";

export class Bot {
    private readonly url: string

    constructor(token: string) {
        this.url = `https://api.telegram.org/bot${token}`
    }

    private async callTelegramAPI(methodName: string) {
        const response = await fetch(`${this.url}/${methodName}`)
        const result = await response.json()
        return result.result
    }

    public async getMe(): Promise<User> {
        return this.callTelegramAPI('getMe')
    }
}