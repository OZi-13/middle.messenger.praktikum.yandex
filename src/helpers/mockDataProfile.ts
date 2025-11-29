export type ProfileInfoType = {
  header: string;
  name: string;
  value: string;
};

export const profileInfo:  ProfileInfoType[] = [
  { header: 'Имя', name: 'first_name', value: 'Ольга' },
  { header: 'Фамилия', name: 'second_name', value: 'Иванова' },
  { header: 'Логин', name: 'login', value: 'Olga' },
  { header: 'Почта', name: 'email', value: 'info@olapp.net' },
  { header: 'Телефон', name: 'phone', value: '' },
  { header: 'Имя в чате', name: 'display_name', value: '' },
];
