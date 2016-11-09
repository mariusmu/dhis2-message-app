
import React from 'react';

class OAuthCreated extends React.Component {
    render() {
        return (
            <div>
                <h1>You are logged in width id {this.props.clientId}</h1>
                <a onClick={this.props.logOut}>Log out</a>
            </div>
        )
    }
}

module.exports = OAuthCreated;