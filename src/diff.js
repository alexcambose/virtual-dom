import { PATCH_INSERT_NODE, PATCH_REPLACE_NODE, PATCH_REMOVE_NODE, PATCH_TEXT_NODE, PATCH_PROPS_NODE } from './constants';
import { isObject, isString, objectIsEqual } from './utils';
const diffProps = (oldProps, newProps) => {
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


const diff = (oldVDOM, newVDOM, index = 0) => {
    let patches = {}; //initialize patches

    // check types between new and old VDOM and replace if different
    if((isString(oldVDOM) && isObject(newVDOM)) ||
        isObject(oldVDOM) && isString(newVDOM)){
        patches[index] = {type: PATCH_REPLACE_NODE, payload: newVDOM};
    }else if (!newVDOM && oldVDOM) {
        patches[index] = {type: PATCH_REMOVE_NODE, payload: oldVDOM};
    }else if (newVDOM && !oldVDOM) {
        patches[index] = {type: PATCH_INSERT_NODE, payload: newVDOM};
    } else  if(newVDOM !== oldVDOM && isString(newVDOM) && isString(oldVDOM)) { //check for text differences        // if there is an already existent text node, replace it
        patches[index] = {type: PATCH_TEXT_NODE, payload: newVDOM};
    } else if(isObject(newVDOM) && isObject(oldVDOM)) { // if both are nodes object we need to check for props and go deeper

        // check if props are different
        const newProps = diffProps(oldVDOM.props, newVDOM.props);
        if(newProps) {
            patches[index] = { type: PATCH_PROPS_NODE, payload: newProps };
        }
        if(newVDOM.props && newVDOM.props.children) {
            //get the longest child element
            let childrenLength = newVDOM.props.children.length;
            if(oldVDOM.props.children.length > childrenLength) childrenLength = oldVDOM.props.children.length;

            for (let i = 0; i < childrenLength; i++){
                patches['patches'] = { ...patches['patches'], ...diff(oldVDOM.props.children[i], newVDOM.props.children[i], i) };
            }
        }
    } else {
        // oldVDOM === newVDOM
    }
    return patches;
};

export default diff;