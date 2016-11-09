import InitialState from './InitialState';
import ActionConstants from 'constants/ActionConstants';

module.exports = function(state = [], action) {
    switch(action.type) {
        case ActionConstants.OAUTH_CLIENT_CREATED :
            return Object.assign({}, state, 
            {
                oAuthStatus: "OK",
                oAuthClientId: action.token,
                oAuthError: []
            });   

        case ActionConstants.OAUTH_CLIENT_ERROR :
            return Object.assign({}, state, 
            {
                oAuthStatus: "NOTOK",
                oAuthClientId: null, 
                oAuthError: action.error
            });   

        default:
            return Object.assign({}, state, 
            {
                oAuthStatus: "NOTOK",
                oAuthClientId: null, 
                oAuthError: []
            });
        }
}