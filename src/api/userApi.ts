import HTTPTransport from '../framework/httpTransport';
import { UserDTO } from '../types/apiType';
import * as Type from '../types/userType';

const userApi = new HTTPTransport('user');

export default class UserApi {
    async edit(data: Type.UserEditType): Promise<UserDTO> {
        return userApi.put<UserDTO>('/profile', { data });
    }

    async editPassword(data: Type.UserEditPassType): Promise<void> {
        return userApi.put('/password', { data });
    }

    async editAvatar(data: Type.UserEditAvatarType): Promise<UserDTO> {
        return userApi.put<UserDTO>('/profile/avatar', { data });
    }
}