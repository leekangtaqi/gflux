"use strict";
const redux = require('./lib');
let createStore = redux.createStore;
let combineReducers = redux.combineReducers;
let compose =redux.compose;

function todos(state, action){
    if(action && action.type){
        switch (action.type){
            case 'add':
                return Object.assign([...state, action.text]);
            case 'async':
                //..do some async
                return state;
        }
    }else {
        return [];
    }
}
function filter(state, action){
    return 'all'
}

function addCreator(text){
    return {
        type: 'add',
        text: text
    }
}

function asyncCreator(text){
    return {
        type: 'async',
        text: text
    }
}

var state = {
    todos: [{
        text: '111'
    },
        {
            text: '222'
        }],
    filter: 'all'
};
var store = createStore(combineReducers({todos, filter}));

store.subscribe((state)=>{
    console.warn(state)
});

store.dispatch(addCreator('yyy'));
store.dispatch(addCreator('xxx'));
store.dispatch(addCreator('hehe'));
store.dispatch(asyncCreator('async'));
