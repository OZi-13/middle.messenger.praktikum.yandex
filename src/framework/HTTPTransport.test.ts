import { expect } from 'chai';
import HTTPTransport from './HTTPTransport.ts';

describe('HTTPTransport', () => {
  let instance: HTTPTransport;
  let requests: any[] = [];

  beforeEach(() => {
    requests = [];

    class MockXMLHttpRequest {
      method: string;

      url: string;

      status: number;

      response: string;

      onload: () => void;

      onerror: () => void;

      withCredentials = false;

      responseType = '';

      constructor() {
        this.method = '';
        this.url = '';
        this.status = 200;
        this.response = '{}';
        this.onload = () => {};
        this.onerror = () => {};
      }

      open(method: string, url: string) {
        this.method = method;
        this.url = url;
        requests.push(this);
      }

      send() {
        this.onload();
      }

      setRequestHeader() {}
    }

    // @ts-expect-error Mocking global XMLHttpRequest
    global.XMLHttpRequest = MockXMLHttpRequest;

    instance = new HTTPTransport('/auth');
  });

  afterEach(() => {
  });

  it('отправляет GET запрос', async () => {
    await instance.get('/user');

    const [request] = requests;

    expect(request.method).to.eq('GET');
  });
});
