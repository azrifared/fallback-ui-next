import Cookies from 'js-cookie';
import $api from "../http";

interface User {
  id: number;
  ldapId: string;
  email: string;
  jobRole: string | undefined;
  isActive: boolean;
  name: string;
}

export interface Calculation {
  ID: number;
  calculationDate: Date;
  analysisDateTo: Date;
  analysisDateFrom: Date;
  country: number;
  language: number;
  botName: number;
  state: string;
}

export interface ClientSession {
  ID: number;
  calculation: Calculation;
  user: User;
  createdDate: Date;
}

export interface ClientSessionWithCountSelection {
  clientSessionId: number,
  clientSessionCreatedDate: Date,
  calculationId: number,
  calculationDate: Date,
  calculationAnalysisDateTo: Date,
  calculationAnalysisDateFrom: Date,
  calculationCountry: number,
  calculationBotname: number,
  calculationLanguage: number,
  calculationState: 'inactive' | 'active',
  userId: number,
  userLdapId: string,
  userEmail: string,
  userIsActive: number,
  userName: string,
  selectionCount: string
}

type CreateClientSession = {
  language: string;
  botname: string;
  country: string
}

export class ClientSessionService {
  static async getClientSessionByCurrentUserLdap(): Promise<ClientSession[] | undefined> {
    const userLdap = Cookies.get('user-ldap')
    if (!userLdap) return;
    const resp = await $api.get<ClientSession[]>(`/client-session/${userLdap}`)
    return resp.data
  }

  static async createClientSession(body: CreateClientSession): Promise<ClientSession | undefined> {
    const userLdap = Cookies.get('user-ldap')
    if (!userLdap) return;
    const resp = await $api.post('/client-session/create', { ...body, ldapId: userLdap })
    return resp.data
  }

  static async getClientSessionBySessionId(sessionId: string): Promise<ClientSession | undefined> {
    if (!sessionId) return
    const resp = await $api.get(`/client-session/by-session-id/${sessionId}`)
    return resp?.data
  }

  static async getClientSessionWithCountSelection(params?: URLSearchParams): Promise<[ClientSessionWithCountSelection[], number] | undefined> {
    const resp = await $api.get(`/client-session/with-count-selection${ params ? `?${params}` : '' }`)
    return resp?.data
  }
 }
