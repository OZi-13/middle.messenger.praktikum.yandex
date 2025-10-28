type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type DataPayload = Record<string, unknown> | FormData | string | null;

type Options = {
  method?: HTTPMethod;
  headers?: Record<string, string>;
  data?: DataPayload;
  timeout?: number;
};
type RequestOptions = {
  method: HTTPMethod;
  data?: DataPayload;
  headers?: Record<string, string>;
};

const METHODS: Record<string, HTTPMethod> = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

function isPlainObject(data: unknown): data is Record<string, unknown> {
  if (data === null || typeof data !== 'object') {
    return false;
  }
  if (data instanceof FormData) {
    return false;
  }
  return Object.getPrototypeOf(data) === Object.prototype;
}

function queryStringify(data: Record<string, unknown>): string {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Данные должны быть объектом');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${String(data[key])}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}

export default class HTTPTransport {
  private baseUrl: string;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;
  }

  // --- Методы-обёртки ---

  get = (url: string, options: Options = {}) => {
    const { timeout, ...restOptions } = options;
    return this.request(this.baseUrl + url, { ...restOptions, method: METHODS.GET }, timeout);
  };

  post = (url: string, options: Options = {}) => {
    const { timeout, ...restOptions } = options;
    return this.request(this.baseUrl + url, { ...restOptions, method: METHODS.POST }, timeout);
  };

  put = (url: string, options: Options = {}) => {
    const { timeout, ...restOptions } = options;
    return this.request(this.baseUrl + url, { ...restOptions, method: METHODS.PUT }, timeout);
  };

  delete = (url: string, options: Options = {}) => {
    const { timeout, ...restOptions } = options;
    return this.request(this.baseUrl + url, { ...restOptions, method: METHODS.DELETE }, timeout);
  };

  // --- Основной метод запроса ---

  private request = (url: string, options: RequestOptions, timeout: number = 5000): Promise<XMLHttpRequest> => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        return reject(new Error('No HTTP method specified'));
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      const isObject = isPlainObject(data);

      const finalUrl = isGet && data && isObject
        ? `${url}${queryStringify(data)}`
        : url;

      xhr.open(method, finalUrl);

      if (data && !isGet && !(data instanceof FormData)) {
        xhr.setRequestHeader('Content-Type', 'application/json');
      }
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = () => reject(new Error('Request aborted'));
      xhr.onerror = () => reject(new Error('Network error'));

      xhr.timeout = timeout;
      xhr.ontimeout = () => reject(new Error(`Request timed out after ${timeout}ms`));

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        // Для POST/PUT/DELETE отправляем JSON-строку
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
