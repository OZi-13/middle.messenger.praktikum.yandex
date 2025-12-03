import * as apiType from './apiType';

export type RegistrationType = Omit<apiType.UserDTO, 'avatar' | 'display_name' | 'id'>  & {
  password: string
};

export type RegistrationResponseType = {
  id: number
};

export type LoginType = {
  login: string,
  password: string
};
