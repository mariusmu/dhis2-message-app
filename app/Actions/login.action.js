import ApiService from 'services/ApiService';
import SecretConstants from 'constants/SecretConstants';
import UrlConstants from 'constants/UrlConstants';
import ActionConstants from 'constants/ActionConstants';
import PersistanceService from 'services/PersistanceService';

function isNull(variable) {
    if (!variable || typeof(variable) === "undefined") return true;
    return false;
}


export const loginUser = (username, password, cid) => dispatch => {
    const b64 = new Buffer(cid + ":"+SecretConstants.OAUTH_SECRET).toString("base64");
    const formObj = {
        grant_type: "password",
        username: username,
        password: password
    };
    console.log(username, password, cid);
    ApiService.unauthenticatedFormPost(formObj, UrlConstants.loginUrl, b64)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
           console.log(err);
    });
}
