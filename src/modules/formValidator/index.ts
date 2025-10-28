import { FormValidatorData } from './formValidatorData.ts';
type Nullable<T> = T | null;

class FormValidatorClass {

    private validatePattern(value: Nullable<string>, name: string, mode: string): Nullable<string> {
        if (FormValidatorData[name]) {
            const [regex, errorMessage] = FormValidatorData[name];
            if(value && !regex.test(value)) return errorMessage;

            if (mode === 'submit' && !value) return 'Поле обязательно для заполнения';
        }
        return null;
    }

    public formValidateElement(e: HTMLInputElement | HTMLTextAreaElement, mode: string): boolean  {
        const ErrorDivOld = e.nextElementSibling;
        if (ErrorDivOld && ErrorDivOld.classList.contains('form-error_box')) {
            e.classList.remove('form-error_element')
            ErrorDivOld.remove();
        }

        const validated: Nullable<string> = this.validatePattern(e.value, e.name, mode);

        if (validated) {
            e.classList.add('form-error_element')
            const wrapErrorDiv: HTMLDivElement = document.createElement('div');
            wrapErrorDiv.classList.add('form-error_box');
            e.after(wrapErrorDiv);

            const errorDiv: HTMLDivElement = document.createElement('div');
            errorDiv.innerHTML = validated;
            wrapErrorDiv.appendChild(errorDiv);

            return false
        } else return true
    }

    public submitForm(e: Event): Record<string, string> | null {
        e.preventDefault();
        const form = e.target as HTMLFormElement;

        const inputElements: NodeListOf<HTMLInputElement | HTMLTextAreaElement> =
            form.querySelectorAll('.form-validate');

        const formValues: Record<string, string> = {};
        let isFormValid = true;

        inputElements.forEach(input => {
            const isValid = this.formValidateElement(input, 'submit');
            if (!isValid) {
                isFormValid = false;
            }
            if (input.name) {
                formValues[input.name] = input.value;
            }
        });

        if (isFormValid) {
            console.log('✅ Валидация пройдена, собраны значения:');
            console.log(formValues);
            return formValues; // 💡 Возвращаем собранные данные
        } else {
            console.log('❌ Валидация не прошла.');
            return null; // 💡 Возвращаем null
        }
    }
}

export const FormValidator = new FormValidatorClass();