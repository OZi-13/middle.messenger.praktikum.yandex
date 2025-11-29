import HTTPTransport from '../framework/httpTransport';
import * as ApiType from '../types/apiType';
import * as AuthType from '../types/authType';
import {RegistrationResponseType} from "../types/authType";

const authApi = new HTTPTransport('auth');

export default class AuthApi {
    async create(data: AuthType.RegistrationType): Promise<AuthType.RegistrationResponseType> {
        return authApi.post<RegistrationResponseType>('/signup', { data });
    }

    async login(data: AuthType.LoginType): Promise<void> {
        return authApi.post('/signin', { data });
    }

    async user(): Promise<ApiType.UserDTO> {
        return authApi.get('/user');
    }

    async logout(): Promise<void> {
        return authApi.post('/logout');
    }
}
