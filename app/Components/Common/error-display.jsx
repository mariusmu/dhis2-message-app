import React from 'react';

class ErrorDisplay extends React.Component {

    componentDidMount() {
        console.log("Component was mounted");
    }
    componentWillReceiveProps(){
        console.log("Error will receive props");    
    }
    render() {
        return(<li className="warning">{this.props.error.message}</li>);
    }
}

module.exports = ErrorDisplay;

