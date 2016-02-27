'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var thunk = exports.thunk = function thunk(store) {
    return function (next) {
        return function (action) {
            return typeof action === 'function' ? action(store.dispatch, store.getState) : next(action);
        };
    };
};

var vanillaPromise = exports.vanillaPromise = function vanillaPromise(store) {
    return function (next) {
        return function (action) {
            if (typeof action.then !== 'function') {
                return next(action);
            }
            return Promise.resolve(action).then(store.dispatch);
        };
    };
};

var timeoutScheduler = exports.timeoutScheduler = function timeoutScheduler(store) {
    return function (next) {
        return function (action) {
            if (!action.meta || !action.meta.delay) {
                return next(action);
            }

            var timeoutId = setTimeout(function () {
                return next(action);
            }, action.meta.delay);

            return function cancel() {
                clearTimeout(timeoutId);
            };
        };
    };
};