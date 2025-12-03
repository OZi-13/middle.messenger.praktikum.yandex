import * as apiType from './apiType';

export type UserEditType = Omit<apiType.UserDTO, 'avatar' | 'id'>;

export type UserEditPassType = {
  oldPassword: string,
  newPassword: string
};

export type UserEditAvatarType = {
  avatar: FileList;
};

export type getUserAvatarType = {
  avatar: FileList;
};

export const profileInfoConst:  { header: string, name: keyof apiType.UserDTO }[] = [
  { header: 'Имя', name: 'first_name' },
  { header: 'Фамилия', name: 'second_name' },
  { header: 'Логин', name: 'login' },
  { header: 'Почта', name: 'email' },
  { header: 'Телефон', name: 'phone' },
  { header: 'Имя в чате', name: 'display_name' },
];
