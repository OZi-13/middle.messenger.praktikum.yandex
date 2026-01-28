import { expect } from 'chai';
import sinon from 'sinon';
import Block from './Block.ts';

describe('Block', () => {
  let BlockClass: typeof Block;

  before(() => {
    class MockBlock extends Block {
      render(): string {
        return '<div>{{text}}</div>';
      }
    }
    BlockClass = MockBlock;
  });

  it('соззаёт компонент с пропсами', () => {
    const text = 'Hello';
    const component = new BlockClass({ text });

    expect((component as any).props.text).to.eq(text);
  });

  it('реактивный', () => {
    const text = 'Hello';
    const component = new BlockClass({ text });

    component.setProps({ text: 'World' });

    expect((component as any).props.text).to.eq('World');
  });

  it('и устанавливает события', () => {
    const handler = sinon.fake();
    const component = new BlockClass({
      events: {
        click: handler,
      },
    });

    const event = new MouseEvent('click');
    component.getContent().dispatchEvent(event);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(handler.called).to.be.true;
  });
});
