/**
 * Created by ophelie on 18/11/2016.
 */

import React from 'react';
import Body from './Body';
import Menu from './Menu';
import Footer from './Footer';



class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {typeGraph:'maps'};
    }
    render(){
        return(
        <div id="wrapper" className="">

            <Menu onChange={this.updateGraphs.bind(this)}/>
            <Body type={this.state.typeGraph} key={Math.random}/>
            <Footer/>
        </div>
        );
    }
    updateGraphs(type){
        console.log(type);
        this.setState({typeGraph:type});
    }

}

module.exports = Page;