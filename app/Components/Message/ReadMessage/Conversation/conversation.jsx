import React from 'react';
import {fetchAllConversations, unSelectMessage} from '../../../../Actions/message.action';
import Attachment from './attachment-item';

/**
 * Conversation component to display 
 * the conversations of a message
 */
class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.generateUser = this.generateUser.bind(this);
        this.state = {};
        this.state.attachments = [];
        this.state.text = "";

    }

    /**
     * Filter out the users in this conversation
     * @return {Array} of users
     */
    generateUser() {
        return this.props.users
            .filter((val) => {return val.id == this.props.conversation.sender.id})[0];
    }
    
    /**
     * Parse the conversation text element
     * and extract its attachments and text if parsable
     */
    componentWillReceiveProps(props) {
        if(props.conversation) {
            
            //Try to parse
            //If it is not parsable, simply use its raw text
            try {
                let parsed = JSON.parse(props.conversation.text);
                
                if(parsed.text) {
                 
                    if(parsed.attachements) {
                        this.setState({text: parsed.text, attachments: parsed.attachements});                        
                    } else {
                        this.setState({text: parsed.text});
                    }
                } else { 
                    this.setState({text: parsed});
                }
            } catch (err) {
                this.setState({text: props.conversation.text});
            }
        }
    }

    /**
     * Post the conversation users to its parent componentWillMount
     */
    componentWillMount() {
        this.props.appendToName(this.generateUser());
    }

    render() {
        let attachments = [];
        this.state.attachments.map((val, index) => {
            attachments.push(<Attachment attachment={val} key={index + "attach-item"}/>);
        });
        return(
            <div className="messageDiv">
                <div className="userLink">
                    {this.generateUser().displayName}
                </div>
                <div className="grey">
                    {this.props.conversation.lastUpdated.substr(0, 10)}
                </div>
                <div className="messageText">{this.state.text}</div>
                {attachments}
            </div>
        )
    }

}

module.exports = Conversation;