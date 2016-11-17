import React from 'react';
import {uploadFile, deleteFile} from 'actions/file.action';
import AttachmentItem from 'components/Message/Attachment/AttachmentItem'; 
import Waiting from 'components/Common/Waiting';

class MultiPart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.file = {};
        this.state.files = {};
        this.state.waiting = false;
        this.inputChanged = this.inputChanged.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.updateParent = this.updateParent.bind(this);
        this.cleanState = this.cleanState.bind(this);
    }

    inputChanged(e) {
        this.setState({waiting: true});
         uploadFile(e.target.files[0])
            .then(res => {
                if(res) {
                    let filesUploaded = this.props.filesUploaded.concat(res);
                    this.cleanState();
                    this.updateParent(filesUploaded);
                    this.setState({waiting: false});
                } else {
                }
            })
            .catch(err => {
                console.log(err)
            });
        
    }

    /**
     * If there is a callback for a parent
     * function to use this attachment components
     * then we dispatch an update to the parent
     */
    updateParent(files) {
        if(this.props.updateList) {
            this.props.updateList(files);
        }
    }

    cleanState() {
        this.setState({
            files: {},
            file: {}
        });
    }


    deleteItem(id) {
        this.setState({waiting: true});
        let filesUploaded = this.props.filesUploaded;
        let foundId = -1;
        for(let i = 0; i<filesUploaded.length; i++) {
            if(filesUploaded[i].id == id) {
                foundId = i;
                break;
            }
        }
        const self = this;
        if(foundId > -1) {
            deleteFile(filesUploaded[foundId].path_display)
                .then(res => {
                    filesUploaded.splice(foundId, 1);
                    if(filesUploaded == null) filesUploaded = [];
                    self.updateParent(filesUploaded);
                    this.cleanState();
                    this.setState({waiting: false});
                }).catch(err => console.log(err));
        }
        
    }

    render() {
        let uploaded = [];
        {this.props.filesUploaded.map((val, id) => {
            uploaded.push(<AttachmentItem delete={this.deleteItem} attachment={val} key={id + "attachment"}/>);
        })}
        return(
        this.state.waiting ? <Waiting/> :
            <div>

        <form onSubmit={this.post}>
            <input onChange={this.inputChanged} className="form-control" type="file" multiple/>
            <ul className="attachments">
                {uploaded}
            </ul>
        </form>
        </div>);
    }
}

module.exports = MultiPart; 