import ApiService from 'services/ApiService';
import UrlConstants from 'constants/UrlConstants';
import ActionConstants from 'constants/ActionConstants';

const token = "7b4df143-52bf-4cab-b0ef-38ba94d30e2f";
export const fetchAllUsers = () => dispatch => {
    return ApiService.authenticatedGet(UrlConstants.userQuery, token)
        .then(res => {
            const parsed = JSON.parse(res);
            
            dispatch(
                {
                    type: ActionConstants.FETCH_USER_PORTION_OK,
                    users: parsed.users,
                    pager: parsed.pager
                }
            )
        })
        .catch(err => console.log(err));
};