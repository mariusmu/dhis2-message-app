/**
 * Created by ophelie on 07/11/2016.
 */

import React from 'react';
import { Button, Modal, Row } from 'react-bootstrap';
//import ShareModal from './ShareModal';

//var ShareModal = require('./ShareModal');
//<button type="button" onClick={() => this._open()}>Share</button>

class ShareButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false };
    }
    render() {
        return (
                <div>
                    <div id="ZBjCfSaLSqD">
                        <Button bsStyle="primary" onClick={() => this._open()} >Share</Button>
                        <Modal show={this.state.showModal} onHide={this.close}>
                            <Modal.Header closeButton>
                                <Modal.Title>Share your content</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div id="modalQuestion">On which social media would you like to share?</div>
                                <Row bsClass="text-center">
                                    <Button className="btnSocialShare" id="btnFacebook" type="button"><img className="imgShareBtn" id="imgFacebook" src="/app/src/facebook.png"/></Button>
                                </Row>
                                <Row bsClass="text-center">
                                    <Button className="btnSocialShare" id="btnTwitter" type="button"><img className="imgShareBtn" id="imgTwitter" src="/app/src/twitter.png"/></Button>
                                </Row>


                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={() => this._close()}>Close</Button>
                            </Modal.Footer>
                        </Modal>

                    </div>


                </div>
                );
    }
    _close(){
        this.setState({ showModal: false});
    }
    _open(){
        console.log("hi");
        this.setState({ showModal: true });
    }

}

module.exports = ShareButton;
