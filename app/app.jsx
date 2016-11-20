import React from 'react';
import ReactDom from 'react-dom';
//import {Router, Link, Route, browserHistory} from 'react-router';

import ShareButton from './Components/ShareButton';
import Parent from './Components/Parent';

/**
 * Route different urls to different Components
 * <Router history={browserHistory}>
 <Route path="/" component={ShareButton}/>
 <Route path="next" component={Next}/>
 </Router>
 */

ReactDom.render((
    <Parent/>
), document.getElementById("imgGen"));

/**
 * Not sure if this is needed. Has been before
 */
if(module.hot) {
    module.hot.accept();
}  