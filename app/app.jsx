import React from 'react';
import ReactDom from 'react-dom';

import Page from './Components/Page';


/**
 PDF
 <Pdf src={'http://localhost:8082/api/reportTables/SEMVWsnVblY/data.pdf'}>
 <Viewer />
 </Pdf>
 */

//inject Page component
ReactDom.render((
    <Page/>
), document.getElementById("app"));


/**
 * Not sure if this is needed. Has been before
 */
if(module.hot) {
    module.hot.accept();
}  