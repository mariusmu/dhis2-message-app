import React from 'react';
import { readFile } from 'actions/file.action';
import FileSaver from 'filesaverjs';
import ImageAttachment from 'components/Message/ReadMessage/Conversation/image-attachment';

class AttachmentItem extends React.Component {

    constructor(props) {
        super(props);
        this.readFile = this.readFile.bind(this);

    }
    componentWillReceiveProps(props) {
        
    }

    isImage(attachment) {
        let suffix = this.findSuffix(attachment);
        return suffix === ".png" || 
            suffix === ".jpg"  || 
            suffix === ".jpeg" || 
            suffix === ".gif" || 
            suffix === ".GIF" ||
            suffix === ".JPG" ||
            suffix === ".JPEG" ||
            suffix === ".PNG";
    }


    findSuffix(attachment) {
        
        if(!attachment.name) return null;
        const name = attachment.name;
        
        let length = name.length;
        let lastDot = name.lastIndexOf(".");
        if(lastDot >= length) return null;
        return name.substring(lastDot, length);
    }

    readFile() {
        if (this.props.attachment.rev) {
            readFile(this.props.attachment.path_display)
                .then(res => {
                    FileSaver.saveAs(res, this.props.attachment.name);
                })
                .catch(err => console.log(err));

        }
    }
    render() {
        console.log(this.props.attachment);
        return (
        <div className="attachment">
            {this.isImage(this.props.attachment) ? 
                <ImageAttachment image={this.props.attachment}/>
                : <a onClick={this.readFile}>{this.props.attachment.name}</a>}
            
        </div>);
    }
}

module.exports = AttachmentItem;