import React from 'react';
import WriteResponse from 'components/Message/ReadMessage/Conversation/write-response';

class WriteMessage extends React.Component {
    constructor(params) {
        super(params);
        this.reply = this.reply.bind(this);
    }
    
    reply(message, internal, attachments) {
        if(DHISBindConversation) {
            const messageObj = {
                text: message,
                attachements: attachments,
                internal: internal
            };
            DHISBindConversation(messageObj);

        } else {
            console.log("Bind functionality to DHIS form not avaiable");
        }
    }

    render() {
        return (
            <div>
                  <WriteResponse replyAction={this.reply} />
            </div>
        )
    }
}

module.exports = WriteMessage