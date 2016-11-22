/**
 * Created by ophelie on 18/11/2016.
 */

import React from 'react';
import Parent from './Parent';
import About from './About';


class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {type:this.props.type};
    }
    render(){

        if(this.state.type === "about"){
            return(
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <About/>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <Parent type={this.state.type} key={Math.random}/>
                    </div>
                </div>
            );
        }
    }
    componentWillReceiveProps(nextProps){
        console.log("NIQUUE");
        this.setState({type:nextProps.type});
    }

}


module.exports = Body;