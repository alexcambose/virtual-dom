import { PATCH_INSERT_NODE, PATCH_REPLACE_NODE, PATCH_REMOVE_NODE, PATCH_TEXT_NODE, PATCH_PROPS_NODE } from './constants';
import { isObject, isString, objectIsEqual, flatternArray, objectIsEmpty } from './utils';
const diffProps = (oldProps, newProps) => {
    oldProps = { ...oldProps };
    newProps = { ...newProps };
    delete oldProps.children;
    delete newProps.children;
    return !objectIsEqual(oldProps, newProps) && newProps;
};

const diff = (oldVDOM, newVDOM, index = 0) => {
    let selfPatch = {}; //initialize patches
    let childrenPatches = {};
    if (!newVDOM && oldVDOM) {
        selfPatch = {type: PATCH_REMOVE_NODE, payload: oldVDOM};
    } else if (newVDOM && !oldVDOM) {
        selfPatch = {type: PATCH_INSERT_NODE, payload: newVDOM};
    } else if((isString(oldVDOM) && isObject(newVDOM)) || // check types between new and old VDOM and replace if different
        isObject(oldVDOM) && isString(newVDOM) ||
        oldVDOM.type !== newVDOM.type) {
        selfPatch = {type: PATCH_REPLACE_NODE, payload: newVDOM};
    } else if(newVDOM !== oldVDOM && isString(newVDOM) && isString(oldVDOM)) { //check for text differences
        selfPatch = {type: PATCH_TEXT_NODE, payload: newVDOM};
    } else if(isObject(newVDOM) && isObject(oldVDOM)) { // if both are nodes object we need to check for props and go deeper
        // check if props are different
        if(diffProps(oldVDOM.props, newVDOM.props)) {
            const props = newVDOM.props; // new props
            const oldProps = oldVDOM.props; // old props
            delete props.children;
            delete oldProps.children;
            selfPatch = { type: PATCH_PROPS_NODE, payload: { props, oldProps } };
        }
        const oldVDOMChildren = flatternArray(oldVDOM.props.children);
        const newVDOMChildren = flatternArray(newVDOM.props.children);
        //get the longest child element
        let childrenLength = Math.max(oldVDOMChildren.length, newVDOMChildren.length);
        for (let i = 0; i < childrenLength; i++){
            childrenPatches = { ...childrenPatches, ...diff(oldVDOMChildren[i], newVDOMChildren[i], i) };
        }
    } else {
        // oldVDOM === newVDOM
    }
    let patches = {};
    if(!objectIsEmpty(selfPatch)) patches['selfPatch'] = selfPatch;
    if(!objectIsEmpty(childrenPatches)) patches['childrenPatches'] = childrenPatches;
    return !objectIsEmpty(patches) && { [index] : patches };
};

export default diff;
