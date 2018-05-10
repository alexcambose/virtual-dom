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

/***/ "./node_modules/webpack/buildin/module.js":
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
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
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var PATCH_INSERT_NODE = exports.PATCH_INSERT_NODE = 'PATCH_INSERT_NODE';
var PATCH_REPLACE_NODE = exports.PATCH_REPLACE_NODE = 'PATCH_REPLACE_NODE';
var PATCH_REMOVE_NODE = exports.PATCH_REMOVE_NODE = 'PATCH_REMOVE_NODE';
var PATCH_TEXT_NODE = exports.PATCH_TEXT_NODE = 'PATCH_TEXT_NODE';
var PATCH_PROPS_NODE = exports.PATCH_PROPS_NODE = 'PATCH_PROPS_NODE';

/***/ }),

/***/ "./src/diff.js":
/*!*********************!*\
  !*** ./src/diff.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = __webpack_require__(/*! ./constants */ "./src/constants.js");

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var diffProps = function diffProps(oldProps, newProps) {
    oldProps = _extends({}, oldProps);
    newProps = _extends({}, newProps);
    delete oldProps.children;
    delete newProps.children;
    return !(0, _utils.objectIsEqual)(oldProps, newProps) && newProps;
};

var diff = function diff(oldVDOM, newVDOM) {
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    var selfPatch = {}; //initialize patches
    var childrenPatches = {};
    if (!newVDOM && oldVDOM) {
        selfPatch = { type: _constants.PATCH_REMOVE_NODE, payload: oldVDOM };
    } else if (newVDOM && !oldVDOM) {
        selfPatch = { type: _constants.PATCH_INSERT_NODE, payload: newVDOM };
    } else if ((0, _utils.isString)(oldVDOM) && (0, _utils.isObject)(newVDOM) || // check types between new and old VDOM and replace if different
    (0, _utils.isObject)(oldVDOM) && (0, _utils.isString)(newVDOM) || oldVDOM.type !== newVDOM.type) {
        selfPatch = { type: _constants.PATCH_REPLACE_NODE, payload: newVDOM };
    } else if (newVDOM !== oldVDOM && (0, _utils.isString)(newVDOM) && (0, _utils.isString)(oldVDOM)) {
        //check for text differences
        selfPatch = { type: _constants.PATCH_TEXT_NODE, payload: newVDOM };
    } else if ((0, _utils.isObject)(newVDOM) && (0, _utils.isObject)(oldVDOM)) {
        // if both are nodes object we need to check for props and go deeper
        // check if props are different
        if (diffProps(oldVDOM.props, newVDOM.props)) {
            var props = Object.assign({}, newVDOM.props); // new props
            var oldProps = Object.assign({}, oldVDOM.props); // old props
            delete props.children;
            delete oldProps.children;
            selfPatch = { type: _constants.PATCH_PROPS_NODE, payload: { props: props, oldProps: oldProps } };
        }
        var oldVDOMChildren = (0, _utils.flatternArray)(oldVDOM.props.children);
        var newVDOMChildren = (0, _utils.flatternArray)(newVDOM.props.children);
        //get the longest child element
        var childrenLength = Math.max(oldVDOMChildren.length, newVDOMChildren.length);
        for (var i = 0; i < childrenLength; i++) {
            childrenPatches = _extends({}, childrenPatches, diff(oldVDOMChildren[i], newVDOMChildren[i], i));
        }
    } else {
        // oldVDOM === newVDOM
    }
    var patches = {};
    if (!(0, _utils.objectIsEmpty)(selfPatch)) patches['selfPatch'] = selfPatch;
    if (!(0, _utils.objectIsEmpty)(childrenPatches)) patches['childrenPatches'] = childrenPatches;
    return !(0, _utils.objectIsEmpty)(patches) && _defineProperty({}, index, patches);
};

exports.default = diff;

/***/ }),

/***/ "./src/h.js":
/*!******************!*\
  !*** ./src/h.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var h = function h(type, props) {
    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        children[_key - 2] = arguments[_key];
    }

    var element = {
        type: type,
        props: _extends({}, props, { children: children })
    };
    if ((0, _utils.isObject)(type)) {
        return h.apply(undefined, [type.type, type.props].concat(_toConsumableArray(type.props.children)));
    } else if ((0, _utils.isFunction)(type)) {
        return type(_extends({}, element.props));
    }
    return element;
};
exports.default = h;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.h = exports.render = exports.patch = exports.diff = undefined;

var _diff = __webpack_require__(/*! ./diff */ "./src/diff.js");

var _diff2 = _interopRequireDefault(_diff);

var _patch = __webpack_require__(/*! ./patch */ "./src/patch.js");

var _patch2 = _interopRequireDefault(_patch);

var _render = __webpack_require__(/*! ./render */ "./src/render.js");

var _render2 = _interopRequireDefault(_render);

var _h = __webpack_require__(/*! ./h */ "./src/h.js");

var _h2 = _interopRequireDefault(_h);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (module && !module.exports) {
    console.log('wtf');
    window.diff = _diff2.default;
    window.patch = _patch2.default;
    window.render = _render2.default;
    window.h = _h2.default;
}
exports.diff = _diff2.default;
exports.patch = _patch2.default;
exports.render = _render2.default;
exports.h = _h2.default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/module.js */ "./node_modules/webpack/buildin/module.js")(module)))

/***/ }),

/***/ "./src/patch.js":
/*!**********************!*\
  !*** ./src/patch.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _constants = __webpack_require__(/*! ./constants */ "./src/constants.js");

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var applyPatch = function applyPatch($node, patch) {
    switch (patch.type) {
        case _constants.PATCH_INSERT_NODE:
            $node.appendChild((0, _utils.createNode)(patch.payload));
            break;
        case _constants.PATCH_REPLACE_NODE:
            $node.parentNode.replaceChild((0, _utils.createNode)(patch.payload), $node);
            break;
        case _constants.PATCH_TEXT_NODE:
            $node.textContent = patch.payload;
            break;
        case _constants.PATCH_REMOVE_NODE:
            $node.remove();
            break;
        case _constants.PATCH_PROPS_NODE:
            (0, _utils.applyProps)($node, patch.payload.props, patch.payload.oldProps);
            break;
    }
};

var applyPatches = function applyPatches($root, patches) {
    var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    if (patches && patches[index]) {
        if (patches[index]["selfPatch"]) applyPatch($root.childNodes[index] || $root, patches[index]["selfPatch"]);
        for (var patchKey in patches[index]["childrenPatches"]) {
            applyPatches($root.childNodes[index], patches[index]["childrenPatches"], parseInt(patchKey));
        }
    }
};

exports.default = applyPatches;

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

exports.default = function (element, $root) {
  return (0, _utils.appendNode)($root, (0, _utils.createNode)(element));
};

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var isObject = exports.isObject = function isObject(value) {
    return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && !Array.isArray(value) && value !== null;
};
var isFunction = exports.isFunction = function isFunction(value) {
    return !!(value && value.constructor && value.call && value.apply);
}; // https://jsperf.com/alternative-isfunction-implementations
var isString = exports.isString = function isString(value) {
    return typeof value === 'string';
};
var isArray = exports.isArray = function isArray(value) {
    return Array.isArray(value);
};

var objectIsEqual = exports.objectIsEqual = function objectIsEqual(firstObj, lastObj) {
    if (isObject(firstObj) && isObject(lastObj)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = Object.keys(firstObj)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                if (!objectIsEqual(firstObj[key], lastObj[key])) return false;
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        return true;
    }
    return firstObj + '' === lastObj + ''; // +'' for functinon check
};

var flatternArray = exports.flatternArray = function flatternArray(array) {
    if (!array) return [];
    var items = [];
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
        for (var _iterator2 = array[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var item = _step2.value;

            if (Array.isArray(item)) items.push.apply(items, _toConsumableArray(flatternArray(item)));else items.push(item);
        }
    } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
            }
        } finally {
            if (_didIteratorError2) {
                throw _iteratorError2;
            }
        }
    }

    return items;
};

var objectIsEmpty = exports.objectIsEmpty = function objectIsEmpty(value) {
    return !Object.keys(value).length;
};

/* DOM HELPERS */

var createTextNode = exports.createTextNode = function createTextNode(data) {
    return document.createTextNode(data);
};
var createNodeFromObject = exports.createNodeFromObject = function createNodeFromObject(data) {
    var $node = document.createElement(data.type);
    var props = _extends({}, data.props);delete props.children;
    var children = data.props.children;

    applyProps($node, props);
    if (children) {
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = children[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var child = _step3.value;

                appendNode($node, createNode(child));
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }
    }return $node;
};
var applyProps = exports.applyProps = function applyProps($node, props, oldProps) {
    while ($node.attributes.length > 0) {
        // remove old attributes, TODO not the best way to do tho
        $node.removeAttribute($node.attributes[0].name);
    }for (var propName in props) {
        // loop through all new props
        if (propName.match(/^on([A-Z].*)/) && isFunction(props[propName])) {
            // chack for events (ex: onClick)
            var eventName = propName.match(/^on([A-Z].*)/)[1].toLowerCase();

            if (eventName === 'onchange') eventName = 'oninput'; // transform onChange in onInput, see https://github.com/facebook/react/issues/3964

            if (oldProps && oldProps[propName]) // remove old event if exists
                $node.removeEventListener(eventName, oldProps[propName]);
            $node.addEventListener(eventName, props[propName]); // add the new event
        } else if (propName === 'style') {
            // set styles
            for (var styleName in props['style']) {
                $node.style[styleName] = props['style'][styleName];
            }
        } else {
            (function () {
                // any props remaining (ex: id, class)
                var attributeName = propName.toLowerCase();
                var attributeValue = props[propName];

                //replace different name attributes, see https://github.com/facebook/react/blob/dcc854bcc3c940ca583565ce25200ca618c05bf0/packages/react-dom/src/shared/DOMProperty.js#L230
                if (propName.toLowerCase() === 'classname') propName = 'class'; // replace className with class
                [['acceptCharset', 'accept-charset'], ['className', 'class'], ['htmlFor', 'for'], ['httpEquiv', 'http-equiv']].forEach(function (_ref) {
                    var _ref2 = _slicedToArray(_ref, 2),
                        name = _ref2[0],
                        replacementValue = _ref2[1];

                    if (attributeName === name.toLowerCase()) attributeName = replacementValue;
                });
                if (attributeValue !== null) {
                    // avoid null values
                    // set the prop
                    $node.setAttribute(attributeName, attributeValue);
                }
            })();
        }
    }
};
var createNode = exports.createNode = function createNode(data) {
    // if data is a simple string
    if (isString(data)) return createTextNode(data);

    // if data is an array, return an array of nodes
    else if (isArray(data)) return data.map(function (node) {
            return createNode(node);
        });

        // if data is an object(ex: {type: 'div', props:{className: 'someClass', children: []}}
        else if (isObject(data)) return createNodeFromObject(data);
};
var appendNode = exports.appendNode = function appendNode($root, $nodes) {
    // $nodes may be a single node or an array of nodes
    if (isArray($nodes)) {
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
            for (var _iterator4 = $nodes[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var $node = _step4.value;

                $root.appendChild($node);
            }
        } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                    _iterator4.return();
                }
            } finally {
                if (_didIteratorError4) {
                    throw _iteratorError4;
                }
            }
        }
    } else $root.appendChild($nodes);
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uc3RhbnRzLmpzIiwid2VicGFjazovLy8uL3NyYy9kaWZmLmpzIiwid2VicGFjazovLy8uL3NyYy9oLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvcGF0Y2guanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlbmRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbHMuanMiXSwibmFtZXMiOlsiUEFUQ0hfSU5TRVJUX05PREUiLCJQQVRDSF9SRVBMQUNFX05PREUiLCJQQVRDSF9SRU1PVkVfTk9ERSIsIlBBVENIX1RFWFRfTk9ERSIsIlBBVENIX1BST1BTX05PREUiLCJkaWZmUHJvcHMiLCJvbGRQcm9wcyIsIm5ld1Byb3BzIiwiY2hpbGRyZW4iLCJkaWZmIiwib2xkVkRPTSIsIm5ld1ZET00iLCJpbmRleCIsInNlbGZQYXRjaCIsImNoaWxkcmVuUGF0Y2hlcyIsInR5cGUiLCJwYXlsb2FkIiwicHJvcHMiLCJPYmplY3QiLCJhc3NpZ24iLCJvbGRWRE9NQ2hpbGRyZW4iLCJuZXdWRE9NQ2hpbGRyZW4iLCJjaGlsZHJlbkxlbmd0aCIsIk1hdGgiLCJtYXgiLCJsZW5ndGgiLCJpIiwicGF0Y2hlcyIsImgiLCJlbGVtZW50IiwibW9kdWxlIiwiZXhwb3J0cyIsImNvbnNvbGUiLCJsb2ciLCJ3aW5kb3ciLCJwYXRjaCIsInJlbmRlciIsImFwcGx5UGF0Y2giLCIkbm9kZSIsImFwcGVuZENoaWxkIiwicGFyZW50Tm9kZSIsInJlcGxhY2VDaGlsZCIsInRleHRDb250ZW50IiwicmVtb3ZlIiwiYXBwbHlQYXRjaGVzIiwiJHJvb3QiLCJjaGlsZE5vZGVzIiwicGF0Y2hLZXkiLCJwYXJzZUludCIsImlzT2JqZWN0IiwidmFsdWUiLCJBcnJheSIsImlzQXJyYXkiLCJpc0Z1bmN0aW9uIiwiY29uc3RydWN0b3IiLCJjYWxsIiwiYXBwbHkiLCJpc1N0cmluZyIsIm9iamVjdElzRXF1YWwiLCJmaXJzdE9iaiIsImxhc3RPYmoiLCJrZXlzIiwia2V5IiwiZmxhdHRlcm5BcnJheSIsImFycmF5IiwiaXRlbXMiLCJpdGVtIiwicHVzaCIsIm9iamVjdElzRW1wdHkiLCJjcmVhdGVUZXh0Tm9kZSIsImRvY3VtZW50IiwiZGF0YSIsImNyZWF0ZU5vZGVGcm9tT2JqZWN0IiwiY3JlYXRlRWxlbWVudCIsImFwcGx5UHJvcHMiLCJjaGlsZCIsImFwcGVuZE5vZGUiLCJjcmVhdGVOb2RlIiwiYXR0cmlidXRlcyIsInJlbW92ZUF0dHJpYnV0ZSIsIm5hbWUiLCJwcm9wTmFtZSIsIm1hdGNoIiwiZXZlbnROYW1lIiwidG9Mb3dlckNhc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0eWxlTmFtZSIsInN0eWxlIiwiYXR0cmlidXRlTmFtZSIsImF0dHJpYnV0ZVZhbHVlIiwiZm9yRWFjaCIsInJlcGxhY2VtZW50VmFsdWUiLCJzZXRBdHRyaWJ1dGUiLCJtYXAiLCJub2RlIiwiJG5vZGVzIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FD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LEVBQTRCO0FBQUU7QUFDMUI7QUFDQXBELDBCQUFNdUQsWUFBTixDQUFtQkosYUFBbkIsRUFBa0NDLGNBQWxDO0FBQ0g7QUFmRTtBQWdCTjtBQUNKO0FBQ0osQ0FqQ007QUFrQ0EsSUFBTWIsa0NBQWEsU0FBYkEsVUFBYSxPQUFRO0FBQzlCO0FBQ0EsUUFBR3BCLFNBQVNjLElBQVQsQ0FBSCxFQUFtQixPQUFPRixlQUFlRSxJQUFmLENBQVA7O0FBRW5CO0FBRkEsU0FHSyxJQUFHbkIsUUFBUW1CLElBQVIsQ0FBSCxFQUFrQixPQUFPQSxLQUFLdUIsR0FBTCxDQUFTO0FBQUEsbUJBQVFqQixXQUFXa0IsSUFBWCxDQUFSO0FBQUEsU0FBVCxDQUFQOztBQUV2QjtBQUZLLGFBR0EsSUFBRzlDLFNBQVNzQixJQUFULENBQUgsRUFBbUIsT0FBT0MscUJBQXFCRCxJQUFyQixDQUFQO0FBQzNCLENBVE07QUFVQSxJQUFNSyxrQ0FBYSxTQUFiQSxVQUFhLENBQUMvQixLQUFELEVBQVFtRCxNQUFSLEVBQW1CO0FBQ3pDO0FBQ0EsUUFBRzVDLFFBQVE0QyxNQUFSLENBQUg7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFDSSxrQ0FBaUJBLE1BQWpCO0FBQUEsb0JBQVExRCxLQUFSOztBQUNJTyxzQkFBTU4sV0FBTixDQUFrQkQsS0FBbEI7QUFESjtBQURKO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUdLTyxNQUFNTixXQUFOLENBQWtCeUQsTUFBbEI7QUFDUixDQU5NLEMiLCJmaWxlIjoidmlydHVhbC1kb20uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmICghbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcclxuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxyXG5cdFx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0fVxyXG5cdHJldHVybiBtb2R1bGU7XHJcbn07XHJcbiIsImV4cG9ydCBjb25zdCBQQVRDSF9JTlNFUlRfTk9ERSA9ICdQQVRDSF9JTlNFUlRfTk9ERSc7XG5leHBvcnQgY29uc3QgUEFUQ0hfUkVQTEFDRV9OT0RFID0gJ1BBVENIX1JFUExBQ0VfTk9ERSc7XG5leHBvcnQgY29uc3QgUEFUQ0hfUkVNT1ZFX05PREUgPSAnUEFUQ0hfUkVNT1ZFX05PREUnO1xuZXhwb3J0IGNvbnN0IFBBVENIX1RFWFRfTk9ERSA9ICdQQVRDSF9URVhUX05PREUnO1xuZXhwb3J0IGNvbnN0IFBBVENIX1BST1BTX05PREUgPSAnUEFUQ0hfUFJPUFNfTk9ERSc7XG4iLCJpbXBvcnQgeyBQQVRDSF9JTlNFUlRfTk9ERSwgUEFUQ0hfUkVQTEFDRV9OT0RFLCBQQVRDSF9SRU1PVkVfTk9ERSwgUEFUQ0hfVEVYVF9OT0RFLCBQQVRDSF9QUk9QU19OT0RFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgaXNPYmplY3QsIGlzU3RyaW5nLCBvYmplY3RJc0VxdWFsLCBmbGF0dGVybkFycmF5LCBvYmplY3RJc0VtcHR5IH0gZnJvbSAnLi91dGlscyc7XG5jb25zdCBkaWZmUHJvcHMgPSAob2xkUHJvcHMsIG5ld1Byb3BzKSA9PiB7XG4gICAgb2xkUHJvcHMgPSB7IC4uLm9sZFByb3BzIH07XG4gICAgbmV3UHJvcHMgPSB7IC4uLm5ld1Byb3BzIH07XG4gICAgZGVsZXRlIG9sZFByb3BzLmNoaWxkcmVuO1xuICAgIGRlbGV0ZSBuZXdQcm9wcy5jaGlsZHJlbjtcbiAgICByZXR1cm4gIW9iamVjdElzRXF1YWwob2xkUHJvcHMsIG5ld1Byb3BzKSAmJiBuZXdQcm9wcztcbn07XG5cbmNvbnN0IGRpZmYgPSAob2xkVkRPTSwgbmV3VkRPTSwgaW5kZXggPSAwKSA9PiB7XG4gICAgbGV0IHNlbGZQYXRjaCA9IHt9OyAvL2luaXRpYWxpemUgcGF0Y2hlc1xuICAgIGxldCBjaGlsZHJlblBhdGNoZXMgPSB7fTtcbiAgICBpZiAoIW5ld1ZET00gJiYgb2xkVkRPTSkge1xuICAgICAgICBzZWxmUGF0Y2ggPSB7dHlwZTogUEFUQ0hfUkVNT1ZFX05PREUsIHBheWxvYWQ6IG9sZFZET019O1xuICAgIH0gZWxzZSBpZiAobmV3VkRPTSAmJiAhb2xkVkRPTSkge1xuICAgICAgICBzZWxmUGF0Y2ggPSB7dHlwZTogUEFUQ0hfSU5TRVJUX05PREUsIHBheWxvYWQ6IG5ld1ZET019O1xuICAgIH0gZWxzZSBpZigoaXNTdHJpbmcob2xkVkRPTSkgJiYgaXNPYmplY3QobmV3VkRPTSkpIHx8IC8vIGNoZWNrIHR5cGVzIGJldHdlZW4gbmV3IGFuZCBvbGQgVkRPTSBhbmQgcmVwbGFjZSBpZiBkaWZmZXJlbnRcbiAgICAgICAgaXNPYmplY3Qob2xkVkRPTSkgJiYgaXNTdHJpbmcobmV3VkRPTSkgfHxcbiAgICAgICAgb2xkVkRPTS50eXBlICE9PSBuZXdWRE9NLnR5cGUpIHtcbiAgICAgICAgc2VsZlBhdGNoID0ge3R5cGU6IFBBVENIX1JFUExBQ0VfTk9ERSwgcGF5bG9hZDogbmV3VkRPTX07XG4gICAgfSBlbHNlIGlmKG5ld1ZET00gIT09IG9sZFZET00gJiYgaXNTdHJpbmcobmV3VkRPTSkgJiYgaXNTdHJpbmcob2xkVkRPTSkpIHsgLy9jaGVjayBmb3IgdGV4dCBkaWZmZXJlbmNlc1xuICAgICAgICBzZWxmUGF0Y2ggPSB7dHlwZTogUEFUQ0hfVEVYVF9OT0RFLCBwYXlsb2FkOiBuZXdWRE9NfTtcbiAgICB9IGVsc2UgaWYoaXNPYmplY3QobmV3VkRPTSkgJiYgaXNPYmplY3Qob2xkVkRPTSkpIHsgLy8gaWYgYm90aCBhcmUgbm9kZXMgb2JqZWN0IHdlIG5lZWQgdG8gY2hlY2sgZm9yIHByb3BzIGFuZCBnbyBkZWVwZXJcbiAgICAgICAgLy8gY2hlY2sgaWYgcHJvcHMgYXJlIGRpZmZlcmVudFxuICAgICAgICBpZihkaWZmUHJvcHMob2xkVkRPTS5wcm9wcywgbmV3VkRPTS5wcm9wcykpIHtcbiAgICAgICAgICAgIGNvbnN0IHByb3BzID0gT2JqZWN0LmFzc2lnbih7fSwgbmV3VkRPTS5wcm9wcyk7IC8vIG5ldyBwcm9wc1xuICAgICAgICAgICAgY29uc3Qgb2xkUHJvcHMgPSBPYmplY3QuYXNzaWduKHt9LCBvbGRWRE9NLnByb3BzKTsgLy8gb2xkIHByb3BzXG4gICAgICAgICAgICBkZWxldGUgcHJvcHMuY2hpbGRyZW47XG4gICAgICAgICAgICBkZWxldGUgb2xkUHJvcHMuY2hpbGRyZW47XG4gICAgICAgICAgICBzZWxmUGF0Y2ggPSB7IHR5cGU6IFBBVENIX1BST1BTX05PREUsIHBheWxvYWQ6IHsgcHJvcHMsIG9sZFByb3BzIH0gfTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBvbGRWRE9NQ2hpbGRyZW4gPSBmbGF0dGVybkFycmF5KG9sZFZET00ucHJvcHMuY2hpbGRyZW4pO1xuICAgICAgICBjb25zdCBuZXdWRE9NQ2hpbGRyZW4gPSBmbGF0dGVybkFycmF5KG5ld1ZET00ucHJvcHMuY2hpbGRyZW4pO1xuICAgICAgICAvL2dldCB0aGUgbG9uZ2VzdCBjaGlsZCBlbGVtZW50XG4gICAgICAgIGxldCBjaGlsZHJlbkxlbmd0aCA9IE1hdGgubWF4KG9sZFZET01DaGlsZHJlbi5sZW5ndGgsIG5ld1ZET01DaGlsZHJlbi5sZW5ndGgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgY2hpbGRyZW5QYXRjaGVzID0geyAuLi5jaGlsZHJlblBhdGNoZXMsIC4uLmRpZmYob2xkVkRPTUNoaWxkcmVuW2ldLCBuZXdWRE9NQ2hpbGRyZW5baV0sIGkpIH07XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBvbGRWRE9NID09PSBuZXdWRE9NXG4gICAgfVxuICAgIGxldCBwYXRjaGVzID0ge307XG4gICAgaWYoIW9iamVjdElzRW1wdHkoc2VsZlBhdGNoKSkgcGF0Y2hlc1snc2VsZlBhdGNoJ10gPSBzZWxmUGF0Y2g7XG4gICAgaWYoIW9iamVjdElzRW1wdHkoY2hpbGRyZW5QYXRjaGVzKSkgcGF0Y2hlc1snY2hpbGRyZW5QYXRjaGVzJ10gPSBjaGlsZHJlblBhdGNoZXM7XG4gICAgcmV0dXJuICFvYmplY3RJc0VtcHR5KHBhdGNoZXMpICYmIHsgW2luZGV4XSA6IHBhdGNoZXMgfTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRpZmY7XG4iLCJpbXBvcnQgeyBpc09iamVjdCwgaXNGdW5jdGlvbiB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IGggPSAodHlwZSwgcHJvcHMsIC4uLmNoaWxkcmVuKSA9PiB7XG4gICAgY29uc3QgZWxlbWVudCA9IHtcbiAgICAgICAgdHlwZSxcbiAgICAgICAgcHJvcHM6IHsuLi5wcm9wcywgY2hpbGRyZW59LFxuICAgIH07XG4gICAgaWYoaXNPYmplY3QodHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIGgodHlwZS50eXBlLCB0eXBlLnByb3BzLCAuLi50eXBlLnByb3BzLmNoaWxkcmVuKTtcbiAgICB9IGVsc2UgaWYgKGlzRnVuY3Rpb24odHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIHR5cGUoeyAuLi5lbGVtZW50LnByb3BzIH0pO1xuICAgIH1cbiAgICByZXR1cm4gZWxlbWVudDtcbn1cbmV4cG9ydCBkZWZhdWx0IGg7XG4iLCJpbXBvcnQgZGlmZiBmcm9tICcuL2RpZmYnO1xuaW1wb3J0IHBhdGNoIGZyb20gJy4vcGF0Y2gnO1xuaW1wb3J0IHJlbmRlciBmcm9tICcuL3JlbmRlcic7XG5pbXBvcnQgaCBmcm9tICcuL2gnO1xuXG5pZihtb2R1bGUgJiYgIW1vZHVsZS5leHBvcnRzKSB7XG4gICAgY29uc29sZS5sb2coJ3d0ZicpXG4gICAgd2luZG93LmRpZmYgPSBkaWZmO1xuICAgIHdpbmRvdy5wYXRjaCA9IHBhdGNoO1xuICAgIHdpbmRvdy5yZW5kZXIgPSByZW5kZXI7XG4gICAgd2luZG93LmggPSBoO1xufVxuZXhwb3J0IHtcbiAgICBkaWZmLCBwYXRjaCwgcmVuZGVyLCBoXG59XG4iLCJpbXBvcnQgeyBQQVRDSF9JTlNFUlRfTk9ERSwgUEFUQ0hfUkVQTEFDRV9OT0RFLCBQQVRDSF9SRU1PVkVfTk9ERSwgUEFUQ0hfVEVYVF9OT0RFLCBQQVRDSF9QUk9QU19OT0RFIH0gZnJvbSAnLi9jb25zdGFudHMnO1xuaW1wb3J0IHsgYXBwbHlQcm9wcywgY3JlYXRlTm9kZSB9IGZyb20gJy4vdXRpbHMnO1xuXG5cbmNvbnN0IGFwcGx5UGF0Y2ggPSAoJG5vZGUsIHBhdGNoKSA9PiB7XG4gICAgc3dpdGNoIChwYXRjaC50eXBlKSB7XG4gICAgICAgIGNhc2UgUEFUQ0hfSU5TRVJUX05PREU6XG4gICAgICAgICAgICAkbm9kZS5hcHBlbmRDaGlsZChjcmVhdGVOb2RlKHBhdGNoLnBheWxvYWQpKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFBBVENIX1JFUExBQ0VfTk9ERTpcbiAgICAgICAgICAgICRub2RlLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGNyZWF0ZU5vZGUocGF0Y2gucGF5bG9hZCksICRub2RlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFBBVENIX1RFWFRfTk9ERTpcbiAgICAgICAgICAgICRub2RlLnRleHRDb250ZW50ID0gcGF0Y2gucGF5bG9hZDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFBBVENIX1JFTU9WRV9OT0RFOlxuICAgICAgICAgICAgJG5vZGUucmVtb3ZlKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBQQVRDSF9QUk9QU19OT0RFOlxuICAgICAgICAgICAgYXBwbHlQcm9wcygkbm9kZSwgcGF0Y2gucGF5bG9hZC5wcm9wcywgcGF0Y2gucGF5bG9hZC5vbGRQcm9wcyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59O1xuXG5jb25zdCBhcHBseVBhdGNoZXMgPSAoJHJvb3QsIHBhdGNoZXMsIGluZGV4ID0gMCkgPT4ge1xuICAgIGlmIChwYXRjaGVzICYmIHBhdGNoZXNbaW5kZXhdKSB7XG4gICAgICAgIGlmIChwYXRjaGVzW2luZGV4XVtcInNlbGZQYXRjaFwiXSlcbiAgICAgICAgICAgIGFwcGx5UGF0Y2goXG4gICAgICAgICAgICAgICAgJHJvb3QuY2hpbGROb2Rlc1tpbmRleF0gfHwgJHJvb3QsXG4gICAgICAgICAgICAgICAgcGF0Y2hlc1tpbmRleF1bXCJzZWxmUGF0Y2hcIl1cbiAgICAgICAgICAgICk7XG4gICAgICAgIGZvciAobGV0IHBhdGNoS2V5IGluIHBhdGNoZXNbaW5kZXhdW1wiY2hpbGRyZW5QYXRjaGVzXCJdKSB7XG4gICAgICAgICAgICBhcHBseVBhdGNoZXMoXG4gICAgICAgICAgICAgICAgJHJvb3QuY2hpbGROb2Rlc1tpbmRleF0sXG4gICAgICAgICAgICAgICAgcGF0Y2hlc1tpbmRleF1bXCJjaGlsZHJlblBhdGNoZXNcIl0sXG4gICAgICAgICAgICAgICAgcGFyc2VJbnQocGF0Y2hLZXkpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgYXBwbHlQYXRjaGVzO1xuIiwiaW1wb3J0IHsgYXBwZW5kTm9kZSwgY3JlYXRlTm9kZSB9IGZyb20gXCIuL3V0aWxzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IChlbGVtZW50LCAkcm9vdCkgPT4gYXBwZW5kTm9kZSgkcm9vdCwgY3JlYXRlTm9kZShlbGVtZW50KSk7XG4iLCJleHBvcnQgY29uc3QgaXNPYmplY3QgPSB2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICFBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZSAhPT0gbnVsbDtcbmV4cG9ydCBjb25zdCBpc0Z1bmN0aW9uID0gdmFsdWUgPT4gISEodmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IgJiYgdmFsdWUuY2FsbCAmJiB2YWx1ZS5hcHBseSk7IC8vIGh0dHBzOi8vanNwZXJmLmNvbS9hbHRlcm5hdGl2ZS1pc2Z1bmN0aW9uLWltcGxlbWVudGF0aW9uc1xuZXhwb3J0IGNvbnN0IGlzU3RyaW5nID0gdmFsdWUgPT4gdHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJztcbmV4cG9ydCBjb25zdCBpc0FycmF5ID0gdmFsdWUgPT4gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG5cbmV4cG9ydCBjb25zdCBvYmplY3RJc0VxdWFsID0gKGZpcnN0T2JqLCBsYXN0T2JqKSA9PiB7XG4gICAgaWYoaXNPYmplY3QoZmlyc3RPYmopICYmIGlzT2JqZWN0KGxhc3RPYmopKSB7XG4gICAgICAgIGZvcihsZXQga2V5IG9mIE9iamVjdC5rZXlzKGZpcnN0T2JqKSkge1xuICAgICAgICAgICAgaWYgKCFvYmplY3RJc0VxdWFsKGZpcnN0T2JqW2tleV0sIGxhc3RPYmpba2V5XSkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZpcnN0T2JqKycnID09PSBsYXN0T2JqKycnOyAvLyArJycgZm9yIGZ1bmN0aW5vbiBjaGVja1xufTtcblxuZXhwb3J0IGNvbnN0IGZsYXR0ZXJuQXJyYXkgPSBhcnJheSA9PiB7XG4gICAgaWYoIWFycmF5KSByZXR1cm4gW107XG4gICAgY29uc3QgaXRlbXMgPSBbXTtcbiAgICBmb3IobGV0IGl0ZW0gb2YgYXJyYXkpXG4gICAgICAgIGlmKEFycmF5LmlzQXJyYXkoaXRlbSkpXG4gICAgICAgICAgICBpdGVtcy5wdXNoKC4uLmZsYXR0ZXJuQXJyYXkoaXRlbSkpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBpdGVtcy5wdXNoKGl0ZW0pO1xuICAgIHJldHVybiBpdGVtcztcbn07XG5cbmV4cG9ydCBjb25zdCBvYmplY3RJc0VtcHR5ID0gdmFsdWUgPT4gIU9iamVjdC5rZXlzKHZhbHVlKS5sZW5ndGg7XG5cblxuLyogRE9NIEhFTFBFUlMgKi9cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVRleHROb2RlID0gZGF0YSA9PiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShkYXRhKTtcbmV4cG9ydCBjb25zdCBjcmVhdGVOb2RlRnJvbU9iamVjdCA9IGRhdGEgPT4ge1xuICAgIGNvbnN0ICRub2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChkYXRhLnR5cGUpO1xuICAgIGNvbnN0IHByb3BzID0geyAuLi5kYXRhLnByb3BzIH07IGRlbGV0ZSBwcm9wcy5jaGlsZHJlbjtcbiAgICBjb25zdCB7IGNoaWxkcmVuIH0gPSBkYXRhLnByb3BzO1xuICAgIGFwcGx5UHJvcHMoJG5vZGUsIHByb3BzKTtcbiAgICBpZihjaGlsZHJlbilcbiAgICAgICAgZm9yKGxldCBjaGlsZCBvZiBjaGlsZHJlbilcbiAgICAgICAgICAgIGFwcGVuZE5vZGUoJG5vZGUsIGNyZWF0ZU5vZGUoY2hpbGQpKTtcbiAgICByZXR1cm4gJG5vZGU7XG59O1xuZXhwb3J0IGNvbnN0IGFwcGx5UHJvcHMgPSAoJG5vZGUsIHByb3BzLCBvbGRQcm9wcykgPT4ge1xuICAgIHdoaWxlKCRub2RlLmF0dHJpYnV0ZXMubGVuZ3RoID4gMCkgLy8gcmVtb3ZlIG9sZCBhdHRyaWJ1dGVzLCBUT0RPIG5vdCB0aGUgYmVzdCB3YXkgdG8gZG8gdGhvXG4gICAgICAgICRub2RlLnJlbW92ZUF0dHJpYnV0ZSgkbm9kZS5hdHRyaWJ1dGVzWzBdLm5hbWUpO1xuXG4gICAgZm9yKGxldCBwcm9wTmFtZSBpbiBwcm9wcykgeyAvLyBsb29wIHRocm91Z2ggYWxsIG5ldyBwcm9wc1xuICAgICAgICBpZiAocHJvcE5hbWUubWF0Y2goL15vbihbQS1aXS4qKS8pICYmIGlzRnVuY3Rpb24ocHJvcHNbcHJvcE5hbWVdKSkgeyAvLyBjaGFjayBmb3IgZXZlbnRzIChleDogb25DbGljaylcbiAgICAgICAgICAgIGxldCBldmVudE5hbWUgPSBwcm9wTmFtZS5tYXRjaCgvXm9uKFtBLVpdLiopLylbMV0udG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYoZXZlbnROYW1lID09PSAnb25jaGFuZ2UnKSBldmVudE5hbWUgPSAnb25pbnB1dCc7IC8vIHRyYW5zZm9ybSBvbkNoYW5nZSBpbiBvbklucHV0LCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy8zOTY0XG5cbiAgICAgICAgICAgIGlmKG9sZFByb3BzICYmIG9sZFByb3BzW3Byb3BOYW1lXSkgLy8gcmVtb3ZlIG9sZCBldmVudCBpZiBleGlzdHNcbiAgICAgICAgICAgICAgICAkbm9kZS5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgb2xkUHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgICAgICAgICRub2RlLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBwcm9wc1twcm9wTmFtZV0pOyAvLyBhZGQgdGhlIG5ldyBldmVudFxuICAgICAgICB9IGVsc2UgaWYgKHByb3BOYW1lID09PSAnc3R5bGUnKSB7IC8vIHNldCBzdHlsZXNcbiAgICAgICAgICAgIGZvcihsZXQgc3R5bGVOYW1lIGluIHByb3BzWydzdHlsZSddKSAkbm9kZS5zdHlsZVtzdHlsZU5hbWVdID0gcHJvcHNbJ3N0eWxlJ11bc3R5bGVOYW1lXTtcbiAgICAgICAgfSBlbHNlIHsgLy8gYW55IHByb3BzIHJlbWFpbmluZyAoZXg6IGlkLCBjbGFzcylcbiAgICAgICAgICAgIGxldCBhdHRyaWJ1dGVOYW1lID0gcHJvcE5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGxldCBhdHRyaWJ1dGVWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcblxuICAgICAgICAgICAgLy9yZXBsYWNlIGRpZmZlcmVudCBuYW1lIGF0dHJpYnV0ZXMsIHNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvYmxvYi9kY2M4NTRiY2MzYzk0MGNhNTgzNTY1Y2UyNTIwMGNhNjE4YzA1YmYwL3BhY2thZ2VzL3JlYWN0LWRvbS9zcmMvc2hhcmVkL0RPTVByb3BlcnR5LmpzI0wyMzBcbiAgICAgICAgICAgIGlmKHByb3BOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdjbGFzc25hbWUnKSBwcm9wTmFtZSA9ICdjbGFzcyc7IC8vIHJlcGxhY2UgY2xhc3NOYW1lIHdpdGggY2xhc3NcbiAgICAgICAgICAgIFtbJ2FjY2VwdENoYXJzZXQnLCAnYWNjZXB0LWNoYXJzZXQnXSxcbiAgICAgICAgICAgIFsnY2xhc3NOYW1lJywgJ2NsYXNzJ10sXG4gICAgICAgICAgICBbJ2h0bWxGb3InLCAnZm9yJ10sXG4gICAgICAgICAgICBbJ2h0dHBFcXVpdicsICdodHRwLWVxdWl2J11dLmZvckVhY2goKFtuYW1lLCByZXBsYWNlbWVudFZhbHVlXSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmKGF0dHJpYnV0ZU5hbWUgPT09IG5hbWUudG9Mb3dlckNhc2UoKSkgYXR0cmlidXRlTmFtZSA9IHJlcGxhY2VtZW50VmFsdWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgaWYoYXR0cmlidXRlVmFsdWUgIT09IG51bGwpIHsgLy8gYXZvaWQgbnVsbCB2YWx1ZXNcbiAgICAgICAgICAgICAgICAvLyBzZXQgdGhlIHByb3BcbiAgICAgICAgICAgICAgICAkbm9kZS5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlTmFtZSwgYXR0cmlidXRlVmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCBjcmVhdGVOb2RlID0gZGF0YSA9PiB7XG4gICAgLy8gaWYgZGF0YSBpcyBhIHNpbXBsZSBzdHJpbmdcbiAgICBpZihpc1N0cmluZyhkYXRhKSkgcmV0dXJuIGNyZWF0ZVRleHROb2RlKGRhdGEpO1xuXG4gICAgLy8gaWYgZGF0YSBpcyBhbiBhcnJheSwgcmV0dXJuIGFuIGFycmF5IG9mIG5vZGVzXG4gICAgZWxzZSBpZihpc0FycmF5KGRhdGEpKSByZXR1cm4gZGF0YS5tYXAobm9kZSA9PiBjcmVhdGVOb2RlKG5vZGUpKTtcblxuICAgIC8vIGlmIGRhdGEgaXMgYW4gb2JqZWN0KGV4OiB7dHlwZTogJ2RpdicsIHByb3BzOntjbGFzc05hbWU6ICdzb21lQ2xhc3MnLCBjaGlsZHJlbjogW119fVxuICAgIGVsc2UgaWYoaXNPYmplY3QoZGF0YSkpIHJldHVybiBjcmVhdGVOb2RlRnJvbU9iamVjdChkYXRhKTtcbn07XG5leHBvcnQgY29uc3QgYXBwZW5kTm9kZSA9ICgkcm9vdCwgJG5vZGVzKSA9PiB7XG4gICAgLy8gJG5vZGVzIG1heSBiZSBhIHNpbmdsZSBub2RlIG9yIGFuIGFycmF5IG9mIG5vZGVzXG4gICAgaWYoaXNBcnJheSgkbm9kZXMpKVxuICAgICAgICBmb3IobGV0ICRub2RlIG9mICRub2RlcylcbiAgICAgICAgICAgICRyb290LmFwcGVuZENoaWxkKCRub2RlKTtcbiAgICBlbHNlICRyb290LmFwcGVuZENoaWxkKCRub2Rlcyk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==