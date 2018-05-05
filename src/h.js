import { isObject, isFunction } from "./utils";

const h = (type, props, ...children) => {
    const element = {
        type,
        props: {...props, children},
    };
    if(isObject(type)) {
        return h(type.type, type.props, ...type.props.children);
    } else if (isFunction(type)) {
        return type({ ...element.props });
    }
    return element;
}
export default h;
