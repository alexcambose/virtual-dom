export const isObject = value => typeof value === 'object' && !Array.isArray(value);
export const isFunction = value => !!(value && value.constructor && value.call && value.apply); // https://jsperf.com/alternative-isfunction-implementations
export const isString = value => typeof value === 'string';
export const isArray = value => Array.isArray(value);

export const objectIsEqual = (firstObj, lastObj) => {
    if(typeof firstObj === 'object' && typeof lastObj === 'object') {
        for(let key of Object.keys(firstObj)) {
            if (!objectIsEqual(firstObj[key], lastObj[key])) return false;
        }
        return true;
    }
    return firstObj === lastObj;
};

export const flatternArray = array => {
    if(!array) return [];
    const items = [];
    for(let item of array)
        if(Array.isArray(item))
            items.push(...flatternArray(item));
        else
            items.push(item);
    return items;
};

export const objectIsEmpty = value => !Object.keys(value).length;


/* DOM HELPERS */

export const createTextNode = data => document.createTextNode(data);
export const createNodeFromObject = data => {
    const $node = document.createElement(data.type);
    const props = { ...data.props }; delete props.children;
    const { children } = data.props;
    applyProps($node, props);
    if(children)
        for(let child of children)
            appendNode($node, createNode(child));
    return $node;
};
export const applyProps = ($node, props) => {
    while($node.attributes.length > 0) // remove old attributes, TODO not the best way to do tho
        $node.removeAttribute($node.attributes[0].name);
    for(let propName in props) {
        if(propName.toLowerCase() === 'classname') {
            $node.setAttribute('class', props[propName]);
        } else if (propName.match(/^on([A-Z].*)/) && isFunction(props[propName])) {
            $node.addEventListener(propName.match(/^on([A-Z].*)/)[1].toLowerCase(), e => props[propName](e));
        } else if (propName === 'style') {
            for(let styleName in props['style']) $node.style[styleName] = props['style'][styleName];
        } else {
            $node.setAttribute(propName, props[propName]);
        }

    }
};
export const createNode = data => {
    // if data is a simple string
    if(isString(data)) return createTextNode(data);

    // if data is an array, return an array of nodes
    else if(isArray(data)) return data.map(node => createNode(node));

    // if data is an object(ex: {type: 'div', props:{className: 'someClass', children: []}}
    else if(isObject(data)) return createNodeFromObject(data);
};
export const appendNode = ($root, $nodes) => {
    // $nodes may be a single node or an array of nodes
    if(isArray($nodes))
        for(let $node of $nodes)
            $root.appendChild($node);
    else $root.appendChild($nodes);
};
