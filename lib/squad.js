'use strict';

module.exports = (...funcs) => {
    check('function', funcs);
    
    return (...args) => {
        return funcs
            .reduceRight(apply, args)
            .pop();
    };
}

function apply(value, fn) {
    return [fn(...value)];
}

function check(type, array) {
    const wrongType = partial(wrong, type);
    const notType = partial(notEqual, type);
    
    if (!array.length)
        return wrongType(type);
    
    array
        .map(getType)
        .filter(notType)
        .forEach(wrongType);
}

function partial(fn, value) {
    return fn.bind(null, value);
}

function getType(item) {
    return typeof item;
}

function notEqual(a, b) {
    return a !== b;
}

function wrong(type) {
    throw Error('fn should be ' + type + '!');
}

