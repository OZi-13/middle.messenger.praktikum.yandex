import Route from "./route";

export default class Router {
    static __instance: Router | null = null;
    routes: Route[] = [];
    history: History;
    _currentRoute: Route | null = null;
    _rootQuery: string;

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: any) {
        // Создание нового экземпляра Route
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });

        this.routes.push(route);

        return this;
    }

    start() {
        // Слушаем событие popstate для навигации через кнопки "Назад"/"Вперед"
        window.onpopstate = (event) => {
            // Используем event.state для получения pathname, если доступно,
            // или текущий путь из window.location.pathname
            const state = event.state || {};
            this._onRoute(state.pathname || (event.currentTarget as Window).location.pathname);
        };

        // Обрабатываем текущий URL при запуске (для поддержки обновления страницы)
        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);

        // Здесь должна быть логика для 404 страницы,
        if (!route) {
            // Если роут не найден, перенаправляем на 404
            const notFoundRoute = this.getRoute('/no-page');
            if (notFoundRoute) {
                this._processRouteChange(notFoundRoute);
                return;
            }
            // Если и 404 не найдена, просто завершаем
            console.error(`Route ${pathname} not found and fallback /no-page is missing.`);
            return;
        }

        this._processRouteChange(route);
    }

    private _processRouteChange(route: Route) {
        // 1. Скрываем (и удаляем) старую страницу, вызывая leave()
        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        // 2. Устанавливаем новый активный роут и рендерим
        this._currentRoute = route;
        route.render();
    }

    go(pathname: string) {
        // **Ключевое изменение:** Добавляем объект состояния { pathname }
        this.history.pushState({ pathname }, '', pathname);
        // Запускаем обработчик маршрута
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find(route => route.match(pathname));
    }
}