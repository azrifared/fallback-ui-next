import Cookies from 'js-cookie';
import $api from "../http";
import { Message } from './message-service';
import { Cluster } from './cluster-service';
import { ClientSession } from './client-session';
import { Intent } from './intent-service';

interface SelectionDTO {
  intentId: number;
  messageId: string;
  clientSessionId: number;
}

export interface Selection {
  id: number;
  message: Message;
  cluster: Cluster;
  clientSession: ClientSession;
  fallbackIntent: Intent;
  createdDate: Date;
  text: string;
  intent: string;
}

export class SelectionService {
  static async createSelection(selectionForm: SelectionDTO): Promise<Selection | undefined> {
    const resp = await $api.post<Selection>('/fallback-selection/create', selectionForm)
    if (!resp || !resp.data) return
    return resp.data
  }

  static async getSelections(params?: URLSearchParams): Promise<[Selection[], number] | undefined> {
    const resp = await $api.get(`/fallback-selection${ params ? `?${params}` : '' }`)
    return resp?.data
  }

  static async exportSelections(sessionId: number) {
    const resp = await $api.get(`/fallback-selection/download/${sessionId}`, { responseType: 'blob' })
    console.log(resp)
    return resp?.data
  }
}
