import ApiService from '../Services/ApiService';
import UrlConstants from '../Constants/UrlConstants';
import ActionConstants from '../Constants/ActionConstants';

const token = null;

/**
 * Fetch all user that the local user can see
 * @return{Promise}
 * Will dispatch the result tot the user reducer
 */
export const fetchAllUsers = () => dispatch => {
    return ApiService.authenticatedGet(UrlConstants.userQuery, token)
        .then(res => {
            res.json().then(parsedBody => {
                dispatch(
                    {
                        type: ActionConstants.FETCH_USER_PORTION_OK,
                        users: parsedBody.users,
                        pager: parsedBody.pager
                    }
                ); });
        })
        .catch(err => {
            dispatch({
                type: ActionConstants.FETCH_CONVERSATIONS_ERROR,
                error: err
            });
        });
};