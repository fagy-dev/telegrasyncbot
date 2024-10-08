import { Update, UpdateType } from "./types/Update.ts";
import { User } from "./types/User.ts";

export class Bot {
    private readonly url: string
    private handlers: ((update: Update, bot: Bot) => unknown)[] = []

    constructor(token: string) {
        this.url = `https://api.telegram.org/bot${token}`
    }

    private async callTelegramAPI(methodName: string, params?: Record<string, string>) {
        let input: string = `${this.url}/${methodName}`

        if (params) {
            const queryParams = new URLSearchParams(params).toString()
            input += `?${queryParams}`
        }

        const response = await fetch(input)
        const result = await response.json()
        return result.result
    }


    public async getUpdates(params?: { offset?: number, limit?: number, timeout?: number, allowedUpdates?: UpdateType[] }): Promise<Update[]> {
        const processedParams: Record<string, string> = {}

        if (params) {
            if (params.offset) processedParams['offset'] = params.offset.toString()
            if (params.limit) processedParams['limit'] = params.limit.toString()
            if (params.timeout) processedParams['timeout'] = params.timeout.toString()
            if (params.allowedUpdates) processedParams['allowed_updates'] = params.allowedUpdates.toString()
        }

        return await this.callTelegramAPI('getUpdates', processedParams)
    }

    public async getMe(): Promise<User> {
        return await this.callTelegramAPI('getMe')
    }

    public addHandler(handler: (update: Update, bot: Bot) => Promise<unknown>) {
        this.handlers.push(handler)
    }

    public polling(params:{ offset?: number, limit?: number, timeout?: number, allowedUpdates?: UpdateType[] } = {timeout: 10}) {
        this.getUpdates(params).then(
            (updates) => {
                let update_id
                for (const update of updates) {
                    if (!update_id) update_id = update.update_id
                    else if (update.update_id > update_id) update_id = update.update_id
                    this.handlers.forEach(handler => handler(update, this))
                }
                if (params) params.offset = update_id ? update_id + 1 : undefined
                console.log()
                this.polling(params)
            }
        )
    }
}