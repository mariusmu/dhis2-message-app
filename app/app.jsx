import React from 'react';
import ReactDom from 'react-dom';
import {Router, Link, Route, browserHistory} from 'react-router';

import Page from './Components/Page';

/**
 * Route different urls to different Components
 * <Router history={browserHistory}>
 <Route path="/" component={ShareButton}/>
 <Route path="next" component={Next}/>

 <Route path="charts" component={Next}/>
 <Route path="maps" component={Next}/>
 </Router>
 */


ReactDom.render((
    <Page/>
), document.getElementById("app"));

/**
 * Not sure if this is needed. Has been before
 */
if(module.hot) {
    module.hot.accept();
}  