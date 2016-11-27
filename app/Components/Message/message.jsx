import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchOneMessage} from "../../Actions/message.action";
import {fetchAllUsers} from "../../Actions/user.action";
import ErrorDisplay from "../Common/error-display";
import ReadMessage from "./ReadMessage/read-message";

/**
 * Message wrapper component
 * .. that host all the components relating to the message functionality
 */
class Message extends React.Component {
    
    constructor() {
        super();  
        this.state = {};
        this.state.selectedMessage = null;
        this.state.messageFetched = "aqvFxkI4BZj";
    }

    /**
     * Find the id from url parameters
     * @param {String} url the url
     * @return {String} the id if found, else null
     */
    findId(url) {
        let idIndex = url.lastIndexOf("id=");
        if(idIndex < 0) return null;
        return url.substring(idIndex+3);
        
    }

    /**
     * Fetch the message and all DHIS2 local users
     * when component load
     */
    componentDidMount() {
        const id = this.findId(window.location.href);
        if(id) {
            fetchOneMessage(id)(this.props.dispatch);
        } else {
            console.log("Cannot fetch the DHIS2 message. No id found");
            return;
        }
        
        fetchAllUsers()(this.props.dispatch);
    }

    render() {
        let errorComponents = [];
        {
            this.props.messages_error.forEach((val, id) => {
                errorComponents.push(<ErrorDisplay error={val} key={id + "err"}/>);
            });
        }

        return (
            this.props.messages.length > 0 ?
            <ReadMessage message={this.props.messages[0]} users={this.props.users} dispatch={this.props.dispatch}/>
            : <h1>Loading</h1>
        );
    }
}


/**
 * Map the store state to local props
 * @param{Object} state the state from the store
 * @param{Object} ownprops the local properties of this component
 */
function mapStateToProps(state) {
    return {
        messages: state.messages.messages,
        messages_error: state.messages.messages_error,
        selectedMessage: state.messages.selected_message,
        users: state.users.users
    };
}

module.exports = connect(mapStateToProps)(Message);