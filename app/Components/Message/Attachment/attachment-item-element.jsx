import React from 'react';

class AttachmentItemElement extends React.Component {

    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    
    delete() {
        this.props.delete(this.props.attachment.id);
    }
    render() {
        return(
            <li className="attachment-item">
                {this.props.attachment.name} <a onClick={this.delete}>(x)</a>
            </li>
        )
    }
}

module.exports = AttachmentItemElement;