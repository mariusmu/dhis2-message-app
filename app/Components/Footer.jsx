/**
 * Created by ophelie on 18/11/2016.
 */

import React from 'react';

/**
 * footer components
 */
class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render(){
        return(
            <footer className="footer">
                <div className="container">
                    <p className="text-muted">DHIS2 social app. 2016.</p>
                </div>
            </footer>
        );
    }s
}

module.exports = Footer;