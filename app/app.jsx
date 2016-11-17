import React from 'react';
import ReactDom from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import {rootReducer} from './Reducers/root.reducer'
import Message from 'components/Message/Message'
import WriteMessage from 'components/Message/WriteMessage/WriteMessage';

function mapStateToProps (state,props) {
    return {
        id: props.params.id,
        filter: props.location.query.filter
    };
}

const middleWare = [thunk];

const store = createStore (
    rootReducer,
    applyMiddleware(...middleWare));


function findAction() {
        let url = window.location.href;
        let actionIndex = url.lastIndexOf(".action");
        let lastTrailling = url.substring(0, actionIndex).lastIndexOf("/");
        return url.substring(lastTrailling + 1, actionIndex);
    }


let action = findAction();
let activeComponent = <div/>;
switch(action) {
    case "readMessage":
        activeComponent = <Message/>;
        break
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
    
     module.hot.accept('reducers/root.reducer', () => {
         console.warn("Hot module repl");   
      let newRootReducer = require('./Reducers/root.reducer').rootReducer;
      console.log("Store", store);
      store.replaceReducer(newRootReducer);
    });
};



//require("./Style/main.less");
