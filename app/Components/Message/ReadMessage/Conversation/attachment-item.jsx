import React from 'react';
import { readFile } from 'actions/file.action';
import FileSaver from 'filesaverjs';

class AttachmentItem extends React.Component {

    constructor(props) {
        super(props);
        this.readFile = this.readFile.bind(this);
    }
    componentWillReceiveProps(props) {

    }
    readFile() {
        console.log(this.props);
        if (this.props.attachment.rev) {
            readFile(this.props.attachment.path_display)
                .then(res => {
                    FileSaver.saveAs(res, this.props.attachment.name);
                })
                .catch(err => console.log(err));

        }
    }
    render() {
        return (<div className="attachment">
            <a onClick={this.readFile}>{this.props.attachment.name}</a>
        </div>);
    }
}

module.exports = AttachmentItem;