/**
 * Created by ophelie on 07/11/2016.
 */

import React from 'react';
import { Button, Modal, Row, Tooltip, Overlay, FormControl } from 'react-bootstrap';
import Images from 'react-bootstrap/lib/Image';
import $ from 'jquery';


class ShareButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false, show: false, comment: '', social:'fb',disabled:"disabled",nodisplay:"",maxlength:0,text:""};
    }


    render() {

        const sharedProps = {
            show: this.state.show,
            container: this,
        };

        if (this.props.type == "reportTables")
        {
            var source = this.props.source;

        }else {
            var source = 'http://localhost:8082/api/' + this.props.type + '/' + this.props.id + '/data';
        }

        return (
            <div className="containerButton">
                <a id="btnShare" onClick={this._toggle.bind(this)}>
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

                        <Row bsClass="text-center">
                            <div id="loading">
                                <img  id="loader" className={this.state.nodisplay}  src="src/loading1.gif"/>
                            </div>
                            <Images onLoad={this._hideLoading.bind(this)} id="sharedImgModal" src={source} rounded />

                        </Row>

                        <div id="modalQuestion">{this.state.text}</div>
                        <Row bsClass="text-center">
                            <form>
                                <textarea className="form-control" placeholder="Enter your comment here... " rows="3"  maxLength={this.state.maxlength} value={this.state.comment} onChange={this._handle_comment_change.bind(this)}/>
                            </form>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this._close.bind(this)}>Cancel</Button>
                        <Button id="publish" onClick={this._confirm_publish.bind(this)} disabled={this.state.disabled}>Publish</Button>
                    </Modal.Footer>
                </Modal>

            </div>

        );
    }

    componentDidUpdate(prevProps, prevState){

        console.log(prevState.showModal);

        if( prevState.showModal == false && this.state.showModal ==true && this.state.type != "reportTables") {
            var $image = $('#sharedImgModal');


            if ($image[0].complete) {
                this._hideLoading();
            }
        }

    }
    _close(){
        this.setState({ showModal: false});
    }
    _open(social){
        //close tooltip
        if(social == 'fb'){
            this.setState({ maxlength:1000 , text:"Enter Your comment" });
        }
        if(social == 'tw'){
            console.log("")
            this.setState({ maxlength:140 , text:"Enter Your comment (Max 140 caracters)" });
        }
        this.setState({show:false});
        this.setState({ showModal: true, social:social });


        console.log(social);

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
        if(this.state.social == 'tw'){
            console.log('TW');
            this._uploadTwitter();
        }
    }
    _hideLoading(){
        //$("#loading").hide()
        this.setState({nodisplay:"nodisplay"});
        this.setState({disabled:""});
        //$("#publish").prop('disabled', false);
    }
    _uploadTwitter(){



        var self = this;

        if (this.props.type == "reportTables")
        {
            var image= this.props.source;
            image = image.replace(/^data:image\/(png|jpg);base64,/, "");

        }else {
            var image = self._getBase64Image(document.getElementById("sharedImgModal"));
        }



        console.log(image);

        // Initialize with your OAuth.io app public key
        OAuth.initialize('SB6S4-dwB3azNlMTtoqSvhvLNv8');


        OAuth.popup("twitter").then(function(result) {
            console.log(result);
            var data = new FormData();
            data.append('status', self.state.comment);
            data.append('media[]', self._b64toBlob(image), 'logo.jpg');

            return result.post('/1.1/statuses/update_with_media.json', {
                data: data,
                cache:false,
                processData: false,
                contentType: false
            });
        }).done(function(data){
            var str = JSON.stringify(data, null, 2);
            //$('#result').html("Success\n" + str).show()
            console.log("Success\n" + str);
            self._close();
        }).fail(function(e){
            var errorTxt = JSON.stringify(e, null, 2)
            //$('#result').html("Error\n" + errorTxt).show()
            console.log("Error\n" + errorTxt);

        });

    }
    _uploadFacebook(){
        const contentType = 'image/png';


        var self = this;

        if (this.props.type == "reportTables")
        {
            var image= this.props.source;
            image = image.replace(/^data:image\/(png|jpg);base64,/, "");

        }else {

            var image = self._getBase64Image(document.getElementById("sharedImgModal"));
        }



            console.log("couocuocuocuc");
            console.log(image);
            var blob = self._b64toBlob(image, contentType);
            //var blobUrl = URL.createObjectURL(blob);

            FB.login(function () {

                var access_token =   FB.getAuthResponse()['accessToken'];
                console.log('Access Token = ' + access_token);

                var fd = new FormData();
                fd.append("access_token", access_token);
                fd.append("source", blob);
                fd.append("message", self.state.comment);
                try {
                    $.ajax({
                        url: "https://graph.facebook.com/me/photos?access_token=" + access_token,
                        type: "POST",
                        data: fd,
                        processData: false,
                        contentType: false,
                        cache: false,

                        success: function (data) {
                            console.log("success " + data.id);
                            var url = "https://www.facebook.com/photo.php?fbid=" + data.id
                            $(".fb-send").attr("data-href",url)

                        },
                        error: function (shr, status, data) {
                            console.log("error " + data + " Status " + shr.status);
                        },
                        complete: function () {
                            console.log("Posted to facebook");
                            $("#modal1").hide();
                            $("#fade").hide();
                            self._close();
                        }
                    });
                }
                catch (e) {
                    console.log(e);
                }
            } ,  {scope: 'publish_actions,user_photos'});

    }
    _b64toBlob(b64Data, contentType, sliceSize) {
        //Convert base64 into blob
        //cf http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data);
        var byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);

            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }
    _getBase64Image(img) {
        // Create an empty canvas element
        var canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        // Copy the image contents to the canvas
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        // Get the data-URL formatted image
        // Firefox supports PNG and JPEG. You could check img.src to
        // guess the original format, but be aware the using "image/jpg"
        // will re-encode the image.
        var dataURL = canvas.toDataURL("image/jpg");

        return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    }
}

ShareButton.propTypes = {
    comment: React.PropTypes.string
};

module.exports = ShareButton;

