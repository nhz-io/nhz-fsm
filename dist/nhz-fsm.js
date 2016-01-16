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

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var isFunction = function isFunction(func) {
	  return typeof func === 'function';
	};
	var capitalize = function capitalize(s) {
	  return s[0].toUpperCase() + s.substr(1);
	};
	var assert = function assert(condition, message) {
	  if (!condition) {
	    throw new Error(message);
	  }
	  return condition;
	};
	var STATE = Symbol(),
	    TABLE = Symbol(),
	    STATES = Symbol(),
	    EVENTS = Symbol();

	var StateMachine = function () {
	  function StateMachine(json) {
	    var _this = this;

	    _classCallCheck(this, StateMachine);

	    assert(json, 'Missing configuration table');
	    var start = json.findIndex(function (i) {
	      return !isNaN(i);
	    }),
	        table = json.slice(start);

	    var end = table.findIndex(function (i) {
	      return isNaN(i);
	    });

	    var states = json.slice(0, start),
	        events = table.splice(end),
	        nstates = states.length,
	        nevents = events.length;

	    end += start;

	    this[STATE] = 0;
	    this[STATES] = states;
	    this[EVENTS] = events;
	    this[TABLE] = Array(nstates);

	    {
	      (function () {
	        var state = undefined,
	            event = undefined;
	        table.forEach(function (v, i) {
	          switch (true) {
	            case v < start:
	              if (event != null) {
	                event[v] = true;
	                event = null;
	              } else {
	                state = _this[TABLE][v] || (_this[TABLE][v] = Array(nevents));
	              }
	              break;
	            case v >= end:
	              v -= end;
	              event = state[v] || (state[v] = Array(nstates));
	              break;
	            default:
	              assert(false, 'Invalid value ' + v + ' in table at index ' + (i + start));
	          }
	        });
	      })();
	    }

	    Object.defineProperties(this, {
	      table: { enumerable: true, get: this.getTable.bind(this) },
	      state: { enumerable: true, get: this.getState.bind(this) }
	    });

	    events.forEach(function (e) {
	      return _this[e] = _this.triggerEvent.bind(_this, e);
	    });
	  }

	  _createClass(StateMachine, [{
	    key: 'getTable',
	    value: function getTable() {
	      return this[TABLE].map(function (s) {
	        return s.slice();
	      });
	    }
	  }, {
	    key: 'getState',
	    value: function getState() {
	      return this[STATES][this[STATE]];
	    }
	  }, {
	    key: 'triggerEvent',
	    value: function triggerEvent(eventName) {
	      var _this2 = this;

	      var event = undefined;
	      this[EVENTS].find(function (e, i) {
	        return e === eventName && ((event = i) || true);
	      });
	      assert(event != null, 'Missing event: ' + eventName);
	      var state = [this[STATE]];
	      var stateName = this[STATES][state];
	      state = this[TABLE][state];
	      event = assert(state[event], 'Event: ' + eventName + ' is invalid in state: ' + stateName);

	      event.find(function (s, i) {
	        if (s && _this2[STATE] !== i) {
	          var nextStateName = _this2[STATES][i];

	          var guard = _this2[stateName + '-' + eventName + '-' + nextStateName];
	          if (guard && (!isFunction(guard) || guard())) {
	            return false;
	          };

	          var leave = _this2['leave' + capitalize(stateName)];
	          if (leave && isFunction(leave)) {
	            leave.call(_this2);
	          }

	          _this2[STATE] = i;

	          var enter = _this2['enter' + capitalize(nextStateName)];
	          if (enter && isFunction(enter)) {
	            enter.call(_this2);
	          }

	          return true;
	        }
	      });

	      return this;
	    }
	  }]);

	  return StateMachine;
	}();

	exports.default = StateMachine;
	exports.FSM = StateMachine;

/***/ }
/******/ ])));