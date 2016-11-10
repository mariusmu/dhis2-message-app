import ApiService from 'services/ApiService';
import SecretConstants from 'constants/SecretConstants';
import UrlConstants from 'constants/UrlConstants';
import ActionConstants from 'constants/ActionConstants';
import async from 'async';

const token = "7b4df143-52bf-4cab-b0ef-38ba94d30e2f";
export const fetchAllMessages = () => dispatch => {

    return ApiService.authenticatedGet(UrlConstants.messagesUrl + "?fields=:all", token)
        .then(res => {
            const parsedBody = JSON.parse(res);
            dispatch(
                { 
                    type: ActionConstants.FETCH_MESSAGES_OK, 
                    pager: parsedBody.pager, 
                    messages: parsedBody.messageConversations 
                });
            
            return null;
        })
        .catch(err => { throw err; });
}

export const fetchAllConversations = (messageId) => dispatch => {
    return ApiService.authenticatedGet(UrlConstants.messagesUrl + "/" + messageId + "/messages", token)
        .then(res => {
            const parsedBody = JSON.parse(res);
            if(parsedBody) {
                dispatch (
                    {
                        messageId: messageId,
                        type: ActionConstants.FETCH_CONVERSATIONS_OK, 
                        messages: parsedBody.messages
                    });
            }
        })
        .catch(err => { throw err; });
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