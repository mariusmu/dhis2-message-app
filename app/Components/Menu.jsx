/**
 * Created by ophelie on 18/11/2016.
 */

import React from 'react';


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
                        <a id="maps" href="#Maps" onClick={this.handleChanges.bind(this)}>Maps</a>
                    </li>
                    <li>
                        <a id="charts" href="#Charts" onClick={this.handleChanges.bind(this)}>Charts</a>
                    </li>
                    <li>
                        <a id="reportTables" href="#Pivot" onClick={this.handleChanges.bind(this)}>Pivot Table</a>
                    </li>
                    <li>
                        <a id="about" href="#About" onClick={this.handleChanges.bind(this)}>About</a>
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