import { expect } from 'chai';
import sinon from 'sinon';
import Router from './Router.ts';
import Block from './Block.ts';

describe('Router', () => {
  let router: Router;
  let content: HTMLDivElement;
  let sandbox: sinon.SinonSandbox;

  // Мок для Block
  const BlockMock = class {
    getContent = () => document.createElement('div');
    dispatchComponentDidMount = () => {};
    dispatchComponentWillUnmount = () => {};
    show = sinon.fake();
    hide = sinon.fake();
  } as unknown as typeof Block;

  beforeEach(() => {
    // Создаем контейнер для роутера
    content = document.createElement('div');
    content.id = 'app';
    document.body.appendChild(content);

    // Мокаем window.store
    // @ts-ignore
    global.window.store = {
      set: sinon.fake(),
      get: sinon.fake(),
      on: sinon.fake(),
      off: sinon.fake(),
      dispatch: sinon.fake(),
      getState: sinon.fake(),
    };

    router = new Router('#app');
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
    document.body.removeChild(content);
    // Очищаем мок window.store
    // @ts-ignore
    delete global.window.store;
  });

  it('use() должен возвращать экземпляр роутера', () => {
    const result = router.use('/', BlockMock);
    expect(result).to.eq(router);
  });

  it('должен переходить на новую страницу при вызове go()', () => {
    router.use('/', BlockMock);
    router.start();

    router.go('/');

    expect(window.location.pathname).to.eq('/');
  });

  it('должен рендерить страницу при старте', () => {
    router.use('/', BlockMock).start();

    expect(router.getRoute('/')).to.not.be.undefined;
  });
});
