import { validatorKeys } from '../../modules/formValidator/formValidatorData.ts';

export default function Input(props) {
    const isValidate = validatorKeys.includes(props.name);

    const validationClass = isValidate ? ' form-validate' : '';

    const classIn = props.class ? props.class + ' ' + validationClass : validationClass;
    const valueIn = props.value ?? '';
    const placeholderIn = props.placeholder ?? '';

    return `<input type="${props.type}" name="${props.name}" value="${valueIn}" 
                class="input ${classIn}" 
                placeholder="${placeholderIn}">`;
}
