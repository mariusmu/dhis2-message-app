import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import MessageReducer from './message.reducer'
import LoginReducer from './login.reducer';
import oAuthReducer from './oauth.reducer';

export var rootReducer = combineReducers({
        oAuthClient : oAuthReducer,
        login: LoginReducer,
        routing: routerReducer,
        messages: MessageReducer
});