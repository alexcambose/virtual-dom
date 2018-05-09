/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if (!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! exports provided: PATCH_INSERT_NODE, PATCH_REPLACE_NODE, PATCH_REMOVE_NODE, PATCH_TEXT_NODE, PATCH_PROPS_NODE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PATCH_INSERT_NODE", function() { return PATCH_INSERT_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PATCH_REPLACE_NODE", function() { return PATCH_REPLACE_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PATCH_REMOVE_NODE", function() { return PATCH_REMOVE_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PATCH_TEXT_NODE", function() { return PATCH_TEXT_NODE; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PATCH_PROPS_NODE", function() { return PATCH_PROPS_NODE; });
const PATCH_INSERT_NODE = 'PATCH_INSERT_NODE';
const PATCH_REPLACE_NODE = 'PATCH_REPLACE_NODE';
const PATCH_REMOVE_NODE = 'PATCH_REMOVE_NODE';
const PATCH_TEXT_NODE = 'PATCH_TEXT_NODE';
const PATCH_PROPS_NODE = 'PATCH_PROPS_NODE';


/***/ }),

/***/ "./src/diff.js":
/*!*********************!*\
  !*** ./src/diff.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");


const diffProps = (oldProps, newProps) => {
    oldProps = { ...oldProps };
    newProps = { ...newProps };
    delete oldProps.children;
    delete newProps.children;
    return !Object(_utils__WEBPACK_IMPORTED_MODULE_1__["objectIsEqual"])(oldProps, newProps) && newProps;
};

const diff = (oldVDOM, newVDOM, index = 0) => {
    let selfPatch = {}; //initialize patches
    let childrenPatches = {};
    if (!newVDOM && oldVDOM) {
        selfPatch = {type: _constants__WEBPACK_IMPORTED_MODULE_0__["PATCH_REMOVE_NODE"], payload: oldVDOM};
    } else if (newVDOM && !oldVDOM) {
        selfPatch = {type: _constants__WEBPACK_IMPORTED_MODULE_0__["PATCH_INSERT_NODE"], payload: newVDOM};
    } else if((Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isString"])(oldVDOM) && Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isObject"])(newVDOM)) || // check types between new and old VDOM and replace if different
        Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isObject"])(oldVDOM) && Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isString"])(newVDOM) ||
        oldVDOM.type !== newVDOM.type) {
        selfPatch = {type: _constants__WEBPACK_IMPORTED_MODULE_0__["PATCH_REPLACE_NODE"], payload: newVDOM};
    } else if(newVDOM !== oldVDOM && Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isString"])(newVDOM) && Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isString"])(oldVDOM)) { //check for text differences
        selfPatch = {type: _constants__WEBPACK_IMPORTED_MODULE_0__["PATCH_TEXT_NODE"], payload: newVDOM};
    } else if(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isObject"])(newVDOM) && Object(_utils__WEBPACK_IMPORTED_MODULE_1__["isObject"])(oldVDOM)) { // if both are nodes object we need to check for props and go deeper
        // check if props are different
        if(diffProps(oldVDOM.props, newVDOM.props)) {
            const props = newVDOM.props; // new props
            const oldProps = oldVDOM.props; // old props
            delete props.children;
            delete oldProps.children;
            selfPatch = { type: _constants__WEBPACK_IMPORTED_MODULE_0__["PATCH_PROPS_NODE"], payload: { props, oldProps } };
        }
        const oldVDOMChildren = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["flatternArray"])(oldVDOM.props.children);
        const newVDOMChildren = Object(_utils__WEBPACK_IMPORTED_MODULE_1__["flatternArray"])(newVDOM.props.children);
        //get the longest child element
        let childrenLength = Math.max(oldVDOMChildren.length, newVDOMChildren.length);
        for (let i = 0; i < childrenLength; i++){
            childrenPatches = { ...childrenPatches, ...diff(oldVDOMChildren[i], newVDOMChildren[i], i) };
        }
    } else {
        // oldVDOM === newVDOM
    }
    let patches = {};
    if(!Object(_utils__WEBPACK_IMPORTED_MODULE_1__["objectIsEmpty"])(selfPatch)) patches['selfPatch'] = selfPatch;
    if(!Object(_utils__WEBPACK_IMPORTED_MODULE_1__["objectIsEmpty"])(childrenPatches)) patches['childrenPatches'] = childrenPatches;
    return !Object(_utils__WEBPACK_IMPORTED_MODULE_1__["objectIsEmpty"])(patches) && { [index] : patches };
};

/* harmony default export */ __webpack_exports__["default"] = (diff);


/***/ }),

/***/ "./src/h.js":
/*!******************!*\
  !*** ./src/h.js ***!
  \******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");


const h = (type, props, ...children) => {
    const element = {
        type,
        props: {...props, children},
    };
    if(Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isObject"])(type)) {
        return h(type.type, type.props, ...type.props.children);
    } else if (Object(_utils__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(type)) {
        return type({ ...element.props });
    }
    return element;
}
/* harmony default export */ __webpack_exports__["default"] = (h);


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: diff, patch, render, h */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var _diff__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./diff */ "./src/diff.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "diff", function() { return _diff__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _patch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./patch */ "./src/patch.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "patch", function() { return _patch__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _render__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./h */ "./src/h.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "h", function() { return _h__WEBPACK_IMPORTED_MODULE_3__["default"]; });






if(module && !module.exports) {
    console.log('wtf')
    window.diff = _diff__WEBPACK_IMPORTED_MODULE_0__["default"];
    window.patch = _patch__WEBPACK_IMPORTED_MODULE_1__["default"];
    window.render = _render__WEBPACK_IMPORTED_MODULE_2__["default"];
    window.h = _h__WEBPACK_IMPORTED_MODULE_3__["default"];
}


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ "./node_modules/webpack/buildin/harmony-module.js")(module)))

/***/ }),

/***/ "./src/patch.js":
/*!**********************!*\
  !*** ./src/patch.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/utils.js");




const applyPatch = ($node, patch) => {
    switch (patch.type) {
        case _constants__WEBPACK_IMPORTED_MODULE_0__["PATCH_INSERT_NODE"]:
            $node.appendChild(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["createNode"])(patch.payload));
            break;
        case _constants__WEBPACK_IMPORTED_MODULE_0__["PATCH_REPLACE_NODE"]:
            $node.parentNode.replaceChild(Object(_utils__WEBPACK_IMPORTED_MODULE_1__["createNode"])(patch.payload), $node);
            break;
        case _constants__WEBPACK_IMPORTED_MODULE_0__["PATCH_TEXT_NODE"]:
            $node.textContent = patch.payload;
            break;
        case _constants__WEBPACK_IMPORTED_MODULE_0__["PATCH_REMOVE_NODE"]:
            $node.remove();
            break;
        case _constants__WEBPACK_IMPORTED_MODULE_0__["PATCH_PROPS_NODE"]:
            Object(_utils__WEBPACK_IMPORTED_MODULE_1__["applyProps"])($node, patch.payload.props, patch.payload.oldProps);
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

/* harmony default export */ __webpack_exports__["default"] = (applyPatches);


/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils.js");


/* harmony default export */ __webpack_exports__["default"] = ((element, $root) => Object(_utils__WEBPACK_IMPORTED_MODULE_0__["appendNode"])($root, Object(_utils__WEBPACK_IMPORTED_MODULE_0__["createNode"])(element)));


/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! exports provided: isObject, isFunction, isString, isArray, objectIsEqual, flatternArray, objectIsEmpty, createTextNode, createNodeFromObject, applyProps, createNode, appendNode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isArray", function() { return isArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "objectIsEqual", function() { return objectIsEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "flatternArray", function() { return flatternArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "objectIsEmpty", function() { return objectIsEmpty; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createTextNode", function() { return createTextNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNodeFromObject", function() { return createNodeFromObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "applyProps", function() { return applyProps; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNode", function() { return createNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "appendNode", function() { return appendNode; });
const isObject = value => typeof value === 'object' && !Array.isArray(value);
const isFunction = value => !!(value && value.constructor && value.call && value.apply); // https://jsperf.com/alternative-isfunction-implementations
const isString = value => typeof value === 'string';
const isArray = value => Array.isArray(value);

const objectIsEqual = (firstObj, lastObj) => {
    if(typeof firstObj === 'object' && typeof lastObj === 'object') {
        for(let key of Object.keys(firstObj)) {
            if (!objectIsEqual(firstObj[key], lastObj[key])) return false;
        }
        return true;
    }
    return firstObj === lastObj; // +'' for functinon check
};

const flatternArray = array => {
    if(!array) return [];
    const items = [];
    for(let item of array)
        if(Array.isArray(item))
            items.push(...flatternArray(item));
        else
            items.push(item);
    return items;
};

const objectIsEmpty = value => !Object.keys(value).length;


/* DOM HELPERS */

const createTextNode = data => document.createTextNode(data);
const createNodeFromObject = data => {
    const $node = document.createElement(data.type);
    const props = { ...data.props }; delete props.children;
    const { children } = data.props;
    applyProps($node, props);
    if(children)
        for(let child of children)
            appendNode($node, createNode(child));
    return $node;
};
const applyProps = ($node, props, oldProps) => {
    while($node.attributes.length > 0) // remove old attributes, TODO not the best way to do tho
        $node.removeAttribute($node.attributes[0].name);

    for(let propName in props) { // loop through all new props
        if(propName.toLowerCase() === 'classname') { // set class
            $node.setAttribute('class', props[propName]);
        } else if (propName.match(/^on([A-Z].*)/) && isFunction(props[propName])) { // chack for events (ex: onClick)
            const eventName = propName.match(/^on([A-Z].*)/)[1].toLowerCase();

            if(oldProps && oldProps[propName]) // remove old event if exists
                $node.removeEventListener(eventName, oldProps[propName]);
            $node.addEventListener(eventName, props[propName]); // add the new event
        } else if (propName === 'style') { // set styles
            for(let styleName in props['style']) $node.style[styleName] = props['style'][styleName];
        } else { // any props remaining (ex: id)
            $node.setAttribute(propName, props[propName], oldProps[propName]);
        }
    }
};
const createNode = data => {
    // if data is a simple string
    if(isString(data)) return createTextNode(data);

    // if data is an array, return an array of nodes
    else if(isArray(data)) return data.map(node => createNode(node));

    // if data is an object(ex: {type: 'div', props:{className: 'someClass', children: []}}
    else if(isObject(data)) return createNodeFromObject(data);
};
const appendNode = ($root, $nodes) => {
    // $nodes may be a single node or an array of nodes
    if(isArray($nodes))
        for(let $node of $nodes)
            $root.appendChild($node);
    else $root.appendChild($nodes);
};


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2hhcm1vbnktbW9kdWxlLmpzIiwid2VicGFjazovLy8uL3NyYy9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RpZmYuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9wYXRjaC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcmVuZGVyLmpzIiwid2VicGFjazovLy8uL3NyYy91dGlscy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDSnNHO0FBQzVCO0FBQzFFO0FBQ0EsZ0JBQWdCO0FBQ2hCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLEtBQUs7QUFDTCxxQkFBcUI7QUFDckIsS0FBSztBQUNMO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsS0FBSyx1S0FBeUU7QUFDOUUscUJBQXFCO0FBQ3JCLEtBQUssZ0pBQWtEO0FBQ3ZEO0FBQ0E7QUFDQSx3Q0FBd0M7QUFDeEMsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQSx5QkFBeUIsOEVBQW1DLGtCQUFrQjtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLG9CQUFvQjtBQUMzQywrQkFBK0I7QUFDL0I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNGQUF1QztBQUN2Qzs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7O0FDaEQrQjs7QUFFL0I7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLG1CQUFtQjtBQUNuQztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wscUJBQXFCLG1CQUFtQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUdBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2RzRztBQUNyRTs7O0FBR2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7QUN6Q2lDOztBQUVqQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNGQTtBQUNBLHdGQUErRjtBQUMvRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDLFdBQVcsV0FBVztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0NBQWdDO0FBQ2hDLG9EQUFvRDtBQUNwRDtBQUNBLFNBQVMsMEVBQTBFO0FBQ25GOztBQUVBO0FBQ0E7QUFDQSwrREFBK0Q7QUFDL0QsU0FBUyxpQ0FBaUM7QUFDMUM7QUFDQSxTQUFTLE9BQU87QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQ0FBaUMsb0JBQW9CO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJ2aXJ0dWFsLWRvbS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob3JpZ2luYWxNb2R1bGUpIHtcblx0aWYgKCFvcmlnaW5hbE1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcblx0XHR2YXIgbW9kdWxlID0gT2JqZWN0LmNyZWF0ZShvcmlnaW5hbE1vZHVsZSk7XG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiZXhwb3J0c1wiLCB7XG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlXG5cdFx0fSk7XG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XG5cdH1cblx0cmV0dXJuIG1vZHVsZTtcbn07XG4iLCJleHBvcnQgY29uc3QgUEFUQ0hfSU5TRVJUX05PREUgPSAnUEFUQ0hfSU5TRVJUX05PREUnO1xuZXhwb3J0IGNvbnN0IFBBVENIX1JFUExBQ0VfTk9ERSA9ICdQQVRDSF9SRVBMQUNFX05PREUnO1xuZXhwb3J0IGNvbnN0IFBBVENIX1JFTU9WRV9OT0RFID0gJ1BBVENIX1JFTU9WRV9OT0RFJztcbmV4cG9ydCBjb25zdCBQQVRDSF9URVhUX05PREUgPSAnUEFUQ0hfVEVYVF9OT0RFJztcbmV4cG9ydCBjb25zdCBQQVRDSF9QUk9QU19OT0RFID0gJ1BBVENIX1BST1BTX05PREUnO1xuIiwiaW1wb3J0IHsgUEFUQ0hfSU5TRVJUX05PREUsIFBBVENIX1JFUExBQ0VfTk9ERSwgUEFUQ0hfUkVNT1ZFX05PREUsIFBBVENIX1RFWFRfTk9ERSwgUEFUQ0hfUFJPUFNfTk9ERSB9IGZyb20gJy4vY29uc3RhbnRzJztcbmltcG9ydCB7IGlzT2JqZWN0LCBpc1N0cmluZywgb2JqZWN0SXNFcXVhbCwgZmxhdHRlcm5BcnJheSwgb2JqZWN0SXNFbXB0eSB9IGZyb20gJy4vdXRpbHMnO1xuY29uc3QgZGlmZlByb3BzID0gKG9sZFByb3BzLCBuZXdQcm9wcykgPT4ge1xuICAgIG9sZFByb3BzID0geyAuLi5vbGRQcm9wcyB9O1xuICAgIG5ld1Byb3BzID0geyAuLi5uZXdQcm9wcyB9O1xuICAgIGRlbGV0ZSBvbGRQcm9wcy5jaGlsZHJlbjtcbiAgICBkZWxldGUgbmV3UHJvcHMuY2hpbGRyZW47XG4gICAgcmV0dXJuICFvYmplY3RJc0VxdWFsKG9sZFByb3BzLCBuZXdQcm9wcykgJiYgbmV3UHJvcHM7XG59O1xuXG5jb25zdCBkaWZmID0gKG9sZFZET00sIG5ld1ZET00sIGluZGV4ID0gMCkgPT4ge1xuICAgIGxldCBzZWxmUGF0Y2ggPSB7fTsgLy9pbml0aWFsaXplIHBhdGNoZXNcbiAgICBsZXQgY2hpbGRyZW5QYXRjaGVzID0ge307XG4gICAgaWYgKCFuZXdWRE9NICYmIG9sZFZET00pIHtcbiAgICAgICAgc2VsZlBhdGNoID0ge3R5cGU6IFBBVENIX1JFTU9WRV9OT0RFLCBwYXlsb2FkOiBvbGRWRE9NfTtcbiAgICB9IGVsc2UgaWYgKG5ld1ZET00gJiYgIW9sZFZET00pIHtcbiAgICAgICAgc2VsZlBhdGNoID0ge3R5cGU6IFBBVENIX0lOU0VSVF9OT0RFLCBwYXlsb2FkOiBuZXdWRE9NfTtcbiAgICB9IGVsc2UgaWYoKGlzU3RyaW5nKG9sZFZET00pICYmIGlzT2JqZWN0KG5ld1ZET00pKSB8fCAvLyBjaGVjayB0eXBlcyBiZXR3ZWVuIG5ldyBhbmQgb2xkIFZET00gYW5kIHJlcGxhY2UgaWYgZGlmZmVyZW50XG4gICAgICAgIGlzT2JqZWN0KG9sZFZET00pICYmIGlzU3RyaW5nKG5ld1ZET00pIHx8XG4gICAgICAgIG9sZFZET00udHlwZSAhPT0gbmV3VkRPTS50eXBlKSB7XG4gICAgICAgIHNlbGZQYXRjaCA9IHt0eXBlOiBQQVRDSF9SRVBMQUNFX05PREUsIHBheWxvYWQ6IG5ld1ZET019O1xuICAgIH0gZWxzZSBpZihuZXdWRE9NICE9PSBvbGRWRE9NICYmIGlzU3RyaW5nKG5ld1ZET00pICYmIGlzU3RyaW5nKG9sZFZET00pKSB7IC8vY2hlY2sgZm9yIHRleHQgZGlmZmVyZW5jZXNcbiAgICAgICAgc2VsZlBhdGNoID0ge3R5cGU6IFBBVENIX1RFWFRfTk9ERSwgcGF5bG9hZDogbmV3VkRPTX07XG4gICAgfSBlbHNlIGlmKGlzT2JqZWN0KG5ld1ZET00pICYmIGlzT2JqZWN0KG9sZFZET00pKSB7IC8vIGlmIGJvdGggYXJlIG5vZGVzIG9iamVjdCB3ZSBuZWVkIHRvIGNoZWNrIGZvciBwcm9wcyBhbmQgZ28gZGVlcGVyXG4gICAgICAgIC8vIGNoZWNrIGlmIHByb3BzIGFyZSBkaWZmZXJlbnRcbiAgICAgICAgaWYoZGlmZlByb3BzKG9sZFZET00ucHJvcHMsIG5ld1ZET00ucHJvcHMpKSB7XG4gICAgICAgICAgICBjb25zdCBwcm9wcyA9IG5ld1ZET00ucHJvcHM7IC8vIG5ldyBwcm9wc1xuICAgICAgICAgICAgY29uc3Qgb2xkUHJvcHMgPSBvbGRWRE9NLnByb3BzOyAvLyBvbGQgcHJvcHNcbiAgICAgICAgICAgIGRlbGV0ZSBwcm9wcy5jaGlsZHJlbjtcbiAgICAgICAgICAgIGRlbGV0ZSBvbGRQcm9wcy5jaGlsZHJlbjtcbiAgICAgICAgICAgIHNlbGZQYXRjaCA9IHsgdHlwZTogUEFUQ0hfUFJPUFNfTk9ERSwgcGF5bG9hZDogeyBwcm9wcywgb2xkUHJvcHMgfSB9O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG9sZFZET01DaGlsZHJlbiA9IGZsYXR0ZXJuQXJyYXkob2xkVkRPTS5wcm9wcy5jaGlsZHJlbik7XG4gICAgICAgIGNvbnN0IG5ld1ZET01DaGlsZHJlbiA9IGZsYXR0ZXJuQXJyYXkobmV3VkRPTS5wcm9wcy5jaGlsZHJlbik7XG4gICAgICAgIC8vZ2V0IHRoZSBsb25nZXN0IGNoaWxkIGVsZW1lbnRcbiAgICAgICAgbGV0IGNoaWxkcmVuTGVuZ3RoID0gTWF0aC5tYXgob2xkVkRPTUNoaWxkcmVuLmxlbmd0aCwgbmV3VkRPTUNoaWxkcmVuLmxlbmd0aCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBjaGlsZHJlblBhdGNoZXMgPSB7IC4uLmNoaWxkcmVuUGF0Y2hlcywgLi4uZGlmZihvbGRWRE9NQ2hpbGRyZW5baV0sIG5ld1ZET01DaGlsZHJlbltpXSwgaSkgfTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIG9sZFZET00gPT09IG5ld1ZET01cbiAgICB9XG4gICAgbGV0IHBhdGNoZXMgPSB7fTtcbiAgICBpZighb2JqZWN0SXNFbXB0eShzZWxmUGF0Y2gpKSBwYXRjaGVzWydzZWxmUGF0Y2gnXSA9IHNlbGZQYXRjaDtcbiAgICBpZighb2JqZWN0SXNFbXB0eShjaGlsZHJlblBhdGNoZXMpKSBwYXRjaGVzWydjaGlsZHJlblBhdGNoZXMnXSA9IGNoaWxkcmVuUGF0Y2hlcztcbiAgICByZXR1cm4gIW9iamVjdElzRW1wdHkocGF0Y2hlcykgJiYgeyBbaW5kZXhdIDogcGF0Y2hlcyB9O1xufTtcblxuZXhwb3J0IGRlZmF1bHQgZGlmZjtcbiIsImltcG9ydCB7IGlzT2JqZWN0LCBpc0Z1bmN0aW9uIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuY29uc3QgaCA9ICh0eXBlLCBwcm9wcywgLi4uY2hpbGRyZW4pID0+IHtcbiAgICBjb25zdCBlbGVtZW50ID0ge1xuICAgICAgICB0eXBlLFxuICAgICAgICBwcm9wczogey4uLnByb3BzLCBjaGlsZHJlbn0sXG4gICAgfTtcbiAgICBpZihpc09iamVjdCh0eXBlKSkge1xuICAgICAgICByZXR1cm4gaCh0eXBlLnR5cGUsIHR5cGUucHJvcHMsIC4uLnR5cGUucHJvcHMuY2hpbGRyZW4pO1xuICAgIH0gZWxzZSBpZiAoaXNGdW5jdGlvbih0eXBlKSkge1xuICAgICAgICByZXR1cm4gdHlwZSh7IC4uLmVsZW1lbnQucHJvcHMgfSk7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50O1xufVxuZXhwb3J0IGRlZmF1bHQgaDtcbiIsImltcG9ydCBkaWZmIGZyb20gJy4vZGlmZic7XG5pbXBvcnQgcGF0Y2ggZnJvbSAnLi9wYXRjaCc7XG5pbXBvcnQgcmVuZGVyIGZyb20gJy4vcmVuZGVyJztcbmltcG9ydCBoIGZyb20gJy4vaCc7XG5cbmlmKG1vZHVsZSAmJiAhbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBjb25zb2xlLmxvZygnd3RmJylcbiAgICB3aW5kb3cuZGlmZiA9IGRpZmY7XG4gICAgd2luZG93LnBhdGNoID0gcGF0Y2g7XG4gICAgd2luZG93LnJlbmRlciA9IHJlbmRlcjtcbiAgICB3aW5kb3cuaCA9IGg7XG59XG5leHBvcnQge1xuICAgIGRpZmYsIHBhdGNoLCByZW5kZXIsIGhcbn1cbiIsImltcG9ydCB7IFBBVENIX0lOU0VSVF9OT0RFLCBQQVRDSF9SRVBMQUNFX05PREUsIFBBVENIX1JFTU9WRV9OT0RFLCBQQVRDSF9URVhUX05PREUsIFBBVENIX1BST1BTX05PREUgfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBhcHBseVByb3BzLCBjcmVhdGVOb2RlIH0gZnJvbSAnLi91dGlscyc7XG5cblxuY29uc3QgYXBwbHlQYXRjaCA9ICgkbm9kZSwgcGF0Y2gpID0+IHtcbiAgICBzd2l0Y2ggKHBhdGNoLnR5cGUpIHtcbiAgICAgICAgY2FzZSBQQVRDSF9JTlNFUlRfTk9ERTpcbiAgICAgICAgICAgICRub2RlLmFwcGVuZENoaWxkKGNyZWF0ZU5vZGUocGF0Y2gucGF5bG9hZCkpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUEFUQ0hfUkVQTEFDRV9OT0RFOlxuICAgICAgICAgICAgJG5vZGUucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoY3JlYXRlTm9kZShwYXRjaC5wYXlsb2FkKSwgJG5vZGUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUEFUQ0hfVEVYVF9OT0RFOlxuICAgICAgICAgICAgJG5vZGUudGV4dENvbnRlbnQgPSBwYXRjaC5wYXlsb2FkO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUEFUQ0hfUkVNT1ZFX05PREU6XG4gICAgICAgICAgICAkbm9kZS5yZW1vdmUoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFBBVENIX1BST1BTX05PREU6XG4gICAgICAgICAgICBhcHBseVByb3BzKCRub2RlLCBwYXRjaC5wYXlsb2FkLnByb3BzLCBwYXRjaC5wYXlsb2FkLm9sZFByb3BzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn07XG5cbmNvbnN0IGFwcGx5UGF0Y2hlcyA9ICgkcm9vdCwgcGF0Y2hlcywgaW5kZXggPSAwKSA9PiB7XG4gICAgaWYgKHBhdGNoZXMgJiYgcGF0Y2hlc1tpbmRleF0pIHtcbiAgICAgICAgaWYgKHBhdGNoZXNbaW5kZXhdW1wic2VsZlBhdGNoXCJdKVxuICAgICAgICAgICAgYXBwbHlQYXRjaChcbiAgICAgICAgICAgICAgICAkcm9vdC5jaGlsZE5vZGVzW2luZGV4XSB8fCAkcm9vdCxcbiAgICAgICAgICAgICAgICBwYXRjaGVzW2luZGV4XVtcInNlbGZQYXRjaFwiXVxuICAgICAgICAgICAgKTtcbiAgICAgICAgZm9yIChsZXQgcGF0Y2hLZXkgaW4gcGF0Y2hlc1tpbmRleF1bXCJjaGlsZHJlblBhdGNoZXNcIl0pIHtcbiAgICAgICAgICAgIGFwcGx5UGF0Y2hlcyhcbiAgICAgICAgICAgICAgICAkcm9vdC5jaGlsZE5vZGVzW2luZGV4XSxcbiAgICAgICAgICAgICAgICBwYXRjaGVzW2luZGV4XVtcImNoaWxkcmVuUGF0Y2hlc1wiXSxcbiAgICAgICAgICAgICAgICBwYXJzZUludChwYXRjaEtleSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBhcHBseVBhdGNoZXM7XG4iLCJpbXBvcnQgeyBhcHBlbmROb2RlLCBjcmVhdGVOb2RlIH0gZnJvbSBcIi4vdXRpbHNcIjtcblxuZXhwb3J0IGRlZmF1bHQgKGVsZW1lbnQsICRyb290KSA9PiBhcHBlbmROb2RlKCRyb290LCBjcmVhdGVOb2RlKGVsZW1lbnQpKTtcbiIsImV4cG9ydCBjb25zdCBpc09iamVjdCA9IHZhbHVlID0+IHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkodmFsdWUpO1xuZXhwb3J0IGNvbnN0IGlzRnVuY3Rpb24gPSB2YWx1ZSA9PiAhISh2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvciAmJiB2YWx1ZS5jYWxsICYmIHZhbHVlLmFwcGx5KTsgLy8gaHR0cHM6Ly9qc3BlcmYuY29tL2FsdGVybmF0aXZlLWlzZnVuY3Rpb24taW1wbGVtZW50YXRpb25zXG5leHBvcnQgY29uc3QgaXNTdHJpbmcgPSB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xuZXhwb3J0IGNvbnN0IGlzQXJyYXkgPSB2YWx1ZSA9PiBBcnJheS5pc0FycmF5KHZhbHVlKTtcblxuZXhwb3J0IGNvbnN0IG9iamVjdElzRXF1YWwgPSAoZmlyc3RPYmosIGxhc3RPYmopID0+IHtcbiAgICBpZih0eXBlb2YgZmlyc3RPYmogPT09ICdvYmplY3QnICYmIHR5cGVvZiBsYXN0T2JqID09PSAnb2JqZWN0Jykge1xuICAgICAgICBmb3IobGV0IGtleSBvZiBPYmplY3Qua2V5cyhmaXJzdE9iaikpIHtcbiAgICAgICAgICAgIGlmICghb2JqZWN0SXNFcXVhbChmaXJzdE9ialtrZXldLCBsYXN0T2JqW2tleV0pKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmaXJzdE9iaiA9PT0gbGFzdE9iajsgLy8gKycnIGZvciBmdW5jdGlub24gY2hlY2tcbn07XG5cbmV4cG9ydCBjb25zdCBmbGF0dGVybkFycmF5ID0gYXJyYXkgPT4ge1xuICAgIGlmKCFhcnJheSkgcmV0dXJuIFtdO1xuICAgIGNvbnN0IGl0ZW1zID0gW107XG4gICAgZm9yKGxldCBpdGVtIG9mIGFycmF5KVxuICAgICAgICBpZihBcnJheS5pc0FycmF5KGl0ZW0pKVxuICAgICAgICAgICAgaXRlbXMucHVzaCguLi5mbGF0dGVybkFycmF5KGl0ZW0pKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcbiAgICByZXR1cm4gaXRlbXM7XG59O1xuXG5leHBvcnQgY29uc3Qgb2JqZWN0SXNFbXB0eSA9IHZhbHVlID0+ICFPYmplY3Qua2V5cyh2YWx1ZSkubGVuZ3RoO1xuXG5cbi8qIERPTSBIRUxQRVJTICovXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVUZXh0Tm9kZSA9IGRhdGEgPT4gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoZGF0YSk7XG5leHBvcnQgY29uc3QgY3JlYXRlTm9kZUZyb21PYmplY3QgPSBkYXRhID0+IHtcbiAgICBjb25zdCAkbm9kZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZGF0YS50eXBlKTtcbiAgICBjb25zdCBwcm9wcyA9IHsgLi4uZGF0YS5wcm9wcyB9OyBkZWxldGUgcHJvcHMuY2hpbGRyZW47XG4gICAgY29uc3QgeyBjaGlsZHJlbiB9ID0gZGF0YS5wcm9wcztcbiAgICBhcHBseVByb3BzKCRub2RlLCBwcm9wcyk7XG4gICAgaWYoY2hpbGRyZW4pXG4gICAgICAgIGZvcihsZXQgY2hpbGQgb2YgY2hpbGRyZW4pXG4gICAgICAgICAgICBhcHBlbmROb2RlKCRub2RlLCBjcmVhdGVOb2RlKGNoaWxkKSk7XG4gICAgcmV0dXJuICRub2RlO1xufTtcbmV4cG9ydCBjb25zdCBhcHBseVByb3BzID0gKCRub2RlLCBwcm9wcywgb2xkUHJvcHMpID0+IHtcbiAgICB3aGlsZSgkbm9kZS5hdHRyaWJ1dGVzLmxlbmd0aCA+IDApIC8vIHJlbW92ZSBvbGQgYXR0cmlidXRlcywgVE9ETyBub3QgdGhlIGJlc3Qgd2F5IHRvIGRvIHRob1xuICAgICAgICAkbm9kZS5yZW1vdmVBdHRyaWJ1dGUoJG5vZGUuYXR0cmlidXRlc1swXS5uYW1lKTtcblxuICAgIGZvcihsZXQgcHJvcE5hbWUgaW4gcHJvcHMpIHsgLy8gbG9vcCB0aHJvdWdoIGFsbCBuZXcgcHJvcHNcbiAgICAgICAgaWYocHJvcE5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2NsYXNzbmFtZScpIHsgLy8gc2V0IGNsYXNzXG4gICAgICAgICAgICAkbm9kZS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgcHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgfSBlbHNlIGlmIChwcm9wTmFtZS5tYXRjaCgvXm9uKFtBLVpdLiopLykgJiYgaXNGdW5jdGlvbihwcm9wc1twcm9wTmFtZV0pKSB7IC8vIGNoYWNrIGZvciBldmVudHMgKGV4OiBvbkNsaWNrKVxuICAgICAgICAgICAgY29uc3QgZXZlbnROYW1lID0gcHJvcE5hbWUubWF0Y2goL15vbihbQS1aXS4qKS8pWzFdLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgICAgIGlmKG9sZFByb3BzICYmIG9sZFByb3BzW3Byb3BOYW1lXSkgLy8gcmVtb3ZlIG9sZCBldmVudCBpZiBleGlzdHNcbiAgICAgICAgICAgICAgICAkbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgb2xkUHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgICAgICRub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBwcm9wc1twcm9wTmFtZV0pOyAvLyBhZGQgdGhlIG5ldyBldmVudFxuICAgICAgICB9IGVsc2UgaWYgKHByb3BOYW1lID09PSAnc3R5bGUnKSB7IC8vIHNldCBzdHlsZXNcbiAgICAgICAgICAgIGZvcihsZXQgc3R5bGVOYW1lIGluIHByb3BzWydzdHlsZSddKSAkbm9kZS5zdHlsZVtzdHlsZU5hbWVdID0gcHJvcHNbJ3N0eWxlJ11bc3R5bGVOYW1lXTtcbiAgICAgICAgfSBlbHNlIHsgLy8gYW55IHByb3BzIHJlbWFpbmluZyAoZXg6IGlkKVxuICAgICAgICAgICAgJG5vZGUuc2V0QXR0cmlidXRlKHByb3BOYW1lLCBwcm9wc1twcm9wTmFtZV0sIG9sZFByb3BzW3Byb3BOYW1lXSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IGNyZWF0ZU5vZGUgPSBkYXRhID0+IHtcbiAgICAvLyBpZiBkYXRhIGlzIGEgc2ltcGxlIHN0cmluZ1xuICAgIGlmKGlzU3RyaW5nKGRhdGEpKSByZXR1cm4gY3JlYXRlVGV4dE5vZGUoZGF0YSk7XG5cbiAgICAvLyBpZiBkYXRhIGlzIGFuIGFycmF5LCByZXR1cm4gYW4gYXJyYXkgb2Ygbm9kZXNcbiAgICBlbHNlIGlmKGlzQXJyYXkoZGF0YSkpIHJldHVybiBkYXRhLm1hcChub2RlID0+IGNyZWF0ZU5vZGUobm9kZSkpO1xuXG4gICAgLy8gaWYgZGF0YSBpcyBhbiBvYmplY3QoZXg6IHt0eXBlOiAnZGl2JywgcHJvcHM6e2NsYXNzTmFtZTogJ3NvbWVDbGFzcycsIGNoaWxkcmVuOiBbXX19XG4gICAgZWxzZSBpZihpc09iamVjdChkYXRhKSkgcmV0dXJuIGNyZWF0ZU5vZGVGcm9tT2JqZWN0KGRhdGEpO1xufTtcbmV4cG9ydCBjb25zdCBhcHBlbmROb2RlID0gKCRyb290LCAkbm9kZXMpID0+IHtcbiAgICAvLyAkbm9kZXMgbWF5IGJlIGEgc2luZ2xlIG5vZGUgb3IgYW4gYXJyYXkgb2Ygbm9kZXNcbiAgICBpZihpc0FycmF5KCRub2RlcykpXG4gICAgICAgIGZvcihsZXQgJG5vZGUgb2YgJG5vZGVzKVxuICAgICAgICAgICAgJHJvb3QuYXBwZW5kQ2hpbGQoJG5vZGUpO1xuICAgIGVsc2UgJHJvb3QuYXBwZW5kQ2hpbGQoJG5vZGVzKTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9