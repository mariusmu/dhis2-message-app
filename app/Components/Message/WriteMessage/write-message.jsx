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
        if(typeof(DHISBindConversation) !== "undefined") {
            const messageObj = {
                text: message,
                attachements: attachments,
                internal: internal
            };
            DHISBindConversation(messageObj);

        } else {
            alert("Bind functionality to DHIS form not avaiable. You will not be able to post a new message");
        }
    }

    render() {
        let error = typeof(DHISBindConversation) === "undefined" ?
            <div className="top-error">It seems that the document lack the DHISBindConversation. Will not be able to post</div>
            : "";

        return (
            <div>
                 {error}                  
                  <WriteResponse replyAction={this.reply} />
            </div>
        );
    }
}

module.exports = WriteMessage;