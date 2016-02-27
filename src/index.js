import {createStore} from './createStore';
import {combineReducers} from './combineReducers';
import {compose} from './compose';
import {applyMiddlewares} from './applyMiddlewares';
import * as middlewares from './middlewares';

export default {
    createStore,
    combineReducers,
    compose,
    middlewares
};

