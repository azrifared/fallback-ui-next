import $api from "../http";
import { Message } from "./message-service";

export interface ConversationText {
  id: number;
  conversationId: number;
  message: Message | null;
  messageType: string;
  text: string;
  intentName: string;
}

export class ConversationService {
  static async getConversationTexts(params?: URLSearchParams): Promise<[ConversationText[], number] | undefined> {
    const resp = await $api.get(`/conversation-text${ params ? `?${params}` : '' }`)
    return resp?.data
  }
}
