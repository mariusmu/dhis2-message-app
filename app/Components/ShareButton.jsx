/**
 * Created by ophelie on 07/11/2016.
 */

import React from 'react';
import { Button, Modal, Row, Tooltip, Overlay, FormControl, Image } from 'react-bootstrap';
import $ from 'jquery';




class ShareButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false, show: false, comment: 'Your comment', social:'fb'};
    }


    render() {

        const sharedProps = {
            show: this.state.show,
            container: this,

        };

        var source = 'http://192.168.189.1:8082/api/maps/'+this.props.id+'/data';

        return (
                <div>
                    <a onClick={this._toggle.bind(this)}>
                        <i className="fa fa-share-alt"/>
                    </a>
                    <Overlay {...sharedProps} placement="bottom">
                        <Tooltip id="overload-bottom">

                            <a id="fbtooltip" className="fa fa-facebook fa-lg" onClick={this._open.bind(this, 'fb')}/>
                            <a className="fa fa-twitter fa-lg" onClick={this._open.bind(this, 'tw')}/>
                        </Tooltip>
                    </Overlay>

                    <Modal show={this.state.showModal} onHide={this._close.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Share your content</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Image id="sharedImgModal" src={source} rounded />
                            </Row>

                            <div id="modalQuestion">Add your comment:</div>
                            <Row bsClass="text-center">
                                <form>
                                    <textarea className="form-control" rows="3" value={this.state.comment} onChange={this._handle_comment_change.bind(this)}/>
                                </form>
                            </Row>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this._close.bind(this)}>Cancel</Button>
                            <Button onClick={this._confirm_publish.bind(this)}>Publish</Button>
                        </Modal.Footer>
                    </Modal>

                </div>
                );
    }
    _close(){
        this.setState({ showModal: false});
    }
    _open(social){
        console.log("hi");
        console.log(social);
        this.setState({ showModal: true, social:social });
    }
    _toggle() {
        this.setState({ show: !this.state.show });
    }
    _handle_comment_change(event){
        this.setState({comment: event.target.value});
    }
    _confirm_publish(){
        console.log('STATE'+this.state.social);
        if(this.state.social == 'fb'){
            console.log('FBBB');
            this._uploadFacebook();
        }
    }
    _uploadFacebook(){

        var comment = this.state.comment;
        var close = this._close();

        FB.login(function () {

            var access_token =   FB.getAuthResponse()['accessToken'];
            console.log('Access Token = '+ access_token);
            FB.api(
                '/me/photos',
                'post',
                {
                    message: comment,
                    status: 'success',
                    access_token: access_token,
                    url: "https://play.dhis2.org/demo/api/maps/ZBjCfSaLSqD/data?width=800"
                },
                function (response) {
                    if (!response) {
                        //TODO NOT SUCESS
                        alert('Error occurred.');
                    } else if (response.error) {
                        //TODO NOT SUCESS

                           console.log(response.error.message);
                    } else {
                        //TODO Success
                        close
                    }
                }
            );
        }, {scope: 'user_photos,publish_actions'});

        //Call function to close the modal

    }

}

ShareButton.propTypes = {
    comment: React.PropTypes.string
};

module.exports = ShareButton;

