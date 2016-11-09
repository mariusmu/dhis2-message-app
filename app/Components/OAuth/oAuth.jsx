import React from 'react';
import {checkForOAuth, logOut} from "actions/oauth.action";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ErrorDisplay from 'components/common/error-display';
import OAuthForm from 'components/oAuth/Form/oAuthForm';
import OAuthCreated from 'components/oAuth/Created/oAuthCreated';

class oAuth extends React.Component {
    
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
            this.props.oAuthError.forEach((val, id) => {
                errorComponents.push(<ErrorDisplay error={val} key={id + "err"}/>);
            }
        )};

        return (
            this.props.oAuthStatus === "OK" ? <OAuthCreated clientId={this.props.oAuthClientId} logOut={this.logout}/> : <OAuthForm dispatch={this.props.dispatch}/> 
        )
    }

    logout() {
        logOut()(this.props.dispatch);
    }

}

function mapStateToProps(state, ownprops) {
    console.log(state);
    return {
        oAuthClientId: state.oAuthClient.oAuthClientId,
        oAuthError: state.oAuthClient.oAuthError,
        oAuthStatus: state.oAuthClient.oAuthStatus
    };
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({createOAuthClient}, dispatch);
// }
module.exports = connect(mapStateToProps)(oAuth);