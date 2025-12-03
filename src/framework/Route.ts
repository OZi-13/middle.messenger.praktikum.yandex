import Block, { BlockProps } from './Block';

export default class Route {
  _pathname: string;

  _blockClass: typeof Block;

  _block: Block | null = null;

  _props: BlockProps & { rootQuery: string };

  constructor(pathname: string, view: typeof Block, props: BlockProps & { rootQuery: string }) {
    this._pathname = pathname;
    this._blockClass = view;
    this._props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      const rootElement = document.querySelector(this._props.rootQuery);
      const blockElement = this._block.getContent();

      if (rootElement && blockElement && rootElement.contains(blockElement)) {
        rootElement.removeChild(blockElement);
      }

      this._block = null;
    }
  }

  match(pathname: string) {
    return pathname === this._pathname;
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass(this._props);

      const root = document.querySelector(this._props.rootQuery);
      if (!root) {
        console.error(`Root element with query ${this._props.rootQuery} not found.`);
        return;
      }

      root.appendChild(this._block.getContent());
      this._block.dispatchComponentDidMount();

      return;
    }

    this._block.show();
  }
}
