import { Message } from "./Message.ts";

export type Update = {
  update_id: number;
  message?: Message;
  edited_message?: Message;
  channel_post?: Message;
  edited_channel_post?: Message;
  business_connection?: any; /*: BusinessConnection*/
  business_message?: Message;
  edited_business_message?: Message;
  deleted_business_messages?: any; /*: BusinessMessagesDeleted*/
  message_reaction?: any; /*: MessageReactionUpdated*/
  message_reaction_count?: any; /*: MessageReactionCountUpdated*/
  inline_query?: any; /*: InlineQuery*/
  chosen_inline_result?: any; /*: ChosenInlineResult*/
  callback_query?: any; /*: CallbackQuery*/
  shipping_query?: any; /*: ShippingQuery*/
  pre_checkout_query?: any; /*: PreCheckoutQuery*/
  purchased_paid_media?: any; /*: PaidMediaPurchased*/
  poll?: any; /*: Poll*/
  poll_answer?: any; /*: PollAnswer*/
  my_chat_member?: any; /*: ChatMemberUpdated*/
  chat_member?: any; /*: ChatMemberUpdated*/
  chat_join_request?: any; /*: ChatJoinRequest*/
  chat_boost?: any; /*: ChatBoostUpdated*/
  removed_chat_boost?: any; /*: ChatBoostRemoved*/
};

export type UpdateType = keyof Omit<Update, "update_id">;
