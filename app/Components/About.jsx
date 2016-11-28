/**
 * Created by ophelie on 21/11/2016.
 */

import React from 'react';
/**
 * About page content component
 */
class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render(){
        var html =  "<div class='fb-messengermessageus' messenger_app_id='1409544869075027'page_id='207194423062400'color='blue'size='large' ></div>"
        return(
            <div>
                <div id="fb-root"></div>
                <h1>About Dhis2 social app</h1>
                <p>This project is part of the course INF5750 at UiO University, 2016.</p>
                <p>Developed by:</p>
                <ul>
                    <li>Marius Munthe-kaas</li>
                    <li>Julien Vedrenne</li>
                    <li>Ophélie André</li>
                </ul>

                <p>Follow us on Facebook</p>

                <div className="fb-like" data-href="https://www.facebook.com/DHIS-Community-207194423062400/" data-layout="standard" data-action="like" data-size="large" data-show-faces="true" data-share="true"></div>
                <p>Contact us on Facebook</p>
                <div dangerouslySetInnerHTML = {{__html: html}} />
            </div>
        );
    }
    /**
     * allows to display special fb buttons
     */
    componentDidMount(){
        FB.XFBML.parse();
    }
}


module.exports = About;