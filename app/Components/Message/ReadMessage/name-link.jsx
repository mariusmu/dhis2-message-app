import React from 'react';

class NameLink extends React.Component {
    render() {
        return(
            <a className="userLink">{this.props.name.displayName}</a>
        )
    }
}

module.exports = NameLink;