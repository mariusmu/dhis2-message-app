import React from 'react';

class MessageLine extends React.Component {
    constructor() {
        super();
        this.selectMessage = this.selectMessage.bind(this);
    }
    render() {

        return(
         <tr>
            <td>{this.props.message.lastSenderName}</td>
            <td><a onClick={this.selectMessage}>{this.props.message.subject}</a></td>
            <td>{this.props.message.lastUpdated.substr(0, 10)}</td>
         </tr>
        );
    }

    selectMessage() {
        this.props.selectMessage(this.props.message.id);
    }
}

module.exports = MessageLine;