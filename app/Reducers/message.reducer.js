import ActionConstants from "../Constants/ActionConstants";
import InitialState from "./InitialState";

module.exports = function (state = InitialState.messages, action) {
    switch (action.type) {
    case ActionConstants.FETCH_MESSAGES_OK:
        return Object.assign({}, state, {
            pager: action.pager,
            messages: action.messages
        });

    case ActionConstants.FETCH_ONE_MESSAGE_OK:
        if (action.message.id) {
            return Object.assign({}, state, {
                messages: state.messages.concat(action.message)
            });
        }
        break;

    case ActionConstants.FETCH_CONVERSATIONS_OK:
        if (action.messages) {
            let messageArr = state.messages.slice(0);
            
            /** Find the correct message in the state message array 
             * Then assign a conversation field with 
             */
            let message = messageArr.filter(val => 
                { return val.id == action.messageId; })[0];
            if(message) {
                message.conversations = action.messages;
            } else {
                message = action.fullMessage;
                messageArr = messageArr.concat(message);
            }
                
            return Object.assign({}, state, {
                messages: messageArr
            });
        }
        break;
    case ActionConstants.CONVERSATION_POST_ERROR:
        return Object.assign({}, state, {
            conversation_post_error: action.error
        });
    case ActionConstants.SELECT_MESSAGE:
        if (action.id) {
            return Object.assign({}, state, {
                selected_message: action.id
            });
        }
        break;
    case ActionConstants.UNSELECT_MESSAGE:
        return Object.assign({}, state, {
            selected_message: null
        });
    default:
        return state;

    }
};