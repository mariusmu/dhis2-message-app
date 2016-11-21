import React from 'react';
import {fetchAllConversations, unSelectMessage} from 'actions/message.action';
import Attachment from 'components/Message/ReadMessage/Conversation/attachment-item';

class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.generateUser = this.generateUser.bind(this);
        this.state = {};
        this.state.attachments = [];
        this.state.text = "";

    }

    generateUser() {
        return this.props.users
            .filter((val) => {return val.id == this.props.conversation.sender.id})[0];
    }
    

    uploadFile(form) {
        form.preventDefault();
    }

    componentWillReceiveProps(props) {
        if(props.conversation) {
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