import { PATCH_INSERT_NODE, PATCH_REPLACE_NODE, PATCH_REMOVE_NODE, PATCH_TEXT_NODE, PATCH_PROPS_NODE } from './constants';

const applyPatch = ($node, patch) => {
    switch (patch.type) {
        case PATCH_INSERT_NODE:
            $node.appendChild(createNode(patch.payload));
            break;
        case PATCH_REPLACE_NODE:
            $node.parentNode.replaceChild(createNode(patch.payload), $node);
            break;
        case PATCH_TEXT_NODE:
            $node.textContent = patch.payload;
            break;
        case PATCH_REMOVE_NODE:
            $node.remove();
            break;
        case PATCH_PROPS_NODE:
            applyProps($node, patch.payload);
            break;
    }
};

const applyPatches = ($root, patches, index = 0) => {
    console.log($root.childNodes[index], index, patches[index])

    applyPatch($root.childNodes[index] || $root, patches[index]);
    for(let patchKey in patches['patches'])
        applyPatches($root.childNodes[index], patches['patches'], parseInt(patchKey));
};

export default applyPatches;