import ActionConstants from "../Constants/ActionConstants";
import InitialState from "./InitialState";

module.exports = function (state = InitialState.users, action) {
    switch (action.type) {
        
    case ActionConstants.FETCH_USER_PORTION_OK:
        return Object.assign({}, state, {
            userPager: action.pager,
            users: state.users.concat(action.users),
            userFetchStatus: "OK"
        });
    default:
        return state;
    }
};