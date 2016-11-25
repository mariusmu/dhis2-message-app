import React from 'react';
import { readFile } from '../../../../Actions/file.action';
import FileSaver from 'filesaverjs';
import ImageAttachment from './image-attachment';

/**
 * Attachment item component that decides if to print 
 * the attachment as a link or as an image preview
 */
class AttachmentItem extends React.Component {

    constructor(props) {
        super(props);
        this.readFile = this.readFile.bind(this);

    }

    /**
     * Check if the attachment is an image
     * @param{String} attachment the filename
     * @return{Boolean} true if this is a picture. Else false
     */
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


    /**
     * Find the suffix in a filename
     * @param{String} attachment the filename
     * @return{String} the suffix or null of not valid
     */
    findSuffix(attachment) {
        
        if(!attachment.name) return null;
        const name = attachment.name;
        
        let length = name.length;
        let lastDot = name.lastIndexOf(".");
        if(lastDot >= length) return null;
        return name.substring(lastDot, length);
    }

    /**
     * Download the file
     */
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
        return (
        <div className="attachment">
            {this.isImage(this.props.attachment) ? 
                <ImageAttachment image={this.props.attachment}/>
                : <a onClick={this.readFile}>{this.props.attachment.name}</a>}
            
        </div>);
    }
}

module.exports = AttachmentItem;