import * as Pages from './pages';
import { chatsListMock, chatMock, profileInfo, ChatsListMockType, ChatMockType, ProfileInfoType } from './helpers/mockData';

type Nullable<T> = T | null;

export type PageName =
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
        const appContainer = document.getElementById('app');
        if (!appContainer) {
            console.error('Корневой элемент #app не найден!');
            return;
        }

        let newPageElement: HTMLElement | undefined;

        if (this.state.currentPage === 'loginPage') {
            const loginPage = new Pages.LoginPage({
                changePage: this.changePage
            });
            newPageElement = loginPage.getContent();

        } else if (this.state.currentPage === 'registrationPage') {
            const registrationPage = new Pages.RegistrationPage({
                changePage: this.changePage
            });
            newPageElement = registrationPage.getContent();
        }

        if (newPageElement) {
            appContainer.innerHTML = '';
            appContainer.appendChild(newPageElement);
        }
    }

    public changePage = (page: PageName): void =>  {
        if (this.state.currentPage != page){
            this.state.currentPage = page;
            this.render();
        }
    }
}
