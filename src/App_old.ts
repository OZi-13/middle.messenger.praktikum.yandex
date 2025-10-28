import Handlebars from 'handlebars';
import * as Pages from './pages';
import { chatsListMock, chatMock, profileInfo, ChatsListMockType, ChatMockType, ProfileInfoType } from './helpers/mockData';
import { validator } from './modules/formValidator/formValidatorData';

import Header from './components/header/header.hbs';
import Input from './components/input/input.hbs';
import Button from './components/button/button.hbs';
import Label from './components/label/label.hbs';
import Link from './components/link';
import ChatsList from './components/chatsListItem/chatsListItem.hbs';
import Chat from './components/chat/Chat.js';
import ProfileList from './components/profileListItem/profileListItem.hbs';
import ProfileAvatarEdit from './components/profileAvatarEdit/profileAvatarEdit.hbs';
import BoxHeader from './components/boxHeader/boxHeader.hbs';
import NavLine1 from './components/navLineLeft/navLineLeft.hbs';
import NavLine2 from './components/navLineRight/NavLineRight.js';

Handlebars.registerPartial('Header', Header);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Label', Label);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('ChatsList', ChatsList);
Handlebars.registerPartial('Chat', Chat);
Handlebars.registerPartial('ProfileList', ProfileList);
Handlebars.registerPartial('ProfileAvatarEdit', ProfileAvatarEdit);
Handlebars.registerPartial('BoxHeader', BoxHeader);
Handlebars.registerPartial('NavLine1', NavLine1);
Handlebars.registerPartial('NavLine2', NavLine2);

type Nullable<T> = T | null;

type PageName =
    | 'loginPage'
    | 'registrationPage'
    | 'chatsPage'
    | 'profilePage'
    | 'profileEditPage'
    | 'profileEditPassPage'
    | 'noPage'
    | 'noServerPage';

type PageDataValues = ChatsListMockType[] | ChatMockType[] | ProfileInfoType[];

export default class App {
    private state: Record<string, PageName>;
    private appElement: Nullable<HTMLElement>;

    constructor() {
        this.state = {
            currentPage: 'loginPage',
        };
        this.appElement = document.getElementById('app');
    }

    render(): void {
        let pageDatas: Record<string, PageDataValues> = {};
        let pageInfo: string;
        if (this.state.currentPage === 'loginPage') {
            pageInfo = Pages.LoginPage;
        }
        else if (this.state.currentPage === 'registrationPage') {
            pageInfo = Pages.RegistrationPage;
        }
        else if (this.state.currentPage === 'chatsPage') {
            pageInfo = Pages.ChatsPage;
            pageDatas = {
                chatsList: chatsListMock,
                chatContent: chatMock,
            };
        }
        else if (this.state.currentPage === 'profilePage') {
            pageInfo = Pages.ProfilePage;
            pageDatas = {
                profileInfo: profileInfo
            };
        }
        else if (this.state.currentPage === 'profileEditPage') {
            pageInfo = Pages.ProfileEditPage;
            pageDatas = {
                profileInfo: profileInfo
            };
        }
        else if (this.state.currentPage === 'profileEditPassPage') {
            pageInfo = Pages.ProfileEditPassPage;
        }
        else if (this.state.currentPage === 'noServerPage') {
            pageInfo = Pages.NoServerPage;
        }
        else {
            pageInfo = Pages.NoPage;
        }
        
        this.pagesRender(pageInfo, pageDatas);
        this.attachEventListeners();
    }

    attachEventListeners(): void {
        if (this.state.currentPage === 'profilePage') {

            const modalBtn: Nullable<HTMLElement> = document.getElementById('modalBox-btn');
            if(modalBtn) {
                modalBtn.addEventListener('click', () => this.modal());
            }

            const modalBack: Nullable<HTMLElement> = document.getElementById('modalModal-back');
            if(modalBack) {
                modalBack.addEventListener('click', () => this.modal());
            }
        }

        const validateElement: NodeListOf<HTMLElement> = document.querySelectorAll('.form-validate');
        validateElement.forEach(elem => {
            if(elem){
                elem.addEventListener('blur', (e: FocusEvent): void => {
                    const inputElement = e.target as HTMLInputElement;
                    this.formValidateElement(inputElement, 'blur');
                });
            }
        });

        const form: Nullable<HTMLElement> = document.getElementById('form');
        if (form) {
            form.addEventListener('submit', (e: Event) => {
                this.submitForm(e as Event)
            });
        }

        const changePageBtns: NodeListOf<HTMLElement> = document.querySelectorAll('.nav-btn');
        changePageBtns.forEach(link => {
            if(link){
                link.addEventListener('click', (e: Event): void => {
                    e.preventDefault();
                    if (e.target instanceof HTMLElement) {
                        const page = e.target.dataset.page as PageName;
                        this.changePage(page);
                    }
                });
            }
        });
    }

    changePage(page: PageName): void {
        if (this.state.currentPage != page){
            this.state.currentPage = page;
            this.render();
        }
    }

    private pagesRender(page: string, datas: Record<string, PageDataValues>): void {
        const template = Handlebars.compile(page);
        const tmpData = template(datas);

        const tmpElement: HTMLDivElement = document.createElement('div');
        tmpElement.innerHTML = tmpData;

        const fragment:DocumentFragment = document.createDocumentFragment();

        while (tmpElement.firstChild) {
            fragment.appendChild(tmpElement.firstChild);
        }

        this.appElement!.innerHTML = '';
        this.appElement!.appendChild(fragment);
    }

    submitForm(e: Event): void {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formValues: Record<string, string> = {};
        let isFormValid = true;

        const inputElements: NodeListOf<HTMLInputElement | HTMLTextAreaElement> = document.querySelectorAll('.form-validate');
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
            console.log('✅ Успешно, собраны значения:');
            console.log(formValues);

        } else {
            console.log('❌ Валидация не прошла.');
        }
    }

    formValidateElement(e: HTMLInputElement | HTMLTextAreaElement, mode: string): boolean  {
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

    validatePattern(value: Nullable<string>, name: string, mode: string): Nullable<string>  {
        if (validator[name]) {
            const [regex, errorMessage] = validator[name];
            if(value && !regex.test(value)) return errorMessage;

            if (mode === 'submit' && !value && name !== 'message') return 'Поле обязательно для заполнения';
        }
    }

    modal(): void  {
        const modalBack: Nullable<HTMLElement> = document.getElementById('modalModal-back');
        const modal: Nullable<HTMLElement> = document.getElementById('modalModal');

        if(modalBack) {
            modalBack.classList.toggle('none');
        }
        if(modal) {
            modal.classList.toggle('none');
        }
    }
}
