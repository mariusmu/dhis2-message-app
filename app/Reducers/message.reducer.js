import InitialState from './InitialState';

module.exports = function(state = InitialState, action) {
    switch(action.type) {
        case 'START' :
            return action.start;     
        default:
        return state;

    }
}