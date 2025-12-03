import Route from '../framework/Route';
import Block from '../framework/Block';
import { ROUTER } from '../utils/links';

export interface RouterInterface {
    go(pathname: string): void;
    back(): void;
    forward(): void;
    use(pathname: string, block: typeof Block): RouterInterface;
    start(): void
    getRoute(pathname: string): Route | undefined;
}

export default class Router {
  static __instance: Router | null = null;

  routes: Route[] = [];
  history: History;
  _currentRoute: Route | null = null;
  _rootQuery: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      const instance = Router.__instance;

      if (!instance._rootQuery && rootQuery) {
        instance._rootQuery = rootQuery;
      }

      return instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery;

    Router.__instance = this;
  }

  use(pathname: string, block: any) {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (event) => {
      const state = event.state || {};
      this._onRoute(state.pathname || (event.currentTarget as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      const notFoundRoute = this.getRoute(ROUTER.noPage);
      if (notFoundRoute) {
        this._processRouteChange(notFoundRoute);
        return;
      }
      return;
    }

    this._processRouteChange(route);
  }

  private _processRouteChange(route: Route) {
    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  go(pathname: string) {
    window.store.set({ responseError: null });
    this.history.pushState({ pathname }, '', pathname);
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
