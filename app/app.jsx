import React from 'react';
import ReactDom from 'react-dom';
import {Router, Link, Route, browserHistory} from 'react-router';

import Start from './Components/Start'
import Next from './Components/Next';

/**
 * Route different urls to different Components
 */
ReactDom.render((
    <Router history={browserHistory}>
        <Route path="/" component={Start}/>
        <Route path="next" component={Next}/>
    </Router>
), document.getElementById("app"));

/**
 * Not sure if this is needed. Has been before
 */
if(module.hot) {
    module.hot.accept();
}  