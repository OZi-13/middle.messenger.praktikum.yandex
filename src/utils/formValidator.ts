import { FormValidatorData, FormResult } from '../types/validatorType';

type Nullable<T> = T | null;

class FormValidatorClass {

  private validateField(
    element: HTMLInputElement | HTMLTextAreaElement,
    mode: string,
  ): Nullable<string> {

    const name = element.name;
    const rule = FormValidatorData[name];

    if (rule) {
      const [validator, errorMessage] = rule;

      if (typeof validator === 'function') {
        const files = (element as HTMLInputElement).files;

        if (!validator(files)) {
          return errorMessage;
        }
      }

      else if (validator instanceof RegExp) {
        const value = element.value;

        if (value && !validator.test(value)) {
          return errorMessage;
        }

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

  public submitForm(e: Event): FormResult | null {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const inputElements: NodeListOf<HTMLInputElement | HTMLTextAreaElement> =
            form.querySelectorAll('.form-validate');

    const formValues: FormResult = {};
    let isFormValid = true;

    inputElements.forEach(input => {
      const isValid = this.formValidateElement(input, 'submit');
      if (!isValid) {
        isFormValid = false;
      }

      if (input.name) {
        if (input.type === 'file') {
          const fileInput = input as HTMLInputElement;

          if (fileInput.files && fileInput.files.length > 0) {
            formValues[input.name] = fileInput.files;
          }
        } else {
          formValues[input.name] = input.value;
        }
      }
    });

    if (isFormValid) {
      //console.log('✅ Валидация пройдена, собраны значения:');
      //console.log(formValues);
      return formValues;
    } else {
      //console.log('❌ Валидация не прошла.');
      return null;
    }
  }
}

export const FormValidator = new FormValidatorClass();
