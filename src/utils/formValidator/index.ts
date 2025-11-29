import { FormValidatorData } from './formValidatorData.ts';
type Nullable<T> = T | null;
type FormResult = Record<string, string | FileList>;

class FormValidatorClass {

    private validateField(
        element: HTMLInputElement | HTMLTextAreaElement,
        mode: string
    ): Nullable<string> {

        const name = element.name;
        const rule = FormValidatorData[name];

        if (rule) {
            const [validator, errorMessage] = rule;

            // 1. Проверка, является ли поле файлом
            if (typeof validator === 'function') {
                const files = (element as HTMLInputElement).files; // Получаем FileList

                // Если это валидатор-функция (для файлов)
                if (!validator(files)) {
                    return errorMessage;
                }
                // 💡 Валидация файлов не требует дополнительной проверки на 'required',
                // так как это обрабатывается внутри validateAvatarFile (проверка на files.length === 0)
            }

            // 2. Проверка, является ли поле строкой (через RegExp)
            else if (validator instanceof RegExp) {
                const value = element.value;

                // Проверка по шаблону (если значение есть)
                if (value && !validator.test(value)) {
                    return errorMessage;
                }

                // Проверка на обязательность (если это строка)
                if (mode === 'submit' && !value) {
                    return 'Поле обязательно для заполнения';
                }
            }
        }
        return null;
    }

  public formValidateElement(e: HTMLInputElement | HTMLTextAreaElement, mode: string): boolean  {
    const ErrorDivOld = e.nextElementSibling;
    if (ErrorDivOld && ErrorDivOld.classList.contains('form-error_box')) {
      e.classList.remove('form-error_element');
      ErrorDivOld.remove();
    }

      const validated: Nullable<string> = this.validateField(e, mode);

    if (validated) {
      e.classList.add('form-error_element');
      const wrapErrorDiv: HTMLDivElement = document.createElement('div');
      wrapErrorDiv.classList.add('form-error_box');
      e.after(wrapErrorDiv);

      const errorDiv: HTMLDivElement = document.createElement('div');
      errorDiv.innerHTML = validated;
      wrapErrorDiv.appendChild(errorDiv);

      return false;
    } else return true;
  }

    public submitForm(e: Event): FormResult | null { // 🔑 ИЗМЕНЕН ВОЗВРАЩАЕМЫЙ ТИП
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        const inputElements: NodeListOf<HTMLInputElement | HTMLTextAreaElement> =
            form.querySelectorAll('.form-validate');

        const formValues: FormResult = {}; // 🔑 ИСПОЛЬЗУЕМ НОВЫЙ ТИП
        let isFormValid = true;

        inputElements.forEach(input => {
            const isValid = this.formValidateElement(input, 'submit');
            if (!isValid) {
                isFormValid = false;
            }

            if (input.name) {
                // 🔑 НОВАЯ ЛОГИКА СБОРА ДАННЫХ
                if (input.type === 'file') {
                    const fileInput = input as HTMLInputElement;

                    // Собираем FileList, только если он не пустой (и валидация пройдена)
                    if (fileInput.files && fileInput.files.length > 0) {
                        formValues[input.name] = fileInput.files;
                    }
                    // Если файл не выбран, но он обязателен,
                    // валидация в formValidateElement уже вернет false.
                } else {
                    // Собираем value для всех остальных полей
                    formValues[input.name] = input.value;
                }
            }
        });

        if (isFormValid) {
            console.log('✅ Валидация пройдена, собраны значения:');
            console.log(formValues);
            return formValues;
        } else {
            console.log('❌ Валидация не прошла.');
            return null;
        }
    }
}

export const FormValidator = new FormValidatorClass();
