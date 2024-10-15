import { InputFile } from "./types/InputFile.ts";
import {
  Message,
  MessageEntity,
  MessageId,
  ParseMode,
  type ReplyParameters,
} from "./types/Message.ts";
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
    params?: Record<string, unknown>,
  ) {
    const requestInit: RequestInit = {
      method: "POST",
    };

    if (params) {
      const formData = new FormData();

      for (const [name, value] of Object.entries(params)) {
        if (typeof value === "string") {
          formData.append(name, value);
          continue;
        }
        if (typeof value === "boolean" || typeof value === "number") {
          formData.append(name, value.toString());
          continue;
        }
        if (value instanceof InputFile) {
          formData.append(name, await value.getBlob());
          continue;
        }
        formData.append(name, JSON.stringify(value));
      }

      requestInit.body = formData;
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
          if (!update_id || update.update_id > update_id) {
            update_id = update.update_id;
          }
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
    reply_parameters?: ReplyParameters;
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
    chat_id: number | string;
    message_thread_id?: number;
    from_chat_id: number | string;
    message_id: number;
    caption?: string;
    parse_mode?: ParseMode;
    caption_entities?: MessageEntity[];
    show_caption_above_media?: boolean;
    disable_notification?: boolean;
    protect_content?: boolean;
    reply_parameters?: ReplyParameters;
    reply_markup?:
      any; /*InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply*/
  }): Promise<MessageId> {
    return await this.callTelegramAPI("copyMessage", params);
  }

  public async copyMessages(params: {
    chat_id: number | string;
    message_thread_id?: number;
    from_chat_id: number | string;
    message_ids: number[];
    disable_notification?: boolean;
    protect_content?: boolean;
    remove_caption?: boolean;
  }): Promise<MessageId[]> {
    return await this.callTelegramAPI("copyMessages", params);
  }

  public async sendPhoto(params: {
    business_connection_id?: string;
    chat_id: number | string;
    message_thread_id?: number;
    photo: InputFile | string;
    caption?: string;
    parse_mode?: ParseMode;
    caption_entities?: MessageEntity[];
    show_caption_above_media?: boolean;
    has_spoiler?: boolean;
    disable_notification?: boolean;
    protect_content?: boolean;
    message_effect_id?: string;
    reply_parameters?: ReplyParameters;
    reply_markup?:
      any; /*InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply*/
  }): Promise<Message> {
    return await this.callTelegramAPI("sendPhoto", params);
  }

  public async sendAudio(params: {
    business_connection_id?: string;
    chat_id: number | string;
    message_thread_id?: number;
    audio: InputFile | string;
    caption?: string;
    parse_mode?: ParseMode;
    caption_entities?: MessageEntity[];
    duration?: number;
    performer: string;
    title?: string;
    thumbnail?: InputFile | string;
    disable_notification?: boolean;
    protect_content?: boolean;
    message_effect_id?: string;
    reply_parameters?: ReplyParameters;
    reply_markup?:
      any; /*InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply*/
  }) {
    return await this.callTelegramAPI("sendAudio", params);
  }
}
