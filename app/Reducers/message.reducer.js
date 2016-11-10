import ActionConstants from 'constants/ActionConstants';
import InitialState from './InitialState';

module.exports = function (state = InitialState.messages, action) {
    switch (action.type) {
        case ActionConstants.FETCH_MESSAGES_OK:
            console.log("Messages are fetched");
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

        case ActionConstants.FETCH_CONVERSATIONS_OK:
            if (action.messages) {
                let messageArr = state.messages.slice(0);
                
                /** Find the correct message in the state message array 
                 * Then assign a conversation field with 
                 */
                messageArr.filter(val => { return val.id == action.messageId})
                    [0].conversations = action.messages;
                    
                return Object.assign({}, state, {
                    messages: messageArr
                });
            }

        case ActionConstants.SELECT_MESSAGE:
            if (action.id) {
                return Object.assign({}, state, {
                    selected_message: action.id
                });
            }
        case ActionConstants.UNSELECT_MESSAGE:
            return Object.assign({}, state, {
                selected_message: null
            });
        default:
            return state;

    }
}