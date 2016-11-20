/**
 * Created by ophelie on 18/11/2016.
 */

import React from 'react';
import Parent from './Parent';


class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {type:this.props.type};
    }
    render(){
        return(
        <div id="page-content-wrapper">
            <div className="container-fluid">

                <Parent type={this.state.type} key={Math.random}/>

                <div className="fb-messengermessageus"
                     messenger_app_id="1409544869075027"
                     page_id="207194423062400"
                     color="blue"
                     size="standard" >
                </div>

                <div className="fb-send" data-href="https://play.dhis2.org/demo/api/maps/ZBjCfSaLSqD/data"></div>

                <div className="fb-like" data-href="https://www.facebook.com/DHIS-Community-207194423062400/" data-layout="standard" data-action="like" data-size="large" data-show-faces="true" data-share="true"></div>

            </div>
        </div>
        );
    }
    componentWillReceiveProps(nextProps){
        console.log("NIQUUE");
        this.setState({type:nextProps.type});
    }

}


module.exports = Body;