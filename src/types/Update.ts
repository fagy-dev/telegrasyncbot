export type Update = {
    update_id: number
    message?/*: Message*/
    edited_message?/*: Message*/
    channel_post?/*: Message*/
    edited_channel_post?/*: Message*/
    business_connection?/*: BusinessConnection*/
    business_message?/*: Message*/
    edited_business_message?/*: Message*/
    deleted_business_messages?/*: BusinessMessagesDeleted*/
    message_reaction?/*: MessageReactionUpdated*/
    message_reaction_count?/*: MessageReactionCountUpdated*/
    inline_query?/*: InlineQuery*/
    chosen_inline_result?/*: ChosenInlineResult*/
    callback_query?/*: CallbackQuery*/
    shipping_query?/*: ShippingQuery*/
    pre_checkout_query?/*: PreCheckoutQuery*/
    purchased_paid_media?/*: PaidMediaPurchased*/
    poll?/*: Poll*/
    poll_answer?/*: PollAnswer*/
    my_chat_member?/*: MyChatMember*/
    chat_member?/*: ChatMember*/
    chat_join_request?/*: ChatJoinRequest*/
    chat_boost?/*: ChatBoostUpdated*/
    removed_chat_boost?/*: ChatBoostRemoved*/
}