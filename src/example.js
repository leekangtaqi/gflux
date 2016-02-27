import {createStore} from './createStore';
import {combineReducers} from './combineReducers';
import {compose} from './compose';
import {applyMiddlewares} from './applyMiddlewares';
import * as middlewares from './middlewares';

let createStoreWithMiddleware = applyMiddlewares(logger, middlewares.thunk)(createStore);

function logger(store){
    return (next)=>(action)=>{
        console.log("action begin " + action);
        var result = next(action);
        console.log('state is ' + JSON.stringify(store.getState()));
        return result;
    }
}

let store = createStoreWithMiddleware(combineReducers({todos, filter}));

function todos(state=[], action){
    if(action && action.type){
        switch (action.type){
            case 'add':
                return Object.assign([...state, action.text]);
            case 'async':
                //..do some async
                return state;
            default: 
                return state;
        }
    }else {
        return [];
    }
}
function filter(state='', action){
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

store.subscribe((state)=>{
    console.warn(state)
});

store.dispatch(addCreator('yyy'));
store.dispatch((dispatch)=>{
    setTimeout(
        ()=>{
            dispatch({
                type: 'add',
                text: 'async!!!!'
            })    
        }, 3000)
})
store.dispatch(addCreator('xxx'));
store.dispatch(addCreator('hehe'));
store.dispatch(asyncCreator('async'));