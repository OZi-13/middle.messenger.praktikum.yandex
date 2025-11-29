import { rootElement } from './config';
import * as Pages from './pages';
import { Store, StoreEvents } from './framework/Store';
import Router from './framework/router';
import { ROUTER } from './utils/links';
import AuthService from './services/authService';

declare global {
    interface Window {
        store: Store;
        router: Router;
    }
}

export default class App {
    private readonly ROOT_ELEMENT: string = rootElement;

    constructor() {
    }

    private initStore(): Store {
        const store = Store.getInstance();
        window.store = store;
        console.log('Store готов.');

        window.store.on(StoreEvents.Updated, (prevState, nextState) => {
            console.groupCollapsed('Store Updated');
            console.log('Prev State:', prevState);
            console.log('Next State:', nextState);
            console.groupEnd();
        });
        return store;
    }

    private async initRouter(): Promise<Router> {
        const router = new Router(this.ROOT_ELEMENT);

        if (!document.querySelector(this.ROOT_ELEMENT)) {
            console.error(`Элемент ${this.ROOT_ELEMENT} не найден!`);
            throw new Error(`Элемент ${this.ROOT_ELEMENT} не найден!`);
        }
        window.router = router;

        router
            .use(ROUTER.login, Pages.LoginPage)
            .use(ROUTER.registration, Pages.RegistrationPage)
            .use(ROUTER.chats, Pages.ChatsPage)
            .use(ROUTER.profile, Pages.ProfilePage)
            .use(ROUTER.profileEdit, Pages.ProfileEditPage)
            .use(ROUTER.profileEditPass, Pages.ProfileEditPassPage)
            .use(ROUTER.noPage, Pages.NoPage)
            .use(ROUTER.noServer, Pages.NoServerPage)

        return router;
    }

    public async render(): Promise<void> {
        const store = this.initStore();
        const router = await this.initRouter();

        const authService = new AuthService({store, router});
        await authService.checkLoginUser();

        router.start();
        console.log('Приложение запущено.');
    }
}
