export const objectIsEqual = (firstObj, lastObj) => {
    if(typeof firstObj === 'object' && typeof lastObj === 'object') {
        for(let key of Object.keys(firstObj)) {
            if (!objectIsEqual(firstObj[key], lastObj[key])) return false;
        }
        return true;
    }
    return firstObj === lastObj;
};
export const isObject = value => typeof value === 'object' && !Array.isArray(value);
export const isString = value => typeof value === 'string';

export const diffProps = (oldProps, newProps) => {
    oldProps = { ...oldProps };
    newProps = { ...newProps };
    delete oldProps.children;
    delete newProps.children;
    if(!objectIsEqual(oldProps, newProps)) {
        return newProps;
        //todo return only different props
    }
    return false;
};