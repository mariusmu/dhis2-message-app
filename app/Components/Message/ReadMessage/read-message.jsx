import React from "react";
import { postConversation, fetchAllConversations, unSelectMessage } from "../../../Actions/message.action";
import Conversation from "./Conversation/conversation";
import NameLink from "./name-link";
import WriteResponse from "./Conversation/write-response";
import { fetchAllUsers } from "../../../Actions/user.action";


class ReadMessage extends React.Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.state = {};
        this.state.conversations = [];
        this.state.toNames = [];
        this.appendToName = this.appendToName.bind(this);
        this.reply = this.reply.bind(this);

    }

    /**
     * Recursive function to get the name of the users
     * from the child react component. Will be called from the 
     * conversation component
     * @param name the name object containing the name and id of the sender
     */
    appendToName(name) {
        if (name) {
            let updatedNameList = this.state.toNames;
            if (updatedNameList.indexOf(name) < 0)
                updatedNameList.push(name);
            this.setState({ toNames: updatedNameList });
        }
    }


    /**
     * Write conversation for a message
     * @param   message the message to post
     * @param internal whether this is an internal reply
     */
    reply(message, internal, attachments) {
        postConversation(this.props.message.id, message, internal, attachments)(this.props.dispatch)
            .then(() =>
                fetchAllConversations(this.props.message.id)(this.props.dispatch)
            );
    }

    componentDidMount() {
        fetchAllConversations(this.props.message.id)(this.props.dispatch);

    }

    render() {
        let conversations = [];
        if (this.props.message && this.props.message.conversations) {
            this.props.message.conversations.map((val, id) => {
                conversations.push(<Conversation dipatch={this.props.dispatch} appendToName={this.appendToName} users={this.props.users} conversation={val} key={id + "conv"} />);
            });
        }

        let toFullNames = [];
        this.state.toNames.map((val, id) => {
            toFullNames.push(<NameLink name={val} key={id + "name"} />);
        });

        return (
            <div className="">
            
            
                <br />
                    {conversations}
                <WriteResponse shouldRefresh={true} allowInternalReply={true} replyAction={this.reply} />
            </div>
        );
    }

    goBack() {
        unSelectMessage()(this.props.dispatch);
    }
}

module.exports = ReadMessage;