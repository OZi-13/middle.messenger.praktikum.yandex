type Indexed<T = unknown> = {
    [key in string]: T;
};

function isPlainObject(value: unknown): value is Indexed {
    if (typeof value !== 'object' || value === null || Array.isArray(value)) {
        return false;
    }
    const proto = Object.getPrototypeOf(value);
    return proto === null || Object.getPrototypeOf(value) === Object.prototype;
}

function isEqual(a: unknown, b: unknown): boolean {
    if (a === b) {
        return true;
    }

    const isAArray = Array.isArray(a);
    const isBArray = Array.isArray(b);

    if (isAArray || isBArray) {
        if (isAArray !== isBArray) {
            return false;
        }
    }

    const isAObject = isPlainObject(a);
    const isBObject = isPlainObject(b);

    if (isAObject || isBObject) {
        if (isAObject !== isBObject) {
            return false;
        }
    }

    if (!isAArray && !isBArray && !isAObject && !isBObject) {
        return false;
    }

    const objA = a as Indexed;
    const objB = b as Indexed;

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (const key of keysA) {
        if (!Object.prototype.hasOwnProperty.call(objB, key)) {
            return false;
        }

        const valueA = objA[key];
        const valueB = objB[key];

        if (!isEqual(valueA, valueB)) {
            return false;
        }
    }

    return true;
}

export default isEqual
