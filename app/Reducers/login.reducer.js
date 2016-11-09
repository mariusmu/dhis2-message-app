import ActionConstants from 'constants/ActionConstants';

module.exports = function(state = [], action) {
    switch(action.type) {
        case ActionConstants.LOGIN_SUCCESS :
            return Object.assign({}, state, 
            {
                login_status: "OK",
                refresh_token: action.token,
                login_errors: []
            });   

        case ActionConstants.LOGIN_ERROR:
            return Object.assign({}, state, 
            {
                login_status: "NOTOK",
                refresh_token: null,
                login_errors: action.error
            });   

        default:
            return Object.assign({}, state, 
            {
                login_status: "NOTOK",
                refresh_token: null,
                login_errors: []
            });   
        }
}