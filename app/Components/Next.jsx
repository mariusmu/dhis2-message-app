import React from 'react';
import {createOAuthClient} from "actions/login.action";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
 

class Next extends React.Component {
    
    constructor() {
        super();
        this.state = {};
        this.state.login = [];
        this.createOAuth = this.createOAuth.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
    }
    render() {
        return (
            
            <div>
                Status: {this.props.oAuthToken}
                <h1>Create an oAuthClient</h1>
                <button onClick={this.createOAuth} className="btn btn-primary">Add client</button>
            </div>
        );
    }

    createOAuth() {
        createOAuthClient("admin", "district")(this.props.dispatch);
    }
}

module.exports = Next; 

function mapStateToProps(state) {
    return {oAuthToken: state.oAuthToken};
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({createOAuthClient}, dispatch);
// }
module.exports = connect(mapStateToProps)(Next);