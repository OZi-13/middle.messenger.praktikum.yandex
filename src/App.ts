import * as Pages from './pages';
import Router from "./framework/router";
import { ROUTER } from "./links";

export default class App {
    private readonly ROOT_QUERY = '#app';

  constructor() {
      this.initRouter();
  }

    private initRouter(): void {
        const router = new Router(this.ROOT_QUERY);

        if (!document.querySelector(this.ROOT_QUERY)) {
            console.error(`Корневой элемент ${this.ROOT_QUERY} не найден!`);
            return;
        }

        router
            .use(ROUTER.login, Pages.LoginPage)
            .use(ROUTER.registration, Pages.RegistrationPage)
            .use(ROUTER.chats, Pages.ChatsPage)
            .use(ROUTER.profile, Pages.ProfilePage)
            .use(ROUTER.profileEdit, Pages.ProfileEditPage)
            .use(ROUTER.profileEditPass, Pages.ProfileEditPassPage)
            .use(ROUTER.noPage, Pages.NoPage)
            .use(ROUTER.noServer, Pages.NoServerPage)

        router.start();
    }

    public render(): void {
        console.log('Router initialized and started.');
        // Здесь можно добавить проверку аутентификации,
        // чтобы перенаправить пользователя на /chats или /login
        // Например: if (!isAuth) router.go(ROUTER.login);
    }
}
