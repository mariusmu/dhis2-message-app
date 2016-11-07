import React from 'react';
import ReactDom from 'react-dom';
import {Router, Link, Route, browserHistory} from 'react-router';

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux' 
import MessageReducer from './Reducers/message.reducer';

import StartComponent from './Components/Start'
import Next from './Components/Next';

function mapStateToProps (state,props) {
    return {
        id: props.params.id,
        filter: props.location.query.filter
    };
}

const store = createStore(combineReducers({
    start : MessageReducer,
    routing: routerReducer
}));

const history = syncHistoryWithStore(browserHistory, store);


/**
 * Route different urls to different Components
 */
ReactDom.render((
   <Provider store={store}>
    <Router history={history}>
        <Route path="/" component={StartComponent}/>
        <Route path="next" component={Next}/>
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
