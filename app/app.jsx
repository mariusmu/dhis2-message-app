import React from "react";
import ReactDom from "react-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {rootReducer} from "./Reducers/root.reducer";
import Message from "./Components/Message/Message";
import WriteMessage from "./Components/Message/WriteMessage/write-message";

const middleWare = [thunk];

const store = createStore (
    rootReducer,
    applyMiddleware(...middleWare));


function findAction() {
    let url = window.location.href;
    let actionIndex = url.lastIndexOf(".action");
    let lastTrailling = url.substring(0, actionIndex).lastIndexOf("/");
    let uri = url.substring(lastTrailling + 1, actionIndex);
    return uri;
}


let action = findAction();
let activeComponent = <div/>;
switch(action) {
case "readMessage":
    activeComponent = <Message/>;
    break;
case "showSendMessage":
    activeComponent = <WriteMessage/>;
    break;
}
/**
 * Route different urls to different Components
 */
ReactDom.render((
    <Provider store={store}>
        {activeComponent}
   </Provider>
), document.getElementById("app"));

/**
 * Not sure if this is needed. Has been before
 */
if(module.hot) {
    require("./Style/main.less");
    module.hot.accept("reducers/root.reducer", () => {
        let newRootReducer = require("./Reducers/root.reducer").rootReducer;
        store.replaceReducer(newRootReducer);
    });
}
