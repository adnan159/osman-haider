/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

module.exports = window["React"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************************************!*\
  !*** ./assets/js/frontend/src/miusage/index.js ***!
  \*************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const {
  registerBlockType
} = wp.blocks;
const {
  __
} = wp.i18n;
const {
  InspectorControls
} = wp.blockEditor;
const {
  PanelBody,
  PanelRow,
  TextControl,
  CheckboxControl
} = wp.components;
const {
  withState
} = wp.compose;
const {
  Component,
  createElement: el
} = wp.element;
registerBlockType('osman-haider/my-block', {
  title: 'Osman Haider - My Block',
  icon: 'smiley',
  category: 'common',
  attributes: {
    responseData: {
      type: 'json'
    }
  },
  edit: function (props) {
    var attributes = props.attributes;
    var setAttributes = props.setAttributes;

    // Function to handle AJAX request and update data in the block
    function fetchData() {
      jQuery.ajax({
        url: miusageData.ajaxurl,
        type: 'GET',
        data: {
          action: 'oh_miusage_action'
        },
        success: function (response) {
          setAttributes({
            responseData: JSON.parse(response)
          });
        }
      });
    }
    React.useEffect(function () {
      fetchData();
    }, []);
    if (attributes.responseData) {
      return [el('div', {
        className: 'custom-block-content'
      }, el('table', {
        className: 'oh-table'
      }, el('caption', {
        className: 'oh-caption'
      }, attributes.responseData.title),
      // Table headers
      el('thead', {
        className: 'oh-thead'
      }, el('tr', {
        className: 'oh-tr'
      }, attributes.responseData.data.headers.map(function (header, index) {
        return el('th', {
          key: index,
          className: 'oh-th'
        }, header);
      }))),
      // Table body
      el('tbody', {
        className: 'oh-tbody'
      }, Object.keys(attributes.responseData.data.rows).map(function (rowKey) {
        var row = attributes.responseData.data.rows[rowKey];
        return el('tr', {
          key: rowKey,
          className: 'oh-tr'
        }, el('td', {
          className: 'oh-td'
        }, row.id), el('td', {
          className: 'oh-td'
        }, row.fname), el('td', {
          className: 'oh-td'
        }, row.lname), el('td', {
          className: 'oh-td'
        }, row.email), el('td', {
          className: 'oh-td'
        }, new Date(row.date * 1000).toLocaleDateString()) // Convert timestamp to date
        );
      }))))];
    }
  },
  save: () => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, "Hello, dev!")
});
})();

/******/ })()
;
//# sourceMappingURL=index.js.map