import { expect } from 'chai';
import Handlebars from 'handlebars';

describe('Шаблонизатор Handlebars', () => {
  it('должен корректно рендерить шаблон с данными', () => {
    // Arrange (Подготовка):
    // Определяем простой шаблон Handlebars
    const templateString = '<h1>Привет, {{name}}!</h1><p>{{message}}</p>';
    const template = Handlebars.compile(templateString);

    // Определяем данные для шаблона
    const data = {
      name: 'Мир',
      message: 'Это тестовое сообщение.'
    };

    // Act (Действие):
    // Рендерим шаблон с данными
    const result = template(data);

    // Assert (Проверка):
    // Проверяем, что результат соответствует ожидаемому HTML
    expect(result).to.equal('<h1>Привет, Мир!</h1><p>Это тестовое сообщение.</p>');
  });

  it('должен корректно рендерить шаблон с условными блоками', () => {
    // Arrange:
    const templateString = '{{#if showTitle}}<h2>{{title}}</h2>{{/if}}<p>Содержимое</p>';
    const template = Handlebars.compile(templateString);

    // Act (случай, когда showTitle = true):
    const result1 = template({ showTitle: true, title: 'Заголовок' });

    // Assert:
    expect(result1).to.equal('<h2>Заголовок</h2><p>Содержимое</p>');

    // Act (случай, когда showTitle = false):
    const result2 = template({ showTitle: false, title: 'Заголовок' });

    // Assert:
    expect(result2).to.equal('<p>Содержимое</p>');
  });

  it('должен корректно рендерить шаблон с циклами (each)', () => {
    // Arrange:
    const templateString = '<ul>{{#each items}}<li>{{this}}</li>{{/each}}</ul>';
    const template = Handlebars.compile(templateString);
    const data = { items: ['один', 'два', 'три'] };

    // Act:
    const result = template(data);

    // Assert:
    expect(result).to.equal('<ul><li>один</li><li>два</li><li>три</li></ul>');
  });
});