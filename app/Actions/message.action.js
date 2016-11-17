import ApiService from 'services/ApiService';
import SecretConstants from 'constants/SecretConstants';
import UrlConstants from 'constants/UrlConstants';
import ActionConstants from 'constants/ActionConstants';
import async from 'async';


const token = null;

export const fetchOneMessage = (messageId) => dispatch => {
    return ApiService.authenticatedGet(UrlConstants.messagesUrl + "/" + messageId, token)
        .then(res => {
            console.log(res);
            res.json().then(parsedBody => {
                if (parsedBody) {
                    dispatch(
                        {
                            type: ActionConstants.FETCH_ONE_MESSAGE_OK,
                            message: parsedBody
                        });
                }
            });
        })
        .catch(err => { throw err; });
};
export const fetchAllMessages = () => dispatch => {

    return ApiService.authenticatedGet(UrlConstants.messagesUrl + "?fields=:all", token)
        .then(res => {
            res.json().then(parsedBody => {
                dispatch(
                    {
                        type: ActionConstants.FETCH_MESSAGES_OK,
                        pager: parsedBody.pager,
                        messages: parsedBody.messageConversations
                    });

                return null;
            })
        })
        .catch(err => { console.log(err.message); });
}

export const fetchAllConversations = (messageId) => dispatch => {
    return ApiService.authenticatedGet(UrlConstants.messagesUrl + "/" + messageId + "/messages", token)
        .then(res => {
            res.json().then(parsedBody => {
                if (parsedBody) {
                    dispatch(
                        {
                            messageId: messageId,
                            type: ActionConstants.FETCH_CONVERSATIONS_OK,
                            messages: parsedBody.messages,
                            fullMessage: parsedBody
                        });
                }
            })
        })
        .catch(err => { throw err; });
}


export const postConversation = (messageId, message, internal, attachements) => dispatch => {
    const messageObj = {
        text: message,
        attachements: attachements
    };
    const stringified = JSON.stringify(messageObj);
    const baseUrl = UrlConstants.messagesUrl + "/" + messageId;
    const uri = internal ? baseUrl+"?internal=true" : baseUrl;

    return ApiService.authenticatedPost(stringified, uri, token)
        .then(res => {
            if (res.status != 201) {
                return dispatch({ type: ActionConstants.CONVERSATION_POST_ERROR, error: res.statusCode + " when posting conversation" });
            }
            dispatch({ type: ActionConstants.CONVERSATION_POST_OK });
        })
        .catch(err => {
            console.log(err);
            //TODO: Json parse error
            dispatch({ type: ActionConstants.CONVERSATION_POST_ERROR, error: err });
        });

}

export const selectMessage = (messageId) => dispatch => {
    dispatch(
        {
            type: ActionConstants.SELECT_MESSAGE,
            id: messageId
        });
}

export const unSelectMessage = () => dispatch => {
    dispatch(
        {
            type: ActionConstants.UNSELECT_MESSAGE
        });
}