import React from 'react';
import ReactDom from 'react-dom';
import {Router, Link, Route, browserHistory} from 'react-router';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux' 
import thunk from 'redux-thunk';
import LoginReducer from './Reducers/login.reducer';

import Next from 'components/Next';

function mapStateToProps (state,props) {
    return {
        id: props.params.id,
        filter: props.location.query.filter
    };
}

const middleWare = [thunk];

const store = createStore (
    combineReducers({
        oAuthToken : LoginReducer,
        routing: routerReducer
        }),
    applyMiddleware(...middleWare));

const history = syncHistoryWithStore(browserHistory, store);


/**
 * Route different urls to different Components
 */
ReactDom.render((
   <Provider store={store}>
    <Router history={history}>
        <Route path="/" component={Next}/>
    </Router>
    </Provider>
), document.getElementById("app"));

/**
 * Not sure if this is needed. Has been before
 */
if(module.hot) {
    module.hot.accept();
};

require("./Style/main.less");
