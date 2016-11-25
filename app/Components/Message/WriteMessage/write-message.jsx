import React from 'react';
import WriteResponse from '../ReadMessage/Conversation/write-response';

/**
 * Component to use when writing new messages
 * Used when writing new messages in DHIS2
 */
class WriteMessage extends React.Component {
    constructor(params) {
        super(params);
        this.reply = this.reply.bind(this);
    }
    
    /**
     * Important: Will only work if the DHIS2 html file has a DHISBindConversation function
     * Pass the conversation reply object to the wrapper function
     * .. in dhis2 that will update the <input> locally avaiable in dhis write message
     */
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