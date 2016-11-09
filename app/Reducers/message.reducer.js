import ActionConstants from 'constants/ActionConstants';
import InitialState from './InitialState';

module.exports = function (state = [], action) {
    switch (action.type) {
        case ActionConstants.FETCH_MESSAGES_OK:
            return Object.assign({}, state, {
                pager: action.pager
            });

        case ActionConstants.FETCH_ONE_MESSAGE_OK:
            if (action.message.id) {
                return Object.assign({}, state, {
                    messages: state.messages.concat(action.message)
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
            return Object.assign({}, state, {
                messages: [],
                messages_error: [],
                pager: null,
                selected_message: null
            });

    }
}