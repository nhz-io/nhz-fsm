(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Generator = function () {
	  function Generator(json) {
	    _classCallCheck(this, Generator);

	    this.table = {};
	    this.import(json);
	  }

	  _createClass(Generator, [{
	    key: 'setTransition',
	    value: function setTransition(fromState, event, toState, value) {
	      var table = this.table;

	      fromState = table[fromState] ? table[fromState] : table[fromState] = {};
	      event = fromState[event] ? fromState[event] : fromState[event] = {};
	      event[toState] = value;
	      if (!table[toState]) {
	        table[toState] = {};
	      };

	      return this;
	    }
	  }, {
	    key: 'add',
	    value: function add(fromState, event, toState) {
	      return this.setTransition(fromState, event, toState, true);
	    }
	  }, {
	    key: 'remove',
	    value: function remove(fromState, event, toState) {
	      return this.setTransition(fromState, event, toState, false);
	    }
	  }, {
	    key: 'import',
	    value: function _import(json) {
	      if (json && json.length) {
	        var state = undefined,
	            event = undefined;
	        var start = json.findIndex(function (i) {
	          return !isNaN(i);
	        });
	        var end = json.slice(start).findIndex(function (i) {
	          return isNaN(i);
	        }) + start;
	        var i = start;

	        while (i < end) {
	          if (json[i] != null) {
	            if (state != null) {
	              if (event) {
	                this.add(json[state], json[event], json[json[i]]);
	                event = null;
	              } else if (json[i] < start) {
	                state = json[i];
	              } else if (json[i] >= end) {
	                event = json[i];
	              } else {
	                throw new Error('Invalid event: ' + json[i] + ' at index: ' + i);
	              }
	            } else if (json[i] < start) {

	              state = json[i];
	            } else {
	              throw new Error('Invalid state: ' + json[i] + ' at index: ' + i);
	            }
	            i++;
	          } else {
	            throw new Error('Invalid value: ' + json[i] + ' at index: ' + i);
	          }
	        }
	      }
	      return this;
	    }
	  }, {
	    key: 'export',
	    value: function _export() {
	      var table = this.table;

	      var states = Object.keys(table),
	          stateRemap = {},
	          eventRemap = {},
	          events = {},
	          transitions = [],
	          json = [];

	      var stateId = function stateId(state) {
	        return function () {
	          return stateRemap[state];
	        };
	      },
	          eventId = function eventId(event) {
	        return function () {
	          return eventRemap[event];
	        };
	      };

	      states.forEach(function (state, i) {
	        stateRemap[state] = i;
	        state = table[state];
	        var keys = Object.keys(state);
	        if (keys.length) {
	          (function () {
	            var transition = [i];
	            keys.forEach(function (key) {
	              var states = state[key];
	              var keys = Object.keys(states);
	              if (keys.length) {
	                (function () {
	                  var event = key;
	                  keys.forEach(function (key) {
	                    if (states[key]) {
	                      events[event] = true;
	                      transition.push(eventId(event), stateId(key));
	                    }
	                  });
	                })();
	              };
	            });
	            transitions.push.apply(transitions, transition);
	          })();
	        };
	      });

	      events = Object.keys(events);
	      var offset = states.length + transitions.length;
	      events.forEach(function (event, i) {
	        return eventRemap[event] = i + offset;
	      });
	      json.push.apply(json, _toConsumableArray(states));
	      json.push.apply(json, transitions);
	      json.push.apply(json, _toConsumableArray(events));
	      return json.map(function (i) {
	        return typeof i === 'function' ? i() : i;
	      });
	    }
	  }, {
	    key: 'toJSON',
	    value: function toJSON() {
	      return this.export();
	    }
	  }]);

	  return Generator;
	}();

	exports.default = Generator;
	exports.FSMGenerator = Generator;

/***/ }
/******/ ])));