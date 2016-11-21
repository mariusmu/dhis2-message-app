import React from 'react';
import {readFile} from 'actions/file.action';

class ImageAttachment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.activeComponent = <h3>Waiting</h3>
        
        readFile(this.props.image.path_display)
            .then(res => {
                let makeUrlFromBlob = window.URL || window.webkitURL;
                let imageUrl = makeUrlFromBlob.createObjectURL(res);
                this.setState({activeComponent: <a href={imageUrl} target="_blank">
                <img src={imageUrl} width="100" src={imageUrl}/>
            </a>});
        });
    }
    
    render() {
        return(this.state.activeComponent);
    }
}

module.exports = ImageAttachment;