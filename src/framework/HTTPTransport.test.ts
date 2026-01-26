import { expect } from 'chai';
import HTTPTransport from './HTTPTransport.ts';

describe('HTTPTransport', () => {
  let instance: HTTPTransport;
  let requests: any[] = [];

  beforeEach(() => {
    requests = [];

    // Создаем простой мок для XMLHttpRequest
    class MockXMLHttpRequest {
      open(method: string, url: string) {
        requests.push({ method, url });
      }
      send() {}
      setRequestHeader() {}
      withCredentials = false;
      responseType = '';
      onload = () => {};
      onerror = () => {};
      status = 200;
      response = '{}';
    }

    // @ts-ignore
    global.XMLHttpRequest = MockXMLHttpRequest;

    instance = new HTTPTransport('/auth');
  });

  afterEach(() => {
    // Восстанавливаем оригинальный XMLHttpRequest (если он был)
    // Но в JSDom окружении мы можем просто оставить его или вернуть JSDom'овский
    // (global as any).XMLHttpRequest = jsdom.window.XMLHttpRequest; // Если бы у нас был доступ к jsdom здесь
  });

  it('должен отправлять GET запрос', () => {
    instance.get('/user');

    const [request] = requests;

    expect(request.method).to.eq('GET');
  });
});
