const objectIsEqual = (firstObj, lastObj) => {
    if(typeof firstObj === 'object' && typeof lastObj === 'object') {
        for(let key of Object.keys(firstObj)) {
            if (!objectIsEqual(firstObj[key], lastObj[key])) return false;
        }
        return true;
    }
    return firstObj === lastObj;
};
module.exports.objectIsEqual = objectIsEqual;
module.exports.isObject = value => typeof value === 'object';
module.exports.isString = value => typeof value === 'string';

