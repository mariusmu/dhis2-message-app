import React from 'react';

class MessageLine extends React.Component {
    constructor(props) {
        super();
        this.selectMessage = this.selectMessage.bind(this);
        this.generateUsers(props);
        
    }

    

    generateUsers(props) {
     
    }

    render() {

        return(
         <tr>
            <td>{this.props.message.lastSenderFirstname} {this.props.message.lastSenderSurname}</td>
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