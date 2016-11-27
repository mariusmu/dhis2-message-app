import React from "react";
import {uploadFile, deleteFile} from "../../../Actions/file.action";
import AttachmentItemElement from "./attachment-item-element"; 
import Waiting from "../../Common/Waiting";

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
        this.state.error = false;
    }

    inputChanged(e) {
        this.setState({waiting: true});
        uploadFile(e.target.files[0])
            .then(res => {
                if(res) {
                    let filesUploaded = this.props.filesUploaded.concat(res);
                    this.cleanState();
                    this.updateParent(filesUploaded);
                    
                } 
                this.setState({error: false, waiting: false});
            })
            .catch((err) => 
                this.setState({error: true, waiting: false})
            );
        
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
            deleteFile(filesUploaded[foundId].id)
                .then(() => {
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
            uploaded.push(<AttachmentItemElement delete={this.deleteItem} attachment={val} key={id + "attachment"}/>);
        })}
        return(
        this.state.waiting ? <Waiting/> :
            <div>

        <form onSubmit={this.post}>
            <input onChange={this.inputChanged} className="form-control" type="file" multiple/>
            <ul className="attachments">
                {uploaded}
            </ul>
            {this.state.error === true ? <div className="error-upload">
                <span className="glyphicon glyphicon-alert">
                </span>&emsp;Error when trying to upload you attachment
                </div> : <div></div>}
        </form>
        </div>);
    }
}

module.exports = MultiPart; 