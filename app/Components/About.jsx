/**
 * Created by ophelie on 21/11/2016.
 */

import React from 'react';
import { Row } from 'react-bootstrap';


class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render(){
        return(
            <div>
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

                <p>Send us a message</p>
                <div className="fb-messengermessageus"
                     messenger_app_id="1409544869075027"
                     page_id="207194423062400"
                     color="blue"
                     size="standard" >
                </div>
                <div className="fb-send" data-href="https://play.dhis2.org/demo/api/maps/ZBjCfSaLSqD/data"></div>

            </div>

        );
    }
}


module.exports = About;