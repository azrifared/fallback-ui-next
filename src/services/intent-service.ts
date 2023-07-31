import Cookies from 'js-cookie';
import $api from "../http";
import { User } from './auth-service';

interface IntentDTO {
  languageId: number;
  botId: number;
  countryId: number;
  name: string
}

interface Country  {
  ID: number;
  name: string;
}

interface Language  {
  ID: number;
  name: string;
}

interface Bot  {
  ID: number;
  name: string;
}

export interface Intent {
  id: number;
  country: Country;
  language: Language;
  bot: Bot;
  user: User
  name: string;
  state: string;
  custom?: boolean;
  createdDate?: string;
  section?: string;
  functionOut?: string;
  depth?: number;
  action?: string;
  countryOut?: string;
}

export class IntentService {
  static async createIntent(intentForm: IntentDTO): Promise<Intent | undefined> {
    const ldapId = Cookies.get('user-ldap')
    const body = { ldapId, ...intentForm}
    const intent = await $api.post<Intent>('/fallback-intent/create', body)

    if (!intent?.data) return

    return intent.data
  }

  static async getIntents(): Promise<Intent[] | undefined> {
    const resp = await $api.get<Intent[]>('/fallback-intent/all')
    if (!resp?.data) return
    return resp.data
  }
}
