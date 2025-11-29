import { apiUrl } from '../config';

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

type MethodWrapper = <R = any>(url: string, options?: UserOptions) => Promise<R>;

const METHODS: Record<string, HTTPMethodType> = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
} as const;

type StringIndexed = Record<string, any>;

function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

function isObject(value: unknown): value is StringIndexed {
    return typeof value === 'object' && value !== null && !isArray(value);
}

function getParams(data: StringIndexed | unknown[], parentKey = ''): string[] {
    const result: string[] = [];

    for (const [key, value] of Object.entries(data)) {
        let currentKey: string;

        if (parentKey) {
            currentKey = `${parentKey}[${key}]`;
        } else {
            currentKey = key;
        }

        if (isArray(value) || isObject(value)) {
            result.push(...getParams(value, currentKey));
        } else {
            if (value !== undefined && typeof value !== 'symbol' && typeof value !== 'function') {
                result.push(`${currentKey}=${encodeURIComponent(String(value))}`);
            }
        }
    }

    return result;
}

function advancedQueryStringify(data: StringIndexed): string | never {
    if (!isObject(data)) {
        throw new Error('Данные для GET-запроса должны быть объектом');
    }

    const params = getParams(data);

    return params.length > 0 ? `?${params.join('&')}` : '';
}

export default class HTTPTransport {
    private baseUrl: string;
    public get: MethodWrapper;
    public post: MethodWrapper;
    public put: MethodWrapper;
    public delete: MethodWrapper;

    constructor(baseUrl: string = '') {
        //this.baseUrl = `https://ya-praktikum.tech/api/v2/${baseUrl}`;
        this.baseUrl = `${apiUrl}${baseUrl}`;

        this.get = this.createMethod(METHODS.GET);
        this.post = this.createMethod(METHODS.POST);
        this.put = this.createMethod(METHODS.PUT);
        this.delete = this.createMethod(METHODS.DELETE);
    }

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

    private request = <R = any>(url: string, options: RequestOptions, timeout: number = 5000): Promise<R> => {
        const { headers = {}, method, data } = options;

        return new Promise((resolve, reject) => {
            if (!method) {
                return reject(new Error('Не указан HTTP метод'));
            }

            const xhr = new XMLHttpRequest();
            const isGet = method === METHODS.GET;

            const isDataObject = isObject(data);

            const finalUrl = isGet && data && isDataObject
                ? `${url}${advancedQueryStringify(data as StringIndexed)}`
                : url;

            xhr.open(method, finalUrl);

            // Установка заголовка Content-Type для JSON-запросов
            if (data && !isGet && !(data instanceof FormData)) {
                xhr.setRequestHeader('Content-Type', 'application/json');
            }

            Object.keys(headers).forEach(key => {
                xhr.setRequestHeader(key, headers[key]);
            });

            // Важно для аутентификации: отправка куки
            xhr.withCredentials = true;

            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        if (xhr.responseText) {
                            const responseData = JSON.parse(xhr.responseText);
                            resolve(responseData as R);
                        } else {
                            resolve(undefined as R);
                        }
                    } catch (e) {
                        resolve(xhr.responseText as R);
                    }
                }else {
                    let errorData: any;
                    try {
                        errorData = JSON.parse(xhr.responseText);
                    } catch (e) {
                        errorData = { reason: `Ошибка HTTP: ${xhr.status} ${xhr.statusText || ''}` };
                    }
                    reject(errorData);

                }
            };

            xhr.onabort = () => reject(new Error('Request aborted'));
            xhr.onerror = () => reject(new Error('Network error')); // Ошибки сети

            xhr.timeout = timeout;
            xhr.ontimeout = () => reject(new Error(`Request timed out after ${timeout}ms`));

            // Отправка данных
            if (isGet || !data) {
                xhr.send();
            } else if (data instanceof FormData) {
                xhr.send(data);
            } else {
                // Для POST/PUT/DELETE с телом отправляем JSON-строку
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
