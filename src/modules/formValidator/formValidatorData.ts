type FormValidatorPattern = [RegExp, string];
type FormValidatorObject = Record<string, FormValidatorPattern>;

export const FormValidatorData: FormValidatorObject = {
  first_name: [/^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ\-]+$/, 'Первая буква загл. Можно только буквы (лат/кир) и дефис.'],
  second_name: [/^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ\-]+$/, 'Первая буква загл. Можно только буквы (лат/кир) и дефис.'],
  login: [/^(?!^\d+$)[a-zA-Z0-9\-_]{3,20}$/, 'От 3 до 20 симв. Латиница, цифры, -, _. Не может состоять только из цифр.'],
  password: [/^(?=.*[A-Z])(?=.*\d).{8,40}$/, 'От 8 до 40 симв. Обязательно: 1 заглавная лат. буква и 1 цифра.'],
  email: [/^[a-zA-Z0-9\-_.]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/, 'Должен содержать @ и доменное имя. Можно: лат. буквы, цифры, -, _.'],
  phone: [/^\+?\d{10,15}$/, 'От 10 до 15 цифр. Может начинаться с плюса "+".'],
  message: [/\S+/, 'Сообщение не должно быть пустым'],
};

export const FormValidatorKeys: string[] = Object.keys(FormValidatorData);
