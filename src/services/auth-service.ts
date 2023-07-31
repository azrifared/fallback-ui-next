import Cookies from 'js-cookie';
import $api from "../http";
interface FormLogin {
  username: string;
  password: string;
}

export interface User {
  id: number;
  ldapId: string;
  name: string;
  email: string;
  jobRole: string;
  isActive: boolean;
}

interface UserToken {
  user: User;
  tokens: {}
}

export class AuthService {
  static async login(loginValue: FormLogin): Promise<UserToken | undefined> {
    const user = await $api.post<UserToken>('/auth/login', loginValue)

    if (!user?.data?.user) return
    
    Cookies.remove('user-ldap')
    Cookies.set('user-ldap', user.data.user.ldapId)

    return user.data
  }
}
