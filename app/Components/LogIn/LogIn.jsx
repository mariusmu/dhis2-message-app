import React from 'react';
import {checkForOAuth, logOut} from "actions/oauth.action";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ErrorDisplay from 'components/common/error-display';
import LoggedIn from 'components/Login/LoginSuccess/LoggedIn';
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

    }
    componentWillReceiveProps(props) {
    }

    render() {
        let errorComponents = [];
        {
            this.props.login_errors.forEach((val, id) => {
                errorComponents.push(<ErrorDisplay error={val} key={id + "err"}/>);
            }
        )};

        return (
            this.props.oAuthStatus === "OK" ? <LoggedIn logOut={this.logout}/> : <LoginForm cid={this.props.oauth_client_id} dispatch={this.props.dispatch}/>
        )
    }

    logout() {
        logOut()(this.props.dispatch);
    }

}

function mapStateToProps(state, ownprops) {
    console.log(state);
    return {
        refresh_token: state.login.refresh_token,
        login_errors: state.login.login_errors,
        login_status: state.login.login_status,
        oauth_status: state.oAuthClient.oAuthStatus,
        oauth_client_id: state.oAuthClient.oAuthClientId
    };
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({createOAuthClient}, dispatch);
// }
module.exports = connect(mapStateToProps)(Login);
