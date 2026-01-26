import HTTPTransport from '../framework/HTTPTransport';
import * as ApiType from '../types/apiType';
import * as AuthType from '../types/authType';
import { RegistrationResponseType } from '../types/authType';

export default class AuthApi {
  private api: HTTPTransport;

  constructor() {
    this.api = new HTTPTransport('auth');
  }

  async create(data: AuthType.RegistrationType): Promise<AuthType.RegistrationResponseType> {
    return this.api.post<RegistrationResponseType>('/signup', { data });
  }

  async login(data: AuthType.LoginType): Promise<void> {
    return this.api.post('/signin', { data });
  }

  async user(): Promise<ApiType.UserDTO> {
    return this.api.get('/user');
  }

  async logout(): Promise<void> {
    return this.api.post('/logout');
  }
}
