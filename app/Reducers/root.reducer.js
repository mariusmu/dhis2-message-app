import {combineReducers} from "redux";

import MessageReducer from "./message.reducer";
import userReducer from "./user.reducer";

export var rootReducer = combineReducers({
    messages: MessageReducer,
    users: userReducer
});