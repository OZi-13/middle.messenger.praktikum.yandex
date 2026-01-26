import { expect } from 'chai';
import sinon from 'sinon';
import Router from './Router.ts';
import Block from './Block.ts';

describe('Router', () => {
  let router: Router;
  let content: HTMLDivElement;
  let sandbox: sinon.SinonSandbox;

  const BlockMock = class {
    getContent = () => document.createElement('div');

    dispatchComponentDidMount = () => {};

    dispatchComponentWillUnmount = () => {};

    show = sinon.fake();

    hide = sinon.fake();
  } as unknown as typeof Block;

  beforeEach(() => {
    content = document.createElement('div');
    content.id = 'app';
    document.body.appendChild(content);

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
    // @ts-ignore
    delete global.window.store;
  });

  it('use() взвращает нам экземпляр роутера', () => {
    const result = router.use('/', BlockMock);
    expect(result).to.eq(router);
  });

  it('переходит на новую страницу, когда вызываем go()', () => {
    router.use('/', BlockMock);
    router.start();

    router.go('/');

    expect(window.location.pathname).to.eq('/');
  });

  it('и рендерит страницу при старте', () => {
    router.use('/', BlockMock).start();

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(router.getRoute('/')).to.not.be.undefined;
  });
});
