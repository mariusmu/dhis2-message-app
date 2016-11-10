import React from 'react';
import {fetchAllConversations, unSelectMessage} from 'actions/message.action';

class Conversation extends React.Component {
    constructor(props) {
        super(props);
        this.generateUser = this.generateUser.bind(this);

    }

    generateUser() {
        return this.props.users
            .filter((val) => {return val.id == this.props.conversation.sender.id})[0];
    }

    componentWillMount() {
        this.props.appendToName(this.generateUser());
    }

    render() {
        return(
            <div className="messageDiv">
                <div className="userLink">
                    {this.generateUser().displayName}
                </div>
                <div className="grey">
                    {this.props.conversation.lastUpdated.substr(0, 10)}
                </div>
                <div className="messageText">{this.props.conversation.displayName}</div>

            </div>
        )
    }

}

module.exports = Conversation;