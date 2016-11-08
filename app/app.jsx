import React from 'react';
import ReactDom from 'react-dom';
import {Router, Link, Route, browserHistory} from 'react-router';

import Start from './Components/Start'
import Next from './Components/Next'
import ShareButton from './Components/ShareButton';
import ShareModal from './Components/ShareModal';

/**
 * Route different urls to different Components
 */
ReactDom.render((
    <Router history={browserHistory}>
        <Route path="/" component={ShareButton}/>
        <Route path="next" component={Next}/>
        <Route path="modal" component={ShareModal}/>
    </Router>
), document.getElementById("app"));

/**
 * Not sure if this is needed. Has been before
 */
if(module.hot) {
    module.hot.accept();
}  