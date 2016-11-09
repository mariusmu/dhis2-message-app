import React from 'react';

class LoggedIn extends React.Component {
    render() {
        <div className="container">
            <h1>You are logged in</h1>
            <button onClick={this.props.logOut} className="btn btn-primary">Log out</button>
        </div>
    }
}

module.exports = LoggedIn;