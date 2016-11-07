import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Start extends React.Component {
    
    constructor(props) {

        super(props);
        this.state = {};
        this.state.start = 0;
        this.click = this.click.bind(this);
    }

    render() {
        return (
            <div>{this.props.start}<br/>
            <button onClick={this.click}>DoClick</button>
            </div>);
    }

    click() {
        this.props.startActionCreator(2);
    }

    componentWillReceiveProps(props) {
        console.log("Got props");
        console.log(props);
    }

    componentDidMount() {
        console.log(this);
    }
}

function mapStateToProps(state) {
    console.log(state);
    return {start: state.start};
}

function startActionCreator(start) {
    return {
        type: 'START',
        start
    }
    
}

function mapDispatchToProps(dispatch) {
    if(dispatch == null) console.log("Dispatch == null");
    return bindActionCreators({startActionCreator}, dispatch);
}
console.log(mapDispatchToProps);
module.exports = connect(mapStateToProps, mapDispatchToProps)(Start);