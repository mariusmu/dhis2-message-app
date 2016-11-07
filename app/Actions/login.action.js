import ApiService from 'services/ApiService';
import SecretConstants from 'constants/SecretConstants';
import UrlConstants from 'constants/UrlConstants';
import ActionConstants from 'constants/ActionConstants';

function isNull(variable) {
    if (!variable || typeof(variable) === "undefined") return true;
    return false;
}

const options = {
    method : "POST",
    headers: {
        "Content-Type" : 'application/json'
    },
    json: true
}

export const createOAuthClient = (username, password) => dispatch => {
    const b64 = new Buffer(username + ":"+password).toString("base64");
    const oAuthObj = {
        name: SecretConstants.OAUTH_NAME,
        cid : SecretConstants.OAUTH_CID,
        secret: SecretConstants.OAUTH_SECRET,
        grantTypes: [
            "password"
        ],
        redirectUris: [
        ]
    };
    ApiService.unauthenticatedPost(oAuthObj, UrlConstants.loginGrantUrl, b64)
        .then(res => dispatch({type: ActionConstants.OAUTH_CLIENT_CREATED, token : res}))
        .catch(err => dispatch({type: ActionConstants.OAUTH_CLIENT_ERROR}));

}

export function logIn(username, password) {
    return request()
}