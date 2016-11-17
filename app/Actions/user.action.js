import ApiService from 'services/ApiService';
import UrlConstants from 'constants/UrlConstants';
import ActionConstants from 'constants/ActionConstants';

const token = null;
export const fetchAllUsers = () => dispatch => {
    return ApiService.authenticatedGet(UrlConstants.userQuery, token)
        .then(res => {
            console.log(res);
            res.json().then(parsedBody => {
                dispatch(
                    {
                        type: ActionConstants.FETCH_USER_PORTION_OK,
                        users: parsedBody.users,
                        pager: parsedBody.pager
                    }
                )})
        })
        .catch(err => console.log(err));
};