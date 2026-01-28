import { expect } from 'chai';
import Handlebars from 'handlebars';

describe('Шаблонизатор Handlebars', () => {
  it('адекватно рендерит шаблон с данными', () => {
    const templateString = '<h1>Привет, {{name}}!</h1><p>{{message}}</p>';
    const template = Handlebars.compile(templateString);

    const data = {
      name: 'Мир',
      message: 'Тестовое сообщение.',
    };

    const result = template(data);

    expect(result).to.equal('<h1>Привет, Мир!</h1><p>Тестовое сообщение.</p>');
  });

  it('рендерит шаблон с условными блоками', () => {
    // Arrange:
    const templateString = '{{#if showTitle}}<h2>{{title}}</h2>{{/if}}<p>Содержимое</p>';
    const template = Handlebars.compile(templateString);

    const result1 = template({ showTitle: true, title: 'Заголовок' });

    expect(result1).to.equal('<h2>Заголовок</h2><p>Содержимое</p>');

    const result2 = template({ showTitle: false, title: 'Заголовок' });

    expect(result2).to.equal('<p>Содержимое</p>');
  });

  it('и ещё рендерит шаблон с циклами', () => {
    const templateString = '<ul>{{#each items}}<li>{{this}}</li>{{/each}}</ul>';
    const template = Handlebars.compile(templateString);
    const data = { items: ['раз', 'два', 'три'] };

    const result = template(data);

    expect(result).to.equal('<ul><li>раз</li><li>два</li><li>три</li></ul>');
  });
});
