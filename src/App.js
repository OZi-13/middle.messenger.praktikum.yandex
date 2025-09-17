import Handlebars from 'handlebars';
import * as Pages from './pages';
import mockImage from '../static/mock/message.jpg';
import { chatsListMock, chatMock, profileInfo } from './mockData.js';

import Header from './components/Header.js';
import Input from './components/Input.js';
import Button from './components/Button.js';
import ButtonDiv from './components/ButtonDiv.js';
import Label from './components/Label.js';
import Link from './components/Link.js';
import ChatsList from './components/ChatsList.js';
import Chat from './components/Chat.js';
import ProfileList from './components/ProfileList.js';
import ProfileAvatarEdit from './components/ProfileAvatarEdit.js';
import BoxHeader from './components/BoxHeader.js';
import NavLine1 from './components/NavLine1.js';
import NavLine2 from './components/NavLine2.js';

Handlebars.registerPartial('Header', Header);
Handlebars.registerPartial('Input', Input);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('ButtonDiv', ButtonDiv);
Handlebars.registerPartial('Label', Label);
Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('ChatsList', ChatsList);
Handlebars.registerPartial('Chat', Chat);
Handlebars.registerPartial('ProfileList', ProfileList);
Handlebars.registerPartial('ProfileAvatarEdit', ProfileAvatarEdit);
Handlebars.registerPartial('BoxHeader', BoxHeader);
Handlebars.registerPartial('NavLine1', NavLine1);
Handlebars.registerPartial('NavLine2', NavLine2);

export default class App {
    constructor() {
        this.state = {
            currentPage: 'loginPage',
            //questions: [],
            //answers: [],
        };
        this.appElement = document.getElementById('app');
    }

    render() {
        let template;
        let pageDatas;
        let pageInfo;
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
                messageImage: mockImage
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
        else if (this.state.currentPage === 'noPage') {
            pageInfo = Pages.NoPage;
        }
        else if (this.state.currentPage === 'noServerPage') {
            pageInfo = Pages.NoServerPage;
        }
        this.pagesRender(pageInfo, pageDatas);
        this.attachEventListeners();
    }

    attachEventListeners() {
        if (this.state.currentPage === 'loginPage') {
        }
        else if (this.state.currentPage === 'registrationPage') {
        }
        else if (this.state.currentPage === 'chatsPage') {
        }
        else if (this.state.currentPage === 'profilePage') {
            const modalBtn = document.getElementById('modal-btn');
            const modalBlack = document.getElementById('modal-back');

            modalBtn.addEventListener('click', () => this.modalBtn());
            modalBlack.addEventListener('click', (e) => this.modalBlackClose(e));
        }
        else if (this.state.currentPage === 'profileEditPage') {
        }
        else if (this.state.currentPage === 'profileEditPassPage') {
        }
        else if (this.state.currentPage === 'noPage') {
        }
        else if (this.state.currentPage === 'noServerPage') {
        }
        if (this.state.currentPage === 'noServerPage') {
        }

        const formBtn = document.getElementById('form-btn');
        if(formBtn) {
            formBtn.addEventListener('click', (e) => this.submitBtn(e));
        }

        const changePageBtns = document.querySelectorAll('.nav-btn');
        changePageBtns.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.changePage(e.target.dataset.page);
            });
        });
    }

    changePage(page) {
        if (this.state.currentPage != page){
            this.state.currentPage = page;
            this.render();
        }
    }

    pagesRender(page, datas) {
        let template = Handlebars.compile(page);
        const tmpData = template(datas);

        const tmpElement = document.createElement('div');
        tmpElement.innerHTML = tmpData;

        const fragment = document.createDocumentFragment();

        while (tmpElement.firstChild) {
            fragment.appendChild(tmpElement.firstChild);
        }

        this.appElement.innerHTML = '';
        this.appElement.appendChild(fragment);
    }

    submitBtn(e) {
        e.preventDefault();
        alert('Допустим, записали!');
    }

    modalBtn() {
        const modalBack = document.getElementById('modal-back');
        const modal = document.getElementById('modal');

        modalBack.classList.remove('none');
        modal.classList.remove('none');
    }

    modalBlackClose(e) {
        const modalBlack = e.currentTarget;
        const modal = document.getElementById('modal');

        modalBlack.classList.add('none');
        modal.classList.add('none');
    }
}
