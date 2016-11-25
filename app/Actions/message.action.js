import ApiService from '../Services/ApiService';
import SecretConstants from '../Constants/SecretConstants';
import UrlConstants from '../Constants/UrlConstants';
import ActionConstants from '../Constants/ActionConstants';
import async from 'async';


const token = "ecf5ab14-743f-4b93-a2c8-f0887b67fa11";

/**
 * Fetch a message
 * @param{String} messageId the id of the message
 * @return{Promise}
 * Will dipatch the promise result to the message reducer
 */
export const fetchOneMessage = (messageId) => dispatch => {
    return ApiService.authenticatedGet(UrlConstants.messagesUrl + "/" + messageId, token)
        .then(res => {
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
        .catch(err => dispatch({
                type: ActionConstants.FETCH_ONE_MESSAGE_ERROR,
                error: err
        }));
};

/**
 * Fetch all messages of a user
 * @return{Promise}
 * Will dispatch the result to the message reducer
 */
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
        .catch(err => dispatch({
                type: ActionConstants.FETCH_MESSAGES_ERROR,
                error: err
        }));
}

/**
 * Fetch all conversations for a message
 * @param{String} messageId the id of the message
 * @return{Promise}
 * Will dispatch the result to the message reducer
 */
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
        .catch(err => dispatch({
                type: ActionConstants.FETCH_CONVERSATIONS_ERROR,
                error: err
        }));
}

/**
 * Post a conversation to the api
 * @param{String} messageId the id of the message
 * @param{String} message the raw text message
 * @param{Boolean} internal if this should be posted as an internal message
 * @param{Array} attachements array of the attachements to the conversation
 * @return{Promise}
 * Will dispatch the result to the message reducer
 */
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
                return dispatch(
                    { type: ActionConstants.CONVERSATION_POST_ERROR, 
                        error: res.statusCode + " when posting conversation" });
            }
            dispatch({ type: ActionConstants.CONVERSATION_POST_OK });
        })
        .catch(err => {
            dispatch({ type: ActionConstants.CONVERSATION_POST_ERROR, error: err });
        });

}

/**
 * Select one message 
 * @param{String} messageId the id of the message
 * Will dispatch to the message reducer
 */
export const selectMessage = (messageId) => dispatch => {
    dispatch(
        {
            type: ActionConstants.SELECT_MESSAGE,
            id: messageId
        });
}

/**
 * Unselect a message
 * Will unselect the message
 */
export const unSelectMessage = () => dispatch => {
    dispatch(
        {
            type: ActionConstants.UNSELECT_MESSAGE
        });
}