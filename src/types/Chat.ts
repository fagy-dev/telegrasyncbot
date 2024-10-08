export type Chat = {
  id: number;
  type: "private" | "group" | "supergroup" | "channel";
  title?: string;
  username?: string;
  first_name?: string;
  is_forum?: true;
};

export type ChatFullInfo = Chat & {
  accent_color_id: number;
  max_reaction_count: number;
  photo?: any; /*ChatPhoto*/
  active_usernames?: string[];
  birthdate?: any; /*Birthdate*/
  business_intro?: any; /*BusinessIntro*/
  business_location?: any; /*BusinessLocation*/
  business_opening_hours?: any; /*BusinessOpeningHours*/
  personal_chat?: Chat;
  available_reactions?: any[]; /*ReactionType[] */
  background_custom_emoji_id?: string;
  profile_accent_color_id?: number;
  profile_background_custom_emoji_id?: string;
  emoji_status_custom_emoji_id?: string;
  emoji_status_expiration_date?: number;
  bio?: string;
  has_private_forwards?: true;
  has_restricted_voice_and_video_messages?: true;
  join_to_send_messages?: true;
  join_by_request?: true;
  description?: string;
  invite_link?: string;
  pinned_message?: any; /*Message*/
  permissions?: any; /*ChatPermissions*/
  can_send_paid_media?: true;
  slow_mode_delay?: number;
  unrestrict_boost_count?: number;
  message_auto_delete_time?: number;
  has_aggressive_anti_spam_enabled?: true;
  has_hidden_members?: true;
  has_protected_content?: true;
  has_visible_history?: true;
  sticker_set_name?: string;
  can_set_sticker_set?: true;
  custom_emoji_sticker_set_name?: string;
  linked_chat_id?: number;
  location?: any; /*ChatLocation*/
};
