var test =
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./test.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Componet.ts":
/*!*********************!*\
  !*** ./Componet.ts ***!
  \*********************/
/*! exports provided: Component */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return Component; });\nclass Component {\r\n    constructor(ds = \"\", comp = []) {\r\n        this.children = {};\r\n        this.data = {};\r\n        this.domElement = document.createElement(\"div\");\r\n        this.domElement.innerHTML = ds;\r\n        Component.use(comp, this.domElement, this);\r\n    }\r\n    static accessor(target, attr) {\r\n        Object.defineProperty(target, attr, {\r\n            get: function () {\r\n                this.addNewDataContainer(attr);\r\n                return this.data[attr].value;\r\n            },\r\n            set: function (val) {\r\n                this.addNewDataContainer(attr);\r\n                this.data[attr].value = val;\r\n                let handler = this.data[attr].handler;\r\n                for (let i = 0; i < handler.length; i++) {\r\n                    handler[i]();\r\n                }\r\n            }\r\n        });\r\n    }\r\n    static nameTag(tagName) {\r\n        return function (target) {\r\n            target[\"tagName\"] = tagName;\r\n            target[\"instance\"] = {};\r\n        };\r\n    }\r\n    static use(comp, dom = document.body, storage = null) {\r\n        let tags = [];\r\n        for (let i = 0; i < comp.length; i++) {\r\n            tags.push(Array.from(dom.getElementsByTagName(comp[i].tagName)));\r\n        }\r\n        for (let i = 0; i < comp.length; i++) {\r\n            let items = tags[i];\r\n            for (let j = 0; j < items.length; j++) {\r\n                let parentEle = items[j].parentElement;\r\n                let nc = new comp[i]();\r\n                for (let key in items[j].dataset) {\r\n                    if (!nc.hasOwnProperty(key) && nc[key]) {\r\n                        nc[key] = items[j].dataset[key];\r\n                    }\r\n                }\r\n                let targetStore = comp[i].instance;\r\n                if (storage)\r\n                    targetStore = storage.children;\r\n                targetStore[j] = nc;\r\n                if (items[j].id)\r\n                    targetStore[items[j].id] = nc;\r\n                if (storage)\r\n                    nc.parent = storage;\r\n                parentEle.insertBefore(nc.domElement, items[j]);\r\n                parentEle.removeChild(items[j]);\r\n            }\r\n        }\r\n    }\r\n    twoDataBinding(dataName, element, handler) {\r\n        if (!this.data[dataName])\r\n            this.addNewDataContainer(dataName, null);\r\n        this.data[dataName].handler.push(handler);\r\n        this.data[dataName].bindElements.push(element);\r\n        if (element) {\r\n            let listener = (e) => {\r\n                this[dataName] = element.value;\r\n            };\r\n            element.addEventListener(\"input\", listener);\r\n            element.addEventListener(\"DOMCharacterDataModified\", listener, false);\r\n        }\r\n        handler();\r\n    }\r\n    listenData(dataName, handler) {\r\n        this.twoDataBinding(dataName, null, handler);\r\n    }\r\n    getChild(name) {\r\n        return this.children[name];\r\n    }\r\n    addNewDataContainer(dataName, value = \"\") {\r\n        if (!this.data)\r\n            this.data = {};\r\n        if (this.data[dataName])\r\n            return null;\r\n        this.data[dataName] = {\r\n            'value': value,\r\n            'bindElements': [],\r\n            'handler': []\r\n        };\r\n        return this.data[dataName];\r\n    }\r\n}\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9Db21wb25ldC50cy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL1tuYW1lXS8uL0NvbXBvbmV0LnRzPzk2ZTQiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIENvbXBvbmVudHtcclxuICAgIHN0YXRpYyBpbnN0YW5jZToge1trZXk6IHN0cmluZ106IENvbXBvbmVudH07XHJcbiAgICBzdGF0aWMgdGFnTmFtZTogc3RyaW5nO1xyXG4gICAgcGFyZW50OiBDb21wb25lbnQ7XHJcbiAgICBwcm90ZWN0ZWQgY2hpbGRyZW46IHtba2V5OiBzdHJpbmddOiBDb21wb25lbnR9ID0ge307XHJcbiAgICBwcm90ZWN0ZWQgZGF0YToge1trZXk6c3RyaW5nXTogYW55fSA9IHt9O1xyXG4gICAgcHJvdGVjdGVkIGRvbUVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cclxuICAgIHN0YXRpYyBhY2Nlc3Nvcih0YXJnZXQ6IGFueSwgYXR0cjogc3RyaW5nKXtcclxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBhdHRyLCB7XHJcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkTmV3RGF0YUNvbnRhaW5lcihhdHRyKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRhdGFbYXR0cl0udmFsdWU7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24odmFsKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkTmV3RGF0YUNvbnRhaW5lcihhdHRyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF0YVthdHRyXS52YWx1ZSA9IHZhbDtcclxuICAgICAgICAgICAgICAgIGxldCBoYW5kbGVyID0gdGhpcy5kYXRhW2F0dHJdLmhhbmRsZXI7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgaGFuZGxlci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlcltpXSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIG5hbWVUYWcodGFnTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHRhcmdldDogYW55KXtcclxuICAgICAgICAgICAgdGFyZ2V0W1widGFnTmFtZVwiXSA9IHRhZ05hbWU7XHJcbiAgICAgICAgICAgIHRhcmdldFtcImluc3RhbmNlXCJdID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHN0YXRpYyB1c2UoY29tcDogdHlwZW9mIENvbXBvbmVudFtdLCBkb206IEhUTUxFbGVtZW50ID0gZG9jdW1lbnQuYm9keSwgc3RvcmFnZTogQ29tcG9uZW50ID0gbnVsbCl7XHJcbiAgICAgICAgbGV0IHRhZ3M6IEhUTUxFbGVtZW50W11bXSA9IFtdO1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCBjb21wLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgdGFncy5wdXNoKDxIVE1MRWxlbWVudFtdPkFycmF5LmZyb20oZG9tLmdldEVsZW1lbnRzQnlUYWdOYW1lKGNvbXBbaV0udGFnTmFtZSkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGNvbXAubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBsZXQgaXRlbXMgPSB0YWdzW2ldO1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwOyBqIDwgaXRlbXMubGVuZ3RoOyBqKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhcmVudEVsZSA9IGl0ZW1zW2pdLnBhcmVudEVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgbmMgPSBuZXcgY29tcFtpXSgpO1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBrZXkgaW4gaXRlbXNbal0uZGF0YXNldCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoIW5jLmhhc093blByb3BlcnR5KGtleSkgJiYgKDxhbnk+bmMpW2tleV0pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAoPGFueT5uYylba2V5XSA9IGl0ZW1zW2pdLmRhdGFzZXRba2V5XTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldFN0b3JlOiB7W2tleTogc3RyaW5nXTogQ29tcG9uZW50fSA9IGNvbXBbaV0uaW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICBpZihzdG9yYWdlKSB0YXJnZXRTdG9yZSA9IHN0b3JhZ2UuY2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRTdG9yZVtqXSA9IG5jO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGl0ZW1zW2pdLmlkKSB0YXJnZXRTdG9yZVtpdGVtc1tqXS5pZF0gPSBuYztcclxuICAgICAgICAgICAgICAgIGlmKHN0b3JhZ2UpbmMucGFyZW50ID0gc3RvcmFnZTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICBwYXJlbnRFbGUuaW5zZXJ0QmVmb3JlKG5jLmRvbUVsZW1lbnQsIGl0ZW1zW2pdKTtcclxuICAgICAgICAgICAgICAgIHBhcmVudEVsZS5yZW1vdmVDaGlsZChpdGVtc1tqXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IoZHM6IHN0cmluZyA9IFwiXCIsIGNvbXA6IHR5cGVvZiBDb21wb25lbnRbXSA9IFtdKXtcclxuICAgICAgICB0aGlzLmRvbUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHRoaXMuZG9tRWxlbWVudC5pbm5lckhUTUwgPSBkcztcclxuICAgICAgICBDb21wb25lbnQudXNlKGNvbXAsIHRoaXMuZG9tRWxlbWVudCwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdHdvRGF0YUJpbmRpbmcoZGF0YU5hbWU6IHN0cmluZywgZWxlbWVudDogSFRNTEVsZW1lbnQsIGhhbmRsZXI6IEZ1bmN0aW9uKXtcclxuICAgICAgICBpZighdGhpcy5kYXRhW2RhdGFOYW1lXSkgdGhpcy5hZGROZXdEYXRhQ29udGFpbmVyKGRhdGFOYW1lLCBudWxsKTtcclxuICAgICAgICB0aGlzLmRhdGFbZGF0YU5hbWVdLmhhbmRsZXIucHVzaChoYW5kbGVyKTtcclxuICAgICAgICB0aGlzLmRhdGFbZGF0YU5hbWVdLmJpbmRFbGVtZW50cy5wdXNoKGVsZW1lbnQpO1xyXG4gICAgICAgIGlmKGVsZW1lbnQpe1xyXG4gICAgICAgICAgICBsZXQgbGlzdGVuZXIgPSAgKGU6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAoPGFueT50aGlzKVtkYXRhTmFtZV0gPSAoPEhUTUxJbnB1dEVsZW1lbnQ+ZWxlbWVudCkudmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgbGlzdGVuZXIpO1xyXG4gICAgICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01DaGFyYWN0ZXJEYXRhTW9kaWZpZWRcIiwgbGlzdGVuZXIsIGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaGFuZGxlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGxpc3RlbkRhdGEoZGF0YU5hbWU6IHN0cmluZywgaGFuZGxlcjogRnVuY3Rpb24pe1xyXG4gICAgICAgIHRoaXMudHdvRGF0YUJpbmRpbmcoZGF0YU5hbWUsIG51bGwsIGhhbmRsZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldENoaWxkKG5hbWU6IHN0cmluZyB8IG51bWJlcik6IENvbXBvbmVudHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbltuYW1lXTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGFkZE5ld0RhdGFDb250YWluZXIoZGF0YU5hbWU6c3RyaW5nLCB2YWx1ZTogc3RyaW5nIHwgbnVtYmVyID0gXCJcIik6IG9iamVjdHtcclxuICAgICAgICBpZighdGhpcy5kYXRhKSB0aGlzLmRhdGEgPSB7fTtcclxuICAgICAgICBpZih0aGlzLmRhdGFbZGF0YU5hbWVdKSByZXR1cm4gbnVsbDtcclxuICAgICAgICB0aGlzLmRhdGFbZGF0YU5hbWVdID0ge1xyXG4gICAgICAgICAgICAndmFsdWUnOiB2YWx1ZSxcclxuICAgICAgICAgICAgJ2JpbmRFbGVtZW50cyc6IFtdLFxyXG4gICAgICAgICAgICAnaGFuZGxlcic6IFtdXHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhW2RhdGFOYW1lXTtcclxuICAgIH1cclxufVxyXG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQTZEQTtBQXpEQTtBQUNBO0FBeURBO0FBQ0E7QUFDQTtBQUNBO0FBekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFRQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUFBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./Componet.ts\n");

/***/ }),

/***/ "./Customtext.html":
/*!*************************!*\
  !*** ./Customtext.html ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"I am custom text <ctx></ctx>\";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9DdXN0b210ZXh0Lmh0bWwuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9bbmFtZV0vLi9DdXN0b210ZXh0Lmh0bWw/MTQ4YyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IFwiSSBhbSBjdXN0b20gdGV4dCA8Y3R4PjwvY3R4PlwiOyJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./Customtext.html\n");

/***/ }),

/***/ "./Customtext.ts":
/*!***********************!*\
  !*** ./Customtext.ts ***!
  \***********************/
/*! exports provided: Customtext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Customtext\", function() { return Customtext; });\n/* harmony import */ var _Componet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Componet */ \"./Componet.ts\");\n/* harmony import */ var _Customtext_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Customtext.html */ \"./Customtext.html\");\n/* harmony import */ var _Customtext_html__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Customtext_html__WEBPACK_IMPORTED_MODULE_1__);\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\n\r\n\r\nlet Customtext = class Customtext extends _Componet__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\r\n    constructor() {\r\n        super(_Customtext_html__WEBPACK_IMPORTED_MODULE_1___default.a);\r\n        this.ctx = \"hello fuck\";\r\n        this.text = \"jjjjj\";\r\n        let text = this.domElement.getElementsByTagName(\"ctx\")[0];\r\n        this.listenData(\"ctx\", () => {\r\n            text.innerHTML = this.ctx;\r\n        });\r\n    }\r\n};\r\n__decorate([\r\n    _Componet__WEBPACK_IMPORTED_MODULE_0__[\"Component\"].accessor\r\n], Customtext.prototype, \"ctx\", void 0);\r\nCustomtext = __decorate([\r\n    _Componet__WEBPACK_IMPORTED_MODULE_0__[\"Component\"].nameTag(\"customtext\")\r\n], Customtext);\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9DdXN0b210ZXh0LnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vW25hbWVdLy4vQ3VzdG9tdGV4dC50cz9jZTgxIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCIuL0NvbXBvbmV0XCJcclxuaW1wb3J0IGhzIGZyb20gXCIuL0N1c3RvbXRleHQuaHRtbFwiXHJcblxyXG5AQ29tcG9uZW50Lm5hbWVUYWcoXCJjdXN0b210ZXh0XCIpXHJcbmV4cG9ydCBjbGFzcyBDdXN0b210ZXh0IGV4dGVuZHMgQ29tcG9uZW50e1xyXG4gICAgQENvbXBvbmVudC5hY2Nlc3NvciBjdHg6IHN0cmluZyA9IFwiaGVsbG8gZnVja1wiO1xyXG4gICAgcHJpdmF0ZSB0ZXh0OiBzdHJpbmcgPSBcImpqampqXCI7XHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKGhzKTtcclxuICAgICAgICBsZXQgdGV4dCA9IHRoaXMuZG9tRWxlbWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImN0eFwiKVswXTtcclxuICAgICAgICB0aGlzLmxpc3RlbkRhdGEoXCJjdHhcIiwgKCkgPT57XHJcbiAgICAgICAgICAgIHRleHQuaW5uZXJIVE1MID0gdGhpcy5jdHg7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUdBO0FBR0E7QUFDQTtBQUhBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQUFBO0FBQUE7QUFEQTtBQURBO0FBQ0E7QUFBQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./Customtext.ts\n");

/***/ }),

/***/ "./Metornome.ts":
/*!**********************!*\
  !*** ./Metornome.ts ***!
  \**********************/
/*! exports provided: Metronome */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Metronome\", function() { return Metronome; });\n/* harmony import */ var _Componet__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Componet */ \"./Componet.ts\");\n/* harmony import */ var _Customtext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Customtext */ \"./Customtext.ts\");\n/* harmony import */ var _metronome_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./metronome.html */ \"./metronome.html\");\n/* harmony import */ var _metronome_html__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_metronome_html__WEBPACK_IMPORTED_MODULE_2__);\nvar __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {\r\n    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;\r\n    if (typeof Reflect === \"object\" && typeof Reflect.decorate === \"function\") r = Reflect.decorate(decorators, target, key, desc);\r\n    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;\r\n    return c > 3 && r && Object.defineProperty(target, key, r), r;\r\n};\r\n\r\n\r\n\r\nlet Metronome = class Metronome extends _Componet__WEBPACK_IMPORTED_MODULE_0__[\"Component\"] {\r\n    constructor() {\r\n        super(_metronome_html__WEBPACK_IMPORTED_MODULE_2___default.a, [_Customtext__WEBPACK_IMPORTED_MODULE_1__[\"Customtext\"]]);\r\n        this.bpm = 60;\r\n        let text = this.domElement.getElementsByTagName(\"speed\")[0];\r\n        this.listenData(\"bpm\", () => {\r\n            text.innerHTML = `${Math.round(this.bpm / 60 * 1000) / 1000}`;\r\n        }); // refactor, and id\r\n    }\r\n};\r\n__decorate([\r\n    _Componet__WEBPACK_IMPORTED_MODULE_0__[\"Component\"].accessor\r\n], Metronome.prototype, \"bpm\", void 0);\r\nMetronome = __decorate([\r\n    _Componet__WEBPACK_IMPORTED_MODULE_0__[\"Component\"].nameTag(\"metronome\")\r\n], Metronome);\r\n\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9NZXRvcm5vbWUudHMuanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9bbmFtZV0vLi9NZXRvcm5vbWUudHM/NjBlNiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiLi9Db21wb25ldFwiXHJcbmltcG9ydCB7IEN1c3RvbXRleHQgfSBmcm9tIFwiLi9DdXN0b210ZXh0XCJcclxuaW1wb3J0IGhzIGZyb20gXCIuL21ldHJvbm9tZS5odG1sXCJcclxuXHJcbkBDb21wb25lbnQubmFtZVRhZyhcIm1ldHJvbm9tZVwiKVxyXG5leHBvcnQgY2xhc3MgTWV0cm9ub21lIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIEBDb21wb25lbnQuYWNjZXNzb3IgYnBtOiBudW1iZXIgPSA2MDtcclxuICAgIHByaXZhdGUgYVByaXZhdGVWYXI6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG4gICAgICAgIHN1cGVyKGhzLCBbQ3VzdG9tdGV4dF0pO1xyXG4gICAgICAgIGxldCB0ZXh0ID0gdGhpcy5kb21FbGVtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic3BlZWRcIilbMF07XHJcbiAgICAgICAgdGhpcy5saXN0ZW5EYXRhKFwiYnBtXCIsICgpID0+e1xyXG4gICAgICAgICAgICB0ZXh0LmlubmVySFRNTCA9IGAke01hdGgucm91bmQodGhpcy5icG0gLyA2MCAqIDEwMDApIC8gMTAwMH1gO1xyXG4gICAgICAgIH0pOy8vIHJlZmFjdG9yLCBhbmQgaWRcclxuICAgIH1cclxufSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBR0E7QUFJQTtBQUNBO0FBSkE7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFWQTtBQUFBO0FBQUE7QUFEQTtBQURBO0FBQ0E7QUFBQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./Metornome.ts\n");

/***/ }),

/***/ "./metronome.html":
/*!************************!*\
  !*** ./metronome.html ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"I am metronome, speed: <speed></speed> per second<br>\\r\\n<a href=\\\"https://tw.yahoo.com\\\">yahoo</a>\\r\\n<customtext id=\\\"btx\\\"></customtext>\";//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9tZXRyb25vbWUuaHRtbC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovL1tuYW1lXS8uL21ldHJvbm9tZS5odG1sP2M1MGIiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBcIkkgYW0gbWV0cm9ub21lLCBzcGVlZDogPHNwZWVkPjwvc3BlZWQ+IHBlciBzZWNvbmQ8YnI+XFxyXFxuPGEgaHJlZj1cXFwiaHR0cHM6Ly90dy55YWhvby5jb21cXFwiPnlhaG9vPC9hPlxcclxcbjxjdXN0b210ZXh0IGlkPVxcXCJidHhcXFwiPjwvY3VzdG9tdGV4dD5cIjsiXSwibWFwcGluZ3MiOiJBQUFBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./metronome.html\n");

/***/ }),

/***/ "./test.ts":
/*!*****************!*\
  !*** ./test.ts ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Metornome__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Metornome */ \"./Metornome.ts\");\n/* harmony import */ var _Customtext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Customtext */ \"./Customtext.ts\");\n/* harmony import */ var _Componet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Componet */ \"./Componet.ts\");\n\r\n\r\n\r\n_Componet__WEBPACK_IMPORTED_MODULE_2__[\"Component\"].use([_Metornome__WEBPACK_IMPORTED_MODULE_0__[\"Metronome\"], _Customtext__WEBPACK_IMPORTED_MODULE_1__[\"Customtext\"]]);\r\nlet testinput = document.getElementById(\"testinput\");\r\n_Metornome__WEBPACK_IMPORTED_MODULE_0__[\"Metronome\"].instance[\"aa\"].twoDataBinding(\"bpm\", testinput, () => {\r\n    testinput.value = String(_Metornome__WEBPACK_IMPORTED_MODULE_0__[\"Metronome\"].instance[\"aa\"][\"bpm\"]);\r\n});\r\nconsole.log(_Metornome__WEBPACK_IMPORTED_MODULE_0__[\"Metronome\"].instance[\"aa\"].getChild(\"btx\"));\r\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi90ZXN0LnRzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vW25hbWVdLy4vdGVzdC50cz81NjNiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1ldHJvbm9tZSB9IGZyb20gXCIuL01ldG9ybm9tZVwiXHJcbmltcG9ydCB7IEN1c3RvbXRleHQgfSBmcm9tIFwiLi9DdXN0b210ZXh0XCJcclxuaW1wb3J0IHsgQ29tcG9uZW50fSBmcm9tIFwiLi9Db21wb25ldFwiXHJcbkNvbXBvbmVudC51c2UoW01ldHJvbm9tZSwgQ3VzdG9tdGV4dF0pO1xyXG5cclxubGV0IHRlc3RpbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGVzdGlucHV0XCIpO1xyXG5NZXRyb25vbWUuaW5zdGFuY2VbXCJhYVwiXS50d29EYXRhQmluZGluZyhcImJwbVwiLCB0ZXN0aW5wdXQsICgpID0+IHtcclxuICAgICg8SFRNTElucHV0RWxlbWVudD50ZXN0aW5wdXQpLnZhbHVlID0gU3RyaW5nKCg8TWV0cm9ub21lPk1ldHJvbm9tZS5pbnN0YW5jZVtcImFhXCJdKVtcImJwbVwiXSk7XHJcbn0pO1xyXG5jb25zb2xlLmxvZyhNZXRyb25vbWUuaW5zdGFuY2VbXCJhYVwiXS5nZXRDaGlsZChcImJ0eFwiKSk7Il0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./test.ts\n");

/***/ })

/******/ });