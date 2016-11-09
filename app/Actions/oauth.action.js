import ApiService from 'services/ApiService';
import SecretConstants from 'constants/SecretConstants';
import UrlConstants from 'constants/UrlConstants';
import ActionConstants from 'constants/ActionConstants';
import PersistanceService from 'services/PersistanceService';

/**
 * Not actually neccessary as it should be created before
 * use
 */
export const createOAuthClient = (username, password, cid, name) => dispatch => {
    const b64 = new Buffer(username + ":"+password).toString("base64");
    const oAuthObj = {
        name: name,
        cid : cid,
        secret: SecretConstants.OAUTH_SECRET,
           "grantTypes" : [
                "password",
                 "refresh_token",
                "authorization_code"
        ],
        redirectUris: [
        ]
    };
    ApiService.unauthenticatedPost(oAuthObj, UrlConstants.loginGrantUrl, b64)
        .then(res => {
            console.log(res);
            const token = res.response.uid;
            PersistanceService.persistClientToken(cid);
            dispatch({type: ActionConstants.OAUTH_CLIENT_CREATED, token: cid})})
        .catch(err => {
            dispatch({type: ActionConstants.OAUTH_CLIENT_ERROR, error: err.response.body.response.errorReports})
    });


}
export const checkForOAuth = () => dispatch => {
    const token = PersistanceService.getClientToken();
    if (token) dispatch({type: ActionConstants.OAUTH_CLIENT_CREATED, token :token});
}
export const logOut = () => dispatch => {
    PersistanceService.deleteClientToken();
    dispatch({type: ActionConstants.OAUTH_CLIENT_DELETED})
}