"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.combineReducers = combineReducers;
/**
 *
 * @param reducers Functions
 */
function combineReducers(reducers) {
    return function (state, action) {
        return Object.keys(reducers).map(function (key) {
            return {
                key: key,
                state: reducers[key](state && state[key] || undefined, action) };
        }).reduce(function (prev, curr) {
            return (prev[curr.key] = curr.state) && prev;
        }, {});
    };
};