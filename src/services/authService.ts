import AuthApi from '../api/authApi';
import { ROUTER } from '../utils/links';
import * as AuthType from '../types/authType';
import * as ApiType from '../types/apiType';

interface AuthServiceDependencies {
    store: typeof window.store;
    router: typeof window.router;
}

export default class AuthService {
    private readonly api: AuthApi;
    private readonly store: typeof window.store;
    private readonly router: typeof window.router;

    constructor({ store, router }: AuthServiceDependencies) {
        this.api = new AuthApi();
        this.store = store;
        this.router = router;
    }

    public async registration(data: AuthType.RegistrationType): Promise<void> {
        this.store.set({
            responseError: null,
        });

        try {
            await this.api.create(data);
            console.log('Регистрация успешна.');
            await this.checkLoginUser();
            this.router.go(ROUTER.chats);

        } catch (error) {
            const reason = (error).reason as ApiType.ResponseError;
            this.store.set({ responseError: reason });
        }
    }

    public async login(data: AuthType.LoginType): Promise<void> {
        this.store.set({
            responseError: null,
        });

        try {
            await this.api.login(data);
            console.log('Авторизация успешна.');
            await this.checkLoginUser();
            this.router.go(ROUTER.chats);
        } catch (error) {
            const reason = (error).reason as ApiType.ResponseError;
            this.store.set({ responseError: reason });
        }
    }

    public async checkLoginUser(): Promise<void> {
        try {
            const user: ApiType.UserDTO = await this.api.user();
            this.store.set({ user });

        } catch (error) {
            this.store.set({ user: null });
            console.warn('Пользователь не авторизован или ошибка сессии.');
        }
    }

    public async logout(): Promise<void> {

        try {
            await this.api.logout();
            this.store.set({ user: null });
            console.log('Выход успешен.');
            this.router.go(ROUTER.login);

        } catch (error) {
            console.log('Ошибка выхода:', error);
        }
    }
}
