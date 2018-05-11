export const isObject = value => typeof value === 'object' && !Array.isArray(value) && value !== null;
export const isFunction = value => !!(value && value.constructor && value.call && value.apply); // https://jsperf.com/alternative-isfunction-implementations
export const isString = value => typeof value === 'string';
export const isArray = value => Array.isArray(value);

export const objectIsEqual = (firstObj, lastObj) => {
    if(isObject(firstObj) && isObject(lastObj)) {
        for(let key of Object.keys(firstObj)) {
            if (!objectIsEqual(firstObj[key], lastObj[key])) return false;
        }
        return Object.keys(firstObj).length === Object.keys(lastObj).length;
    }
    return firstObj+'' === lastObj+''; // +'' for functinon check
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
export const applyProps = ($node, props, oldProps) => {
    while($node.attributes.length > 0) // remove old attributes, TODO not the best way to do tho
        $node.removeAttribute($node.attributes[0].name);

    for(let propName in props) { // loop through all new props
        if (propName.match(/^on([A-Z].*)/) && isFunction(props[propName])) { // chack for events (ex: onClick)
            let eventName = propName.match(/^on([A-Z].*)/)[1].toLowerCase();

            if(eventName === 'onchange') eventName = 'oninput'; // transform onChange in onInput, see https://github.com/facebook/react/issues/3964

            if(oldProps && oldProps[propName]) // remove old event if exists
                $node.removeEventListener(eventName, oldProps[propName]);
            $node.addEventListener(eventName, props[propName]); // add the new event
        } else if (propName === 'style') { // set styles
            for(let styleName in props['style']) $node.style[styleName] = props['style'][styleName];
        } else { // any props remaining (ex: id, class)
            let attributeName = propName.toLowerCase();
            let attributeValue = props[propName];

            //replace different name attributes, see https://github.com/facebook/react/blob/dcc854bcc3c940ca583565ce25200ca618c05bf0/packages/react-dom/src/shared/DOMProperty.js#L230
            if(propName.toLowerCase() === 'classname') propName = 'class'; // replace className with class
            [['acceptCharset', 'accept-charset'],
            ['className', 'class'],
            ['htmlFor', 'for'],
            ['httpEquiv', 'http-equiv']].forEach(([name, replacementValue]) => {
                if(attributeName === name.toLowerCase()) attributeName = replacementValue;
            })
            if(attributeValue !== null) { // avoid null values
                // set the prop
                $node.setAttribute(attributeName, attributeValue);
            }
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
