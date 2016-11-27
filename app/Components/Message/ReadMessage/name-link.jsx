import React from 'react';

class NameLink extends React.Component {
    render() {
        return(
            <a className="userLink" href={"profile.action?id=" + this.props.name.id}>{this.props.name.displayName}</a>
        );
    }
}

module.exports = NameLink;