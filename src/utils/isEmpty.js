function isEmpty(value) {

    if (value === null || value === undefined) {
        return true;
    }

    if (typeof value === 'number' || typeof value === 'boolean' || value === '') {
        return true;
    }

    if (typeof value === 'object') {
        if (Array.isArray(value) && value.length === 0) {
            return true;
        }
        if (value instanceof Map || value instanceof Set) {
            return value.size === 0;
        }
        if (Object.keys(value).length === 0) {
            return true;
        }
    }

    return false;
}