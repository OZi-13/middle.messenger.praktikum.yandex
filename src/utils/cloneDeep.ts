import isPlainObject, { PlainObject } from "./isPlainObject";

function isArray(value: unknown): value is unknown[] {
    return Array.isArray(value);
}

/**
 * @param {T} obj Исходный объект или массив.
 * @returns {T} Глубокая копия.
 */
function cloneDeep<T extends object = object>(obj: T): T {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    let copy: unknown;

    if (isArray(obj)) {
        copy = [] as unknown[];

        for (let i = 0; i < (obj as unknown[]).length; i++) {
            (copy as unknown[])[i] = cloneDeep((obj as unknown[])[i] as any);
        }

        return copy as T;

    } else if (isPlainObject(obj)) {
        copy = {} as PlainObject;

        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const value = obj[key];

                (copy as PlainObject)[key] = cloneDeep(value as any);
            }
        }
        return copy as T;
    }
    return obj;
}

export default cloneDeep;
