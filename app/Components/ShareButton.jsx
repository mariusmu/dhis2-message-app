/**
 * Created by ophelie on 07/11/2016.
 */

import React from 'react';
import { Button, Modal, Row, Tooltip, Overlay, FormControl, Image } from 'react-bootstrap';
import $ from 'jquery';


class ShareButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false, show: false };
    }


    render() {

        const sharedProps = {
            show: this.state.show,
            container: this,

        };

        return (
                <div>
                    <Button ref="target" onClick={this._toggle.bind(this)}>
                        <i className="fa fa-share-alt"/>
                    </Button>
                    <Overlay {...sharedProps} placement="bottom">
                        <Tooltip id="overload-bottom">
                            <a id="fbtooltip" className="fa fa-facebook fa-lg" onClick={this._open.bind(this)}/>
                            <a className="fa fa-twitter fa-lg" onClick={this._open.bind(this)}/>
                        </Tooltip>
                    </Overlay>

                    <Modal show={this.state.showModal} onHide={this._close.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Share your content</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Image id="sharedImgModal" src="https://play.dhis2.org/demo/api/charts/LW0O27b7TdD/data" rounded />
                            </Row>

                            <div id="modalQuestion">Add your comment:</div>
                            <Row bsClass="text-center">
                                <form>
                                    <textarea className="form-control" rows="3"/>
                                </form>
                            </Row>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this._close.bind(this)}>Close</Button>
                        </Modal.Footer>
                    </Modal>

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
    _toggle() {
        this.setState({ show: !this.state.show });
    }

}

module.exports = ShareButton;

/*
 _uploadTwitter(){
 $.ajax({
 type: "POST",
 url: "https://api.twitter.com/1.1/statuses/update.json",
 data: {
 status: "hello!!!!"
 },
 success: function () {
 console.log("SUCCESSSS");
 },
 error: function (e) {
 console.log(e);
 }
 })
 }
 */

/*
 <div id="ZBjCfSaLSqD">
 <Button bsStyle="primary" onClick={this._open.bind(this)} ><i className="fa fa-share-alt fa-3x"/></Button>

 </div>


 <Modal show={this.state.showModal} onHide={this._close.bind(this)}>
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
 <Button onClick={this._close.bind(this)}>Close</Button>
 </Modal.Footer>
 </Modal>
 */
