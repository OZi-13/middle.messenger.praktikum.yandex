import EventBus, { EventCallback } from './EventBus';
import Handlebars from 'handlebars';

type Nullable<T> = T | null;
export interface BlockProps {
    [key: string]: unknown;
    events?: Record<string, (e: Event) => void>;
    attr?: Record<string, string | number | boolean>;
}

export default class Block {
    static EVENTS = {
        INIT: "init",
        FLOW_CDM: "flow:component-did-mount",
        FLOW_CDU: "flow:component-did-update",
        FLOW_RENDER: "flow:render"
    };

    protected _element: Nullable<HTMLElement> = null;
    protected props: BlockProps;
    protected children: Record<string, Block>;
    protected lists: Record<string, unknown[]>;
    protected eventBus: () => EventBus;

    protected _id: number = Math.floor(100000 + Math.random() * 900000);

    constructor(propsWithChildren: BlockProps = {}) {
        const eventBus = new EventBus();
        const { props, children, lists } = this._getChildrenPropsAndProps(propsWithChildren);

        this.props = this._makePropsProxy({ ...props });
        this.children = children;
        this.lists = this._makePropsProxy({ ...lists }) as Record<string, unknown[]>;

        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _addEvents(): void {
        const { events = {} } = this.props as BlockProps & { events: Record<string, (e: Event) => void> };

        Object.keys(events).forEach(eventName => {
            if (this._element) {
                this._element.addEventListener(eventName, events[eventName] as (e: Event) => void);
            }
        });
    }

    private _registerEvents(eventBus: EventBus): void {
        eventBus.on(Block.EVENTS.INIT, this.init.bind(this) as EventCallback);
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this) as EventCallback);
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as EventCallback);
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this) as EventCallback);
    }

    protected init(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    private _componentDidMount(): void {
        this.componentDidMount();
        Object.values(this.children).forEach(child => {child.dispatchComponentDidMount();});
        const universalChildren = this.lists['__children__'];
        if (Array.isArray(universalChildren)) {
            universalChildren.filter(item => item instanceof Block).forEach(child => {
                (child as Block).dispatchComponentDidMount();
            });
        }
    }

    protected componentDidMount(): void {}

    public dispatchComponentDidMount(): void {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

    private _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected componentDidUpdate(_oldProps: BlockProps, _newProps: BlockProps): boolean {
        return true;
    }

    // Тут добавляем универсальный слот 'children' в lists
    private _getChildrenPropsAndProps(propsAndChildren: BlockProps): {
        children: Record<string, Block>,
        props: BlockProps,
        lists: Record<string, unknown[]>
    } {
        const children: Record<string, Block> = {}; // Именованные блоки
        const props: BlockProps = {}; // Обычные пропсы
        const lists: Record<string, unknown[]> = {}; // Списки (для коллекций)

        // Тут универсальный слот 'children'
        if (Array.isArray(propsAndChildren.children)) {
            const universalChildren = propsAndChildren.children.filter(item => item instanceof Block) as Block[];
            if (universalChildren.length > 0) {
                // тут добавляем в lists ключ, для использования в шаблоне как {{{ children }}}
                lists['__children__'] = universalChildren;
            }
            delete propsAndChildren.children;
        }

        Object.entries(propsAndChildren).forEach(([key, value]) => {
            if (value instanceof Block) {
                children[key] = value; // Именованные дочерние блоки
            } else if (Array.isArray(value)) {
                lists[key] = value as unknown[]; // Именованные списки
            } else {
                props[key] = value; // Обычные пропсы
            }
        });

        return { children, props, lists };
    }

    protected addAttributes(): void {
        const { attr = {} } = this.props;

        Object.entries(attr).forEach(([key, value]) => {
            if (this._element) {
                this._element.setAttribute(key, value as string);
            }
        });
    }

    protected setAttributes(attr: Record<string, string | number | boolean>): void {
        Object.entries(attr).forEach(([key, value]) => {
            if (this._element) {
                this._element.setAttribute(key, String(value));
            }
        });
    }

    public setProps = (nextProps: BlockProps): void => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    public setLists = (nextList: Record<string, unknown[]>): void => {
        if (!nextList) {
            return;
        }

        Object.assign(this.lists, nextList);
        this.eventBus().emit(Block.EVENTS.FLOW_CDU, this.lists, nextList);
    };

    get element(): HTMLElement | null {
        return this._element;
    }

    private _render(): void {
        //console.log('Render');
        const propsAndStubs = { ...this.props };
        const tmpId =  Math.floor(100000 + Math.random() * 900000);

        Object.entries(this.children).forEach(([key, child]) => {
            propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
        });

        Object.entries(this.lists).forEach(([key, _]) => {
            if (key === '__children__') {
                propsAndStubs['children'] = `<div data-id="__l_${tmpId}_c"></div>`;
            } else {
                propsAndStubs[key] = `<div data-id="__l_${tmpId}_${key}"></div>`;
            }
        });

        const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
        fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

        // 3. Замена заглушек именованных children
        Object.values(this.children).forEach(child => {
            const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
            if (stub) {
                stub.replaceWith(child.getContent());
            }
        });

        Object.entries(this.lists).forEach(([key, child]) => {
            const listCont = this._createDocumentElement('template')as HTMLTemplateElement;
            child.forEach(item => {
                if (item instanceof Block) {
                    listCont.content.append(item.getContent());
                } else {
                    listCont.content.append(`${item}`);
                }
            });

            let stub: Nullable<Element> = null;
            if (key === '__children__') {
                stub = fragment.content.querySelector(`[data-id="__l_${tmpId}_c"]`);
            } else {
                stub = fragment.content.querySelector(`[data-id="__l_${tmpId}_${key}"]`);
            }

            if (stub) {
                stub.replaceWith(listCont.content);
            }
        });

        const newElement = fragment.content.firstElementChild as HTMLElement;
        if (this._element && newElement) {
            this._element.replaceWith(newElement);
        }
        this._element = newElement;
        this._addEvents();
        this.addAttributes();
    }

    protected render(): string {
        return '';
    }

    public getContent(): HTMLElement {
        if (!this._element) {
            throw new Error('Element is not created');
        }
        return this._element;
    }

    private _makePropsProxy(props: BlockProps): BlockProps {
        const self = this;

        return new Proxy(props, {
            get(target: BlockProps, prop: string): unknown {
                const value = target[prop];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set(target: BlockProps, prop: string, value: unknown): boolean {
                const oldTarget = { ...target };
                target[prop] = value;
                self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty(_target: BlockProps, _prop: string): boolean {
                throw new Error('Не разрешено');
            },
        } as ProxyHandler<BlockProps>);
    }

    protected _createDocumentElement(tagName: string): HTMLElement {
        return document.createElement(tagName);
    }

    public show(): void {
        const content = this.getContent();
        if (content) {
            content.style.display = 'block';
        }
    }

    public hide(): void {
        const content = this.getContent();
        if (content) {
            content.style.display = 'none';
        }
    }
}