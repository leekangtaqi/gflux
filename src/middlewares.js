export const thunk = store => next => action =>
    typeof action === 'function'?
    action(store.dispatch, store.getState) :
    next(action)
    
export const vanillaPromise = store => next => action => {
    if(typeof action.then !== 'function'){
        return next(action);
    }
    return Promise.resolve(action).then(store.dispatch);
}

export const timeoutScheduler = store => next => action =>{
    if(!action.meta || !action.meta.delay){
        return next(action);
    }
    
    var timeoutId = setTimeout(
        ()=>next(action)
        , action.meta.delay
    )
    
    return function cancel(){
       clearTimeout(timeoutId);
    }  
}