import { User } from "./types/User.ts";

export class Bot {
    private readonly url: string

    constructor(token: string) {
        this.url = `https://api.telegram.org/bot${token}`
    }

    public async getMe(): Promise<User> {
        const response = await fetch(`${this.url}/getMe`) 
        return JSON.parse(await response.text()).result
    }
}