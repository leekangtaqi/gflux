'use strict';

var _createStore = require('./createStore');

var _combineReducers = require('./combineReducers');

var _compose = require('./compose');

var _applyMiddlewares = require('./applyMiddlewares');

var _middlewares = require('./middlewares');

var middlewares = _interopRequireWildcard(_middlewares);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var createStoreWithMiddleware = (0, _applyMiddlewares.applyMiddlewares)(logger, middlewares.thunk)(_createStore.createStore);

function logger(store) {
    return function (next) {
        return function (action) {
            console.log("action begin " + action);
            var result = next(action);
            console.log('state is ' + JSON.stringify(store.getState()));
            return result;
        };
    };
}

var store = createStoreWithMiddleware((0, _combineReducers.combineReducers)({ todos: todos, filter: filter }));

function todos() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
    var action = arguments[1];

    if (action && action.type) {
        switch (action.type) {
            case 'add':
                return Object.assign([].concat(_toConsumableArray(state), [action.text]));
            case 'async':
                //..do some async
                return state;
            default:
                return state;
        }
    } else {
        return [];
    }
}
function filter() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
    var action = arguments[1];

    return 'all';
}

function addCreator(text) {
    return {
        type: 'add',
        text: text
    };
}

function asyncCreator(text) {
    return {
        type: 'async',
        text: text
    };
}

var state = {
    todos: [{
        text: '111'
    }, {
        text: '222'
    }],
    filter: 'all'
};

store.subscribe(function (state) {
    console.warn(state);
});

store.dispatch(addCreator('yyy'));
store.dispatch(function (dispatch) {
    setTimeout(function () {
        dispatch({
            type: 'add',
            text: 'async!!!!'
        });
    }, 3000);
});
store.dispatch(addCreator('xxx'));
store.dispatch(addCreator('hehe'));
store.dispatch(asyncCreator('async'));