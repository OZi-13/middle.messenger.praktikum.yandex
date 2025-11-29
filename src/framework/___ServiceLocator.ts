import AuthServiceClass from '../services/authService';
import UserServiceClass from '../services/userService';
import ChatServiceClass from '../services/chatService';

// Типы для глобальных зависимостей
type GlobalStore = typeof window.store;
type GlobalRouter = typeof window.router;

// 🔑 Интерфейс для хранения инициализированных сервисов
interface ServiceContainer {
    AuthService: AuthServiceClass;
    UserService: UserServiceClass;
    ChatService: ChatServiceClass;
}

export type AuthServiceType = AuthServiceClass;
export type UserServiceType = UserServiceClass;

class ServiceLocator {
    private static instance: ServiceLocator;
    private services: Partial<ServiceContainer> = {};
    private isInitialized = false;

    private constructor() {}

    public static getInstance(): ServiceLocator {
        if (!ServiceLocator.instance) {
            ServiceLocator.instance = new ServiceLocator();
        }
        return ServiceLocator.instance;
    }

    public init(store: GlobalStore, router: GlobalRouter): void {
        if (this.isInitialized) {
            console.log('ServiceLocator уже используется.');
            return;
        }

        // 1. Инициализация всех сервисов с готовыми зависимостями
        this.services.AuthService = new AuthServiceClass({ store, router });
        this.services.UserService = new UserServiceClass({ store, router });

        this.isInitialized = true;
        console.log("Контейнер сервисов готов.");
    }

    // 🔑 МЕТОД ДЛЯ ПОЛУЧЕНИЯ ЭКЗЕМПЛЯРА СЕРВИСА
    public get<K extends keyof ServiceContainer>(name: K): ServiceContainer[K] {
        if (!this.isInitialized) {
            throw new Error(`ServiceLocator не инициализирован. Вызовите init() в App.ts.`);
        }
        const service = this.services[name];
        if (!service) {
            throw new Error(`Сервис ${name} не найден.`);
        }
        // Утверждаем, что тип сервиса корректен
        return service as ServiceContainer[K];
    }
}

export const services = ServiceLocator.getInstance();