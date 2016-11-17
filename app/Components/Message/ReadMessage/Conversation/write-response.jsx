import React from 'react';
import MultiPart from 'components/Message/Attachment/MultiPart';
class WriteResponse extends React.Component {

    constructor(props) {
        super(props);
        this.submitForm = this.submitForm.bind(this);
        this.reply = this.reply.bind(this);
        this.internalReply = this.internalReply.bind(this);
        this.onReplyValueChange = this.onReplyValueChange.bind(this);
        this.state = {};
        this.state.attachements = [];
        this.state.waiting = false;
        this.state.reply = "";
        this.updateAttachment = this.updateAttachment.bind(this);
    }

    submitForm(e) {
        e.preventDefault();
    }

    onReplyValueChange(e) {
        this.setState({reply : e.target.value});        
    }

    internalReply() {
        
        const message = this.state.reply;
        if(!message) return;
        const attachements = this.state.attachements;
        this.props.replyAction(message, true, attachements);

        if(this.props.shouldRefresh) {
            this.setState({attachements: [], reply : ""});
            console.log("Refreshed");
        }
    }

    updateAttachment(attachement) {
        this.setState({attachements : attachement, waiting: false});
    }

    reply() {
        console.log(this);
        const message = this.state.reply;
        const attachements = this.state.attachements;
        if(!message || message == "") return;
        this.props.replyAction(message, false, attachements);
        
        if(this.props.shouldRefresh)  {
            this.setState({attachements: [], reply : ""});
            console.log("Refreshed");
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

module.exports = WriteResponse;