import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchAllMessages, selectMessage} from 'actions/message.action';
import {fetchAllUsers} from 'actions/user.action';
import ErrorDisplay from 'components/common/error-display';
import AllMessages from 'components/message/AllMessages/all-messages';
import ReadMessage from 'components/message/ReadMessage/read-message';

class Message extends React.Component {
    
    constructor() {
        super();
        this.state = {};
        this.routeState = "INIT";
        this.selectMessage = this.selectMessage.bind(this);
        this.state.selectedMessage = null;
        
    }

    componentDidMount() {
        fetchAllMessages()(this.props.dispatch);
       fetchAllUsers()(this.props.dispatch);
    }

    componentWillReceiveProps(props) {
        console.log(props);
    }


    render() {
        let errorComponents = [];
        {
            this.props.messages_error.forEach((val, id) => {
                errorComponents.push(<ErrorDisplay error={val} key={id + "err"}/>);
            }
        )};

        return (
            this.props.selectedMessage == null ? 
                <AllMessages users={this.props.users} messages={this.props.messages} selectMessage={this.selectMessage} dispatch={this.props.dispatch}/> : 
                <ReadMessage users={this.props.users} message={this.props.messages.filter(
                    (val) => {
                        return val.id == this.props.selectedMessage})[0]} dispatch={this.props.dispatch}/>
        )
    }

    selectMessage(id) {
        if(id) {
            selectMessage(id)(this.props.dispatch);
        }
    }

    logout() {
        logOut()(this.props.dispatch);
    }

}

function mapStateToProps(state, ownprops) {
    console.log(state);
    return {
        messages: state.messages.messages,
        messages_error: state.messages.messages_error,
        selectedMessage: state.messages.selected_message,
        users: state.users.users
    };
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({createOAuthClient}, dispatch);
// }
module.exports = connect(mapStateToProps)(Message);