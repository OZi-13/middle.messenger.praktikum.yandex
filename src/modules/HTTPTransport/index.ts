type HTTPMethodType = 'GET' | 'POST' | 'PUT' | 'DELETE';
type DataPayload = Record<string, unknown> | FormData | string | null;

type RequestOptions = {
  method: HTTPMethodType;
  data?: DataPayload;
  headers?: Record<string, string>;
};

type UserOptions = {
  headers?: Record<string, string>;
  data?: DataPayload;
  timeout?: number;
};

type MethodWrapper = <R = XMLHttpRequest>(url: string, options?: UserOptions) => Promise<R>;

const METHODS: Record<string, HTTPMethodType> = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const;

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
  if (!isPlainObject(data)) {
    throw new Error('Данные должны быть простым объектом');
  }

  const params = new URLSearchParams(data as Record<string, string>).toString();

  return params ? `?${params}` : '';
}

export default class HTTPTransport {
  private baseUrl: string;

  public get: MethodWrapper;

  public post: MethodWrapper;

  public put: MethodWrapper;

  public delete: MethodWrapper;

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl;

    this.get = this.createMethod(METHODS.GET);
    this.post = this.createMethod(METHODS.POST);
    this.put = this.createMethod(METHODS.PUT);
    this.delete = this.createMethod(METHODS.DELETE);
  }

  // --- Фабричный метод ---

  private createMethod(method: HTTPMethodType): MethodWrapper {
    return (url, options = {}) => {
      const { timeout, ...restOptions } = options;

      return this.request(
        this.baseUrl + url,
        { ...restOptions, method },
        timeout,
      );
    };
  }

  // --- Основной метод запроса (с дженериком) ---

  private request = <R = XMLHttpRequest>(url: string, options: RequestOptions, timeout: number = 5000): Promise<R> => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        return reject(new Error('Не указан HTTP метод'));
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
        resolve(xhr as unknown as R);
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
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
