import { Chat } from "./Chat.ts";
import { User } from "./User.ts";

export type ParseMode = "Markdown" | "HTML" | "MarkdownV2";

export type Message = {
  message_id: number;
  message_thread_id?: number;
  from?: User;
  sender_chat?: Chat;
  sender_boost_count?: number;
  sender_business_bot?: User;
  date: number;
  business_connection_id?: string;
  chat: Chat;
  forward_origin?: MessageOrigin
  is_topic_message?: true;
  is_automatic_forward?: true;
  reply_to_message?: Message;
  external_reply?: any; /*ExternalReplyInfo*/
  quote?: any; /*TextQuote*/
  reply_to_story?: any; /*Story*/
  via_bot?: User;
  edit_date?: number;
  has_protected_content?: true;
  is_from_offline?: true;
  media_group_id?: string;
  author_signature?: string;
  text?: string;
  entities?: any; /*MessageEntity[]*/
  link_preview_options?: any; /*LinkPreviewOptions*/
  effect_id?: string;
  animation?: any; /*Animation*/
  audio?: any; /*Audio*/
  document?: any; /*Document*/
  paid_media?: any; /*PaidMediaInfo*/
  photo?: any; /*PhotoSize[]*/
  sticker?: any; /*Sticker*/
  video?: any; /*Video*/
  video_note?: any; /*VideoNote*/
  voice?: any; /*Voice*/
  caption?: string;
  caption_entities?: any; /*MessageEntity[]*/
  show_caption_above_media?: true;
  has_media_spoiler?: true;
  contact?: any; /*Contact*/
  dice?: any; /*Dice*/
  game?: any; /*Game*/
  poll?: any; /*Poll*/
  venue?: any; /*Venue*/
  location?: any; /*Location*/
  new_chat_members?: User[];
  left_chat_member?: User;
  new_chat_title?: string;
  new_chat_photo?: any; /*PhotoSize[]*/
  delete_chat_photo?: true;
  group_chat_created?: true;
  supergroup_chat_created?: true;
};

export type MessageId = {
  message_id: number;
};

export type InaccessibleMessage = {
  chat: Chat;
  message_id: number;
  date: 0;
};

export type MaybeInaccessibleMessage = Message | InaccessibleMessage;

export type MessageEntity = {
  type:
    | "mention"
    | "hashtag"
    | "cashtag"
    | "bot_command"
    | "url"
    | "email"
    | "phone_number"
    | "bold"
    | "italic"
    | "underline"
    | "strikethrough"
    | "spoiler"
    | "blockquote"
    | "expandable_blockquote"
    | "code"
    | "pre"
    | "text_link"
    | "text_mention"
    | "custom_emoji";
  offset: number;
  length: number;
  url?: string;
  user?: User;
  language?: string;
  custom_emoji_id?: string;
};

export type TextQuote = {
  text: string;
  entities?: MessageEntity[];
  position: number;
  is_manual?: true;
};

export type ExternalReplyInfo = {
  origin: MessageOrigin
  chat?: Chat;
  message_id?: number;
  link_preview_options?: any; /*LinkPreviewOptions*/
  animation?: any; /*Animation*/
  audio?: any; /*Audio*/
  document?: any; /*Document*/
  paid_media?: any; /*PaidMediaInfo*/
  photo?: any[]; /*PhotoSize[]*/
  sticker?: any; /*Sticker*/
  story?: any; /*Story*/
  video?: any; /*Video*/
  video_note?: any; /*VideoNote*/
  voice?: any; /*Voice*/
  has_media_spoiler?: true;
  contact?: any; /*Contact*/
  dice?: any; /*Dice*/
  game?: any; /*Game*/
  giveaway?: any; /*Giveaway*/
  giveaway_winners?: any; /*GiveawayWinners*/
  invoice?: any; /*Invoice*/
  location?: any; /*Location*/
  poll?: any; /*Poll*/
  venue?: any; /*Venue*/
};

export type ReplyParameters = {
  message_id: number;
  chat_id?: number | string;
  allow_sending_without_reply?: boolean;
  quote?: string;
  quote_parse_mode?: ParseMode;
  quote_entities?: MessageEntity[];
  quote_position?: number;
};

export type MessageOrigin =
  | MessageOriginUser
  | MessageOriginHiddenUser
  | MessageOriginChat
  | MessageOriginChannel;

export type MessageOriginUser = {
  type: "user";
  date: number;
  sender_user: User;
};

export type MessageOriginHiddenUser = {
  type: "hidden_user";
  date: number;
  sender_user_name: string;
};

export type MessageOriginChat = {
  type: "chat";
  date: number;
  sender_chat: Chat;
  author_signature?: string;
};

export type MessageOriginChannel = {
  type: "channel";
  date: number;
  chat: Chat;
  message_id: number;
  author_signature?: string;
};
