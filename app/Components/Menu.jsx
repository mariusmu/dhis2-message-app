/**
 * Created by ophelie on 18/11/2016.
 */

import React from 'react';
import {FormControl, FormGroup} from 'react-bootstrap';


class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render(){
        return(
            <div id="sidebar-wrapper">
                <ul className="sidebar-nav">
                    <li className="sidebar-brand">
                        <a href="#">
                            Share your data
                        </a>
                    </li>
                    <li>
                        <a id="maps" href="#" onClick={this.handleChanges.bind(this)}>Maps</a>
                    </li>
                    <li>
                        <a id="charts" href="#" onClick={this.handleChanges.bind(this)}>Charts</a>
                    </li>
                    <li>
                        <a id="reportTables" href="#" onClick={this.handleChanges.bind(this)}>Pivot Table</a>
                    </li>
                    <li>
                        <a id="about" href="#" onClick={this.handleChanges.bind(this)}>About</a>
                    </li>
                </ul>
            </div>
        );
    }
    handleChanges(ev){
        console.log(ev.target.id);
        this.props.onChange(ev.target.id);
    }

}


module.exports = Menu;