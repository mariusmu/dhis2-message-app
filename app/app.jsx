import React from 'react';
import ReactDom from 'react-dom';
import {Router, Link, Route, browserHistory} from 'react-router';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux' 
import thunk from 'redux-thunk';

import {rootReducer} from './Reducers/root.reducer'
import Login from 'components/Login/Login';
import oAuth from 'components/oAuth/oAuth';
import Message from 'components/Message/Message'

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

const history = syncHistoryWithStore(browserHistory, store);


/**
 * Route different urls to different Components
 */
ReactDom.render((
   <Provider store={store}>
    <Router history={history}>
        <Route path="/" component={oAuth}/>
        <Route path="login" component={Login}/>
        <Route path="message" component={Message}/>
    </Router>
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



require("./Style/main.less");
