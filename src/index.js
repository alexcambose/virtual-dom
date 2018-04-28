const { isObject, isString, objectIsEqual } = require('./utils');
const { PATCH_INSERT_NODE, PATCH_REPLACE_NODE, PATCH_REMOVE_NODE, PATCH_TEXT_NODE, PATCH_PROPS_NODE } = require('./constants');
const A = {
    type:"div",
    props:{
        className:"text",
        children:["hello", 'a', 'v']
    }
};
const B = {
    type:"div",
    props:{
        className:"texat",
        children:["helloc", "asdads"]
    }
};
const applyPatches = ($root, ) => {

};
const diff = (oldVDOM, newVDOM, index = 0) => {
    //initialize patches
    let patches = {};
    if(isObject(newVDOM) && isObject(oldVDOM)) {
        // check if props are different
        const newProps = diffProps(oldVDOM.props, newVDOM.props);
        if(newProps) {
            if(patches[index]) console.log('WTFFFF', patches[index]);
            patches[index] = { type: PATCH_PROPS_NODE, payload: newProps };
        }
        //get the longest child element
        let childrenLength = newVDOM.props.children.length;
        if(oldVDOM.props.children.length > childrenLength) childrenLength = oldVDOM.props.children.length;

        for (let i = 0; i < childrenLength; i++){
            // console.log(i);
            patches = { ...patches, ...diff(oldVDOM.props.children[i], newVDOM.props.children[i], ++index) };
        }
    } else if(newVDOM !== oldVDOM) { //check for text differences
        // if there is a new text node, insert it
        if (!oldVDOM && isString(newVDOM)) patches[index] = {type: PATCH_INSERT_NODE, payload: newVDOM};
        // if the new dom does not contain the node, remove it
        else if (!newVDOM && isString(oldVDOM)) patches[index] = {type: PATCH_REMOVE_NODE, payload: oldVDOM};
        // if there is an already existent text node, replace it
        else patches[index] = {type: PATCH_REPLACE_NODE, payload: newVDOM};
    }
    return patches;
};
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
let patches = diff(A, B);
console.log(patches);
applyPatches()