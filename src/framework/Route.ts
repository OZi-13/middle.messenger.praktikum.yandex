import Block, { BlockProps } from "./block";
import isEqual from "../utils/isEqual";

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

    navigate(pathname) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            // 1. Получаем корневой элемент
            const rootElement = document.querySelector(this._props.rootQuery);
            // 2. Получаем сам элемент блока
            const blockElement = this._block.getContent();

            // 3. Проверяем наличие и удаляем из DOM
            if (rootElement && blockElement && rootElement.contains(blockElement)) {
                rootElement.removeChild(blockElement);
            }

            // 4. Очищаем ссылку на блок, чтобы при следующем render() он был создан заново
            this._block = null;
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {
        if (!this._block) {
            // 1. Создаем новый экземпляр класса Block
            this._block = new this._blockClass(this._props);

            // 2. Логика, заменяющая функцию render(rootQuery, block):
            const root = document.querySelector(this._props.rootQuery);
            if (!root) {
                console.error(`Root element with query ${this._props.rootQuery} not found.`);
                return;
            }

            // Добавляем содержимое блока в DOM
            root.appendChild(this._block.getContent());

            // 3. Запускаем жизненный цикл компонента (componentDidMount)
            this._block.dispatchComponentDidMount();

            return;
        }

        // Если блок уже существует (например, после history.back), просто показываем его
        this._block.show();
    }
}