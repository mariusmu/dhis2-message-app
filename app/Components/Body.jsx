/**
 * Created by ophelie on 18/11/2016.
 */

import React from 'react';
import Parent from './Parent';
import About from './About';

/**
 * Body page content component
 */
class Body extends React.Component {
    constructor(props) {
        super(props);
        this.state = {type:this.props.type};
    }
    render(){
        //about page
        if(this.state.type === "about"){
            return(
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <About/>
                    </div>
                </div>
            );
        }
        //data (maps/charts/reportTables) page
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

    /**
     * when receiving type update from Page, set type state to update view
     * @param nextProps
     */
    componentWillReceiveProps(nextProps){
        this.setState({type:nextProps.type});
    }

}


module.exports = Body;