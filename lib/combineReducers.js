/**
 *
 * @param reducers Functions
 */
exports.combineReducers = function(reducers){
    return (state, action)=>
        Object.keys(reducers)
            .map(key=> ({
                key: key,
                state: reducers[key](state && state[key] || undefined, action)}))
                .reduce((prev, curr)=>
                    (prev[curr.key] = curr.state) && prev, {})
};
