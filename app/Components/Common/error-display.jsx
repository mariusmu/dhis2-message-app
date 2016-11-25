import React from 'react';

/**
 * Common error display component
 */
class ErrorDisplay extends React.Component {

    render() {
        return(<li className="warning">{this.props.error.message}</li>);
    }
}

module.exports = ErrorDisplay;

