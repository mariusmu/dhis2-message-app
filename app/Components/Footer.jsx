/**
 * Created by ophelie on 18/11/2016.
 */

import React from 'react';


class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render(){
        return(

            <footer className="footer">
                <div className="container">
                    <p className="text-muted">Place sticky footer content here.</p>
                </div>
            </footer>

        );
    }

}

module.exports = Footer;