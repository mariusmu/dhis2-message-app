import ApiService from 'services/ApiService';
import SecretConstants from 'constants/SecretConstants';
import UrlConstants from 'constants/UrlConstants';
import ActionConstants from 'constants/ActionConstants';
import async from 'async';

const getUsers = (message, token) => dispatch => {
    console.log("In get users");
    return ApiService.authenticatedGet(UrlConstants.userQuery + "/" + message.lastSender.id, token)
        .then(res => {
            message.lastSenderName = JSON.parse(res).displayName;
            dispatch({ type: ActionConstants.FETCH_ONE_MESSAGE_OK, message: message });
            return null;
        })
        .catch(lastUserResErr => { throw lastUserResErr });
}

const getMessageRest = (messages, token) => dispatch => {
    return messages.messageConversations.map((val, key) => {
        ApiService.authenticatedGet(UrlConstants.messagesUrl + "/" + val.id, token)
            .then(singleRes => {
                let singleMessage = JSON.parse(singleRes);
                getUsers(singleMessage, token)(dispatch);
                return null;
            })
            .catch(singleResErr => { throw singleResErr });
    });
}


export const fetchAllMessages = (token) => dispatch => {
    const token = "4551a0de-785e-4715-a3d5-f502c310715f";
    return ApiService.authenticatedGet(UrlConstants.messagesUrl, token)
        .then(res => {
            const parsedBody = JSON.parse(res);
            dispatch({ type: ActionConstants.FETCH_MESSAGES_OK, pager: parsedBody.pager });
            getMessageRest(parsedBody, token)(dispatch);
            return null;
        })
        .catch(err => { throw err; });
}

export const selectMessage = (messageId) => dispatch => {
    dispatch({type: ActionConstants.SELECT_MESSAGE, id: messageId});
}

export const unSelectMessage = () => dispatch => {
    dispatch({type: ActionConstants.UNSELECT_MESSAGE});
}