var EventEmitter = require('events').EventEmitter;

exports.createStore = function(bootFn){
    var state = bootFn();
    return {
        emitter: new EventEmitter(),
        state: state,
        dispatch: function(action){
            this.state = bootFn(this.state, action);
            this.emitter.emit('all', this.state);
        },
        subscribe: function(state){
            this.emitter.on('all', state);
        },
        getState: function(){return this.state}
    }
}
