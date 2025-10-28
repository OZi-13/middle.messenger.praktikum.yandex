import * as Pages from './pages';

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
    const appContainer = this.appElement;
    if (!appContainer) {
      console.error('Корневой элемент #app не найден!');
      return;
    }

    let newPageElement: HTMLElement | undefined;

    if (this.state.currentPage === 'loginPage') {
      const loginPage = new Pages.LoginPage({
        changePage: this.changePage,
      });
      newPageElement = loginPage.getContent();

    } else if (this.state.currentPage === 'registrationPage') {
      const registrationPage = new Pages.RegistrationPage({
        changePage: this.changePage,
      });
      newPageElement = registrationPage.getContent();

    } else if (this.state.currentPage === 'chatsPage') {
      const chatsPage = new Pages.ChatsPage({
        changePage: this.changePage,
      });
      newPageElement = chatsPage.getContent();

    } else if (this.state.currentPage === 'profilePage') {
      const profilePage = new Pages.ProfilePage({
        changePage: this.changePage,
      });
      newPageElement = profilePage.getContent();

    } else if (this.state.currentPage === 'profileEditPage') {
      const profileEditPage = new Pages.ProfileEditPage({
        changePage: this.changePage,
      });
      newPageElement = profileEditPage.getContent();

    } else if (this.state.currentPage === 'profileEditPassPage') {
      const profileEditPassPage = new Pages.ProfileEditPassPage({
        changePage: this.changePage,
      });
      newPageElement = profileEditPassPage.getContent();

    } else if (this.state.currentPage === 'noServerPage') {
      const noServerPage = new Pages.NoServerPage({
        changePage: this.changePage,
      });
      newPageElement = noServerPage.getContent();

    } else if (this.state.currentPage === 'noPage') {
      const noPage = new Pages.NoPage({
        changePage: this.changePage,
      });
      newPageElement = noPage.getContent();
    }

    if (newPageElement) {
      appContainer.innerHTML = '';
      appContainer.appendChild(newPageElement);
    }
  }

  public changePage = (page: PageName): void =>  {
    if (this.state.currentPage != page) {
      this.state.currentPage = page;
      this.render();
    }
  };
}
