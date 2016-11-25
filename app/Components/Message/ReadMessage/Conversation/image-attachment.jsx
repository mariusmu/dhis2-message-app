import React from 'react';
import {readFile} from '../../../../Actions/file.action';
import Waiting from '../../../Common/Waiting';

/**
 * Image component that loads and display an image attachment
 */
class ImageAttachment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.state.activeComponent = <Waiting/>
        
        /**
         * Make the image component 
         * @param{String} imageUrl the url of the image
         * @return {Element} the Image component
         */
        makeImageComponent(imageUrl) {
            return(
                <a href={imageUrl} target="_blank">
                    <img src={imageUrl} width="100" src={imageUrl}/>
                </a>
            );
        }

        readFile(this.props.image.path_display)
            .then(res => {
                let makeUrlFromBlob = window.URL || window.webkitURL;
                let imageUrl = makeUrlFromBlob.createObjectURL(res);
                this.setState({activeComponent: this.makeImageComponent(imageUrl)}); })
            .catch(err => {
                this.setState({activeComponent: <img src=""/>});
            });
            
    }
    
    render() {
        return(this.state.activeComponent);
    }
}

module.exports = ImageAttachment;