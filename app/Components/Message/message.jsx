import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchOneMessage, selectMessage} from 'actions/message.action';
import {fetchAllUsers} from 'actions/user.action';
import ErrorDisplay from 'components/common/error-display';
import ReadMessage from 'components/message/ReadMessage/read-message';

class Message extends React.Component {
    
    constructor() {
        super();
        this.state = {};
        this.routeState = "INIT";
        this.selectMessage = this.selectMessage.bind(this);
        this.state.selectedMessage = null;
        this.state.messageFetched = "aqvFxkI4BZj";
    }

    findId(url) {
        let idIndex = url.lastIndexOf("id=");
        if(idIndex < 0) return null;
        console.log("Find id");
        return url.substring(idIndex+3);
        
    }

    componentDidMount() {
       const id = this.findId(window.location.href);
       if(id) {
            fetchOneMessage(id)(this.props.dispatch);
       } else {
           fetchOneMessage(this.state.messageFetched)(this.props.dispatch);
       }
       
       fetchAllUsers()(this.props.dispatch);
    }

    componentWillReceiveProps(props) {
        console.log("Received new props mess");
    }


    render() {
        let errorComponents = [];
        {
            this.props.messages_error.forEach((val, id) => {
                errorComponents.push(<ErrorDisplay error={val} key={id + "err"}/>);
            }
        )};

        return (
            this.props.messages.length > 0 ?
            <ReadMessage message={this.props.messages[0]} users={this.props.users} dispatch={this.props.dispatch}/>
            : <h1>Loading</h1>
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
    return {
        messages: state.messages.messages,
        messages_error: state.messages.messages_error,
        selectedMessage: state.messages.selected_message,
        users: state.users.users
    };
}

module.exports = connect(mapStateToProps)(Message);