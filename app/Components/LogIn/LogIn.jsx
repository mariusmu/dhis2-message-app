import React from 'react';
import {checkForOAuth, logOut} from "actions/login.action";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ErrorDisplay from 'components/common/error-display';
import LoginForm from 'components/Login/Form/LoginForm';

class Login extends React.Component {
    
    constructor() {
        super();
        this.state = {};
        this.state.login = [];
        this.logout = this.logout.bind(this);
        
    }

    componentDidMount() {
        checkForOAuth()(this.props.dispatch);
        console.log(LoginForm);
    }

    componentWillReceiveProps(props) {
        console.log("Did receive props", props);
    }
    render() {
        let errorComponents = [];
        {
            this.props.oAuthError.forEach((val, id) => {
                errorComponents.push(<ErrorDisplay error={val} key={id + "err"}/>);
            }
        )};
        let loggedInForm = <div>
        <h1>You are logged in</h1>
            <a onClick={this.logout}>Log out</a>
        </div>;
        return (
            this.props.oAuthStatus === "OK" ? loggedInForm : <LoginForm dispatch={this.props.dispatch}/> 
        )
    }

    logout() {
        logOut()(this.props.dispatch);
    }


}


function mapStateToProps(state, ownprops) {
    console.log(state);
    return {
        oAuthToken: state.oAuthToken.oAuthToken,
        oAuthError: state.oAuthToken.oAuthError,
        oAuthStatus: state.oAuthToken.oAuthStatus
    };
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({createOAuthClient}, dispatch);
// }
module.exports = connect(mapStateToProps)(Login);