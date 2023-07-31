import $api from "../http";
import { Cluster } from './cluster-service'

export interface Conversation {
  id: number;
  extconversationid: string;
}

export interface Message {
  ID: number;
  extconversationid: string;
  messageseqnumber: number;
  messagetimestamp: string;
  text: string;
  cluster: Cluster;
  conversation: Conversation
}

export interface MatrixWithSelection {
  id: string;
  extconversationid: string;
  clusterid: string;
  conversationId: string;
  text: string;
  Score: number;
  intentId?: number;
  clientSessionId?: number;
}

export class MessageService {
  static async getMessages(params?: URLSearchParams): Promise<[Message[], number] | undefined> {
    const resp = await $api.get(`/message${ params ? `?${params}` : '' }`)
    return resp?.data
  }

  static async getMatrixWithSelection(params?: URLSearchParams): Promise<[MatrixWithSelection[], number] | undefined>  {
    const resp = await $api.get(`/matrix/matrix-with-selection${ params ? `?${params}` : '' }`)
    return resp?.data
  }
}
