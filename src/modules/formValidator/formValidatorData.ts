type FormValidatorPattern = [RegExp, string];
type FormValidatorObject = Record<string, FormValidatorPattern>;

export const formValidator: FormValidatorObject = {
    first_name: [/^[A-ZА-Я][a-zA-Zа-яА-Я\-]+$/, 'Первая буква заглавная. Допустимы только буквы (лат/кир) и дефис.'],
    second_name: [/^[A-ZА-Я][a-zA-Zа-яА-Я\-]+$/, 'Первая буква заглавная. Допустимы только буквы (лат/кир) и дефис.'],
    login: [/^(?!^\d+$)[a-zA-Z0-9\-_]{3,20}$/, 'От 3 до 20 символов. Латиница, цифры, дефис, нижнее подчёркивание. Не может состоять только из цифр.'],
    password: [/^(?=.*[A-Z])(?=.*\d).{8,40}$/, 'От 8 до 40 символов. Обязательно хотя бы одна заглавная латинская буква и одна цифра.'],
    email: [/^[a-zA-Z0-9\-_.]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/, 'Должен содержать @ и доменное имя. Разрешены латиница, цифры, дефис, подчёркивание.'],
    phone: [/^\+?\d{10,15}$/, 'От 10 до 15 цифр. Может начинаться с плюса "+".'],
    message: [/\S+/, 'Сообщение не должно быть пустым']
};

export const FormValidatorKeys: string[] = Object.keys(formValidator);
