'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.applyMiddlewares = applyMiddlewares;

var _compose = require('./compose');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function applyMiddlewares() {
    for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
        middlewares[_key] = arguments[_key];
    }

    return function (createStore) {
        return function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            var store = createStore.apply(null, args);
            var dispatch = store.dispatch;
            var middlewareAPI = {
                getState: store.getState,
                dispatch: dispatch
            };

            var chain = middlewares.map(function (middleware) {
                return middleware(middlewareAPI);
            });

            dispatch = _compose.compose.apply(undefined, _toConsumableArray(chain))(dispatch);
            return Object.assign({}, store, { dispatch: dispatch });
        };
    };
}