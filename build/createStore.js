'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.createStore = createStore;
var ActionTypes = exports.ActionTypes = {
    INIT: 'init'
};

function createStore(reducer, initialState, enhancer) {
    if (typeof initialState === 'function' && typeof enhancer === 'undefined') {
        enhancer = initialState;
        initialState = undefined;
    }

    if (typeof enhancer !== 'undefined') {
        if (enhancer !== 'function') {
            throw new Error('Expected the enhancer must be a function');
        }
        return enhancer(createStore)(reducer, initialState);
    }

    if (typeof reducer !== 'function') {
        throw new Error('Expected the reducer must be a function');
    }

    var currentReducer = reducer;
    var currentState = initialState;
    var currentListeners = [];
    var nextListeners = currentListeners;
    var isDispatching = false;

    function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) {
            nextListeners = currentListeners.slice();
        }
    }

    function isPlainObject(o) {
        return (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object' && !Array.isArray(o);
    }

    function getState() {
        return currentState;
    }

    function dispatch(action) {
        if (!isPlainObject(action)) {
            throw new Error('Actions must be plain objects' + 'Use custom middleware for async action');
        }

        if (typeof action.type === 'undefined') {
            throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
        }

        if (isDispatching) {
            throw new Error('Reducers may not dispatch actions');
        }

        try {
            isDispatching = true;
            currentState = currentReducer(currentState, action);
        } finally {
            isDispatching = false;
        }

        var listeners = currentListeners = nextListeners;
        listeners.forEach(function (listener) {
            return listener(currentState);
        });

        return action;
    }

    function subscribe(listener) {
        if (typeof listener !== 'function') {
            throw new Error('Expected listener to be a function.');
        }

        var isSubscribed = true;

        ensureCanMutateNextListeners();
        nextListeners.push(listener);

        return function unsubscibe() {
            if (!isSubscribed) {
                return;
            }
            isSubscribed = false;

            ensureCanMutateNextListeners();
            var index = nextListeners.indexOf(listener);
            nextListeners.splice(index, 1);
        };
    }

    function replaceReducer(reducer) {
        if (typeof reducer !== 'function') {
            throw new Error('Expected the nextReducer to be a function');
        }

        currentReducer = reducer;

        dispatch({ type: ActionTypes.INIT });
    }

    dispatch({ type: ActionTypes.INIT });

    return {
        dispatch: dispatch,
        subscribe: subscribe,
        getState: getState,
        replaceReducer: replaceReducer
    };
}