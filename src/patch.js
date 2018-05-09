import { PATCH_INSERT_NODE, PATCH_REPLACE_NODE, PATCH_REMOVE_NODE, PATCH_TEXT_NODE, PATCH_PROPS_NODE } from './constants';
import { applyProps, createNode } from './utils';


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
            applyProps($node, patch.payload.props, patch.payload.oldProps);
            break;
    }
};

const applyPatches = ($root, patches, index = 0) => {
    if (patches && patches[index]) {
        if (patches[index]["selfPatch"])
            applyPatch(
                $root.childNodes[index] || $root,
                patches[index]["selfPatch"]
            );
        for (let patchKey in patches[index]["childrenPatches"]) {
            applyPatches(
                $root.childNodes[index],
                patches[index]["childrenPatches"],
                parseInt(patchKey)
            );
        }
    }
};

export default applyPatches;
