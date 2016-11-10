import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import MessageReducer from './message.reducer'
import LoginReducer from './login.reducer';
import oAuthReducer from './oauth.reducer';
import userReducer from './user.reducer';

export var rootReducer = combineReducers({
        oAuthClient : oAuthReducer,
        login: LoginReducer,
        routing: routerReducer,
        messages: MessageReducer,
        users: userReducer
});