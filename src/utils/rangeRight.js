function range(start = 0, end, step = 1) {
    if (arguments.length === 1) {
        end = start;
        start = 0;
    }

    if (step === 0) {
        const length = Math.abs(end - start);
        return new Array(length).fill(start);
    }

    const result = [];

    const currentStep = start < end ? Math.abs(step) : -Math.abs(step);
    const condition = start < end ? (i) => i < end : (i) => i > end;

    for (let i = start; condition(i); i += currentStep) {
        result.push(i);
    }

    return result;
}

function rangeRight(start = 0, end, step = 1, isRight = false) {
    if (arguments.length === 1) {
        end = start;
        start = 0;
    }
    const res = range(start, end, step);

    return isRight ? res : res.reverse();
}