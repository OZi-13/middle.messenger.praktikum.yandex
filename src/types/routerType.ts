import Block from '../framework/Block';
import Route from '../framework/Route';

export interface RouterInterface {
  router: { go: (path: string) => void };
}

export interface RouterFullInterface {
  go(pathname: string): void;
  back(): void;
  forward(): void;
  use(pathname: string, block: typeof Block): RouterInterface;
  start(): void
  getRoute(pathname: string): Route | undefined;
}
