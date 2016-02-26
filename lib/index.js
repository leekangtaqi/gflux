var createStore = require('./createStore').createStore;
var combineReducers = require('./combineReducers').combineReducers;
var compose = require('./compose').compose;

module.exports = {
    createStore,
    combineReducers,
    compose
};
