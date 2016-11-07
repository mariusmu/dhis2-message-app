import InitialState from './InitialState';
import ActionConstants from 'constants/ActionConstants';

module.exports = function(state = [], action) {
    switch(action.type) {
        case ActionConstants.OAUTH_CLIENT_CREATED :
            return action.token;   
        case ActionConstants.OAUTH_CLIENT_ERROR :
            return "err";
        default:
        return "Not added";

    }
}