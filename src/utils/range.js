function range(start = 0, end, step = 1) {
    let result = [];

    if (arguments.length === 1) {
        end = start;
        start = 0;
    }

    let step2 = Math.abs(step)
    let count_tmp = 0

    if (start < end) { //Если идем вверх
        count_tmp = end - start
    } else { // Если идём вниз
        count_tmp = end + start
        step = -step2
    }

    count_tmp = Math.abs(count_tmp)
    let acount = step === 0 ? count_tmp : count_tmp / step2

    const array = new Array(acount)
    array.fill(start)
    const data = { step: step }

    result = array.map(function (item, i) {
        return i === 0 ? item : step * i + item
    }, data)

    return result;
}