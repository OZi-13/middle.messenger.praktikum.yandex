type FormValidatorPattern = [RegExp, string];

type FileValidatorFunction = (value: FileList | null) => boolean;
type FileValidatorPattern = [FileValidatorFunction, string];

type ValidatorRule = FormValidatorPattern | FileValidatorPattern;
type FormValidatorObject = Record<string, ValidatorRule>;

export type FormResult = Record<string, string | FileList>;

export const validateAvatarFile = (value: FileList | null): boolean => {
  if (!value || value.length === 0) return false;
  const file = value[0];
  const MAX_SIZE = 5 * 1024 * 1024;
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

  if (file.size > MAX_SIZE) return false;
  if (!ALLOWED_TYPES.includes(file.type)) return false;

  return true;
};

export const FormValidatorData: FormValidatorObject = {
  first_name: [/^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ\-]+$/, 'Первая буква загл. Можно только буквы (лат/кир) и дефис.'],
  second_name: [/^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ\-]+$/, 'Первая буква загл. Можно только буквы (лат/кир) и дефис.'],
  display_name: [/^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ\-]+$/, 'Первая буква загл. Можно только буквы (лат/кир) и дефис.'],
  login: [/^(?!^\d+$)[a-zA-Z0-9\-_]{3,20}$/, 'От 3 до 20 симв. Латиница, цифры, -, _. Не может состоять только из цифр.'],
  password: [/^(?=.*[A-Z])(?=.*\d).{8,40}$/, 'От 8 до 40 симв. Обязательно: 1 заглавная лат. буква и 1 цифра.'],
  email: [/^[a-zA-Z0-9\-_.]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/, 'Должен содержать @ и доменное имя. Можно: лат. буквы, цифры, -, _.'],
  phone: [/^\+?\d{10,15}$/, 'От 10 до 15 цифр. Может начинаться с плюса "+".'],
  message: [/^[\s\S]{1,512}$/, 'Макс. 512 символов, нет < и >.'],
  avatar: [validateAvatarFile, 'Файл не выбран'],
  title: [/^[a-zA-Zа-яёА-ЯЁ\-]+$/, 'Можно только буквы (лат/кир) и дефис.'],
  users: [/^\d{1,10}$/, 'От 1 до 10 цифр'],

};



export const FormValidatorKeys: string[] = Object.keys(FormValidatorData);
