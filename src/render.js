import { appendNode, createNode } from "./utils";

export default (element, $root) => appendNode($root, createNode(element));
