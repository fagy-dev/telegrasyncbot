import { Message, MessageEntity, MessageId, ParseMode } from "./types/Message.ts";
import { Update, UpdateType } from "./types/Update.ts";
import { User } from "./types/User.ts";

export class Bot {
  private readonly url: string;
  private handlers: ((update: Update, bot: Bot) => unknown)[] = [];

  constructor(token: string) {
    this.url = `https://api.telegram.org/bot${token}`;
  }

  private async callTelegramAPI(
    methodName: string,
    params?: Record<string, any>,
  ) {
    const requestInit: RequestInit = {
      method: "POST",
    };

    if (params) {
      const urlParams: Record<string, string> = {};

      for (const [key, value] of Object.entries(params)) {
        if (typeof value === "string") {
          urlParams[key] = value;
          continue;
        }
        if (typeof value === "boolean" || typeof value === "number") {
          urlParams[key] = value.toString();
          continue;
        }
        urlParams[key] = JSON.stringify(value);
      }

      requestInit.body = new URLSearchParams(urlParams);
    }

    const response = await fetch(`${this.url}/${methodName}`, requestInit);
    const result = await response.json();
    return result.result;
  }

  public addHandler(handler: (update: Update, bot: Bot) => Promise<unknown>) {
    this.handlers.push(handler);
  }

  public polling(
    params: {
      offset?: number;
      limit?: number;
      timeout?: number;
      allowedUpdates?: UpdateType[];
    } = { timeout: 10 },
  ) {
    this.getUpdates(params).then(
      (updates) => {
        let update_id;
        for (const update of updates) {
          if (!update_id) update_id = update.update_id;
          else if (update.update_id > update_id) update_id = update.update_id;
          this.handlers.forEach((handler) => handler(update, this));
        }
        if (params) params.offset = update_id ? update_id + 1 : undefined;
        console.log();
        this.polling(params);
      },
    );
  }

  // Getting updates

  public async getUpdates(
    params?: {
      offset?: number;
      limit?: number;
      timeout?: number;
      allowedUpdates?: UpdateType[];
    },
  ): Promise<Update[]> {
    return await this.callTelegramAPI("getUpdates", params);
  }

  // setWebhook
  // deleteWebhook
  // getWebhookInfo

  // Available methods

  public async getMe(): Promise<User> {
    return await this.callTelegramAPI("getMe");
  }

  // logOut
  // close

  public async sendMessage(params: {
    business_connection_id?: string;
    chat_id: number | string;
    message_thread_id?: number;
    text: string;
    parse_mode?: ParseMode;
    entities?: MessageEntity[];
    link_preview_options?: any; /*LinkPreviewOptions*/
    disable_notification?: boolean;
    protect_content?: boolean;
    message_effect_id?: string;
    reply_parameters?: any; /*ReplyParameters*/
    reply_markup?:
      any; /*InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply*/
  }): Promise<Message> {
    return await this.callTelegramAPI("sendMessage", params);
  }

  public async forwardMessage(params: {
    chat_id: number | string;
    message_thread_id?: number;
    from_chat_id: number | string;
    disable_notification?: boolean;
    protect_content?: boolean;
    message_id: number;
  }): Promise<Message> {
    return await this.callTelegramAPI("forwardMessage", params);
  }

  public async forwardMessages(params: {
    chat_id: number | string;
    message_thread_id?: number;
    from_chat_id: number | string;
    message_ids: number[];
    disable_notification?: boolean;
    protect_content?: boolean;
  }): Promise<Message> {
    return await this.callTelegramAPI("forwardMessages", params);
  }

  public async copyMessage(params: {
    chat_id: number | string
    message_thread_id?: number
    from_chat_id: number | string
    message_id: number
    caption?: string
    parse_mode?: ParseMode
    caption_entities?: MessageEntity[]
    show_caption_above_media?: boolean
    disable_notification?: boolean
    protect_content?: boolean
    reply_parameters?: any /*ReplyParameters*/
    reply_markup?: any /*InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply*/
  }): Promise<MessageId> {
    return await this.callTelegramAPI('copyMessage', params)
  }
}
