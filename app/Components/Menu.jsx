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
                        <a id="pivots" href="#Pivot">Pivot Table</a>
                    </li>
                    <li>
                        <a href="#About">About</a>
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