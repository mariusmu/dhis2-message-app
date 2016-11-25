import React from 'react';
import MultiPart from '../../Attachment/multi-part';

/**
 * Write response component to use in the message display
 */
class WriteResponseForm extends React.Component {

    constructor(props) {
        super(props);
        this.reply = this.reply.bind(this);
        this.internalReply = this.internalReply.bind(this);
        this.onReplyValueChange = this.onReplyValueChange.bind(this);
        this.state = {};
        this.state.attachements = [];
        this.state.waiting = false;
        this.state.reply = "";
        this.updateAttachment = this.updateAttachment.bind(this);
    }

    /**
     * When text reply changes it value, then assign it to the state
     * @param{ChangeEvent} e event
     */
    onReplyValueChange(e) {
        this.setState({reply : e.target.value});        
    }

    /**
     * Send this conversation as an internal reply
     */
    internalReply() {
        
        const message = this.state.reply;
        if(!message) return;
        const attachements = this.state.attachements;
        this.props.replyAction(message, true, attachements);

        if(this.props.shouldRefresh) {
            this.setState({attachements: [], reply : ""});
        }
    }

    /**
     * Update the attachment of this conversation
     */
    updateAttachment(attachement) {
        this.setState({attachements : attachement, waiting: false});
    }

    /**
     * Send a response as a normal reply conversation
     */
    reply() {
        const message = this.state.reply;
        const attachements = this.state.attachements;

        //Dont post if there is no text
        if(!message || message == "") return;
        
        //Call the parent replyAction
        this.props.replyAction(message, false, attachements);
        
        //Important: In some cases we don't want to reset the components
        if(this.props.shouldRefresh)  {
            this.setState({attachements: [], reply : ""});
        }
    }

    render() {
        return(
            <div className="response-write">
                
                <div className="row">
                    <textarea onChange={this.onReplyValueChange} value={this.state.reply} className="form-control">
                    </textarea>
                </div>
                <div className="row">
                    <MultiPart waiting={this.state.waiting} filesUploaded={this.state.attachements} updateList={this.updateAttachment}/>
                </div>
                <div className="row">
                    <button type="submit" onClick={this.reply} className="blueButtonLink">Reply</button>
                    {this.props.allowInternalReply ? 
                        <button type="submit" onClick={this.internalReply} className="internalMessageButtonLink">Internal reply</button>
                        : <div></div>    
                    }
                    
                </div>
            </div>
        )
    }
}

module.exports = WriteResponseForm;