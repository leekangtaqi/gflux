'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createStore = require('./createStore');

var _combineReducers = require('./combineReducers');

var _compose = require('./compose');

var _applyMiddlewares = require('./applyMiddlewares');

var _middlewares = require('./middlewares');

var middlewares = _interopRequireWildcard(_middlewares);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
    createStore: _createStore.createStore,
    combineReducers: _combineReducers.combineReducers,
    compose: _compose.compose,
    middlewares: middlewares
};