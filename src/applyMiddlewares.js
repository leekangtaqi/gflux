import {compose} from './compose';

export function applyMiddlewares(...middlewares){
    return (createStore)=>(...args)=>{
        var store = createStore.apply(null, args);
        var dispatch = store.dispatch;
        var middlewareAPI = {
            getState: store.getState,
            dispatch: dispatch
        }
        
        var chain = middlewares.map(middleware=>middleware(middlewareAPI))
        
        dispatch = compose(...chain)(dispatch);
        return Object.assign({}, store, {dispatch: dispatch});
    }
} 