/**
 * Created by ophelie on 07/11/2016.
 */

import React from 'react';
import { Button, Modal, Row, Tooltip, Overlay, FormControl } from 'react-bootstrap';
import Images from 'react-bootstrap/lib/Image';
import $ from 'jquery';

function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}


//Convert base64 into blob
//cf http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
function b64toBlob(b64Data, contentType, sliceSize) {
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

        var source = 'http://localhost:8082/api/'+this.props.type+'/'+this.props.id+'/data';

        return (
            <div>
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
                        <Row>
                            <Images onLoad={this._hideLoading} id="sharedImgModal" src={source} rounded />
                            <div id="loading">
                                <img id="loader" src="src/loading1.gif"/>
                            </div>
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
        if(this.state.social == 'tw'){
            console.log('FBBB');
            this._uploadTwitter();
        }
    }
    _hideLoading(){
        $("#loading").hide()
    }

    _uploadTwitter(){

        var comment = this.state.comment;

        var close = this._close();




        const contentType = 'image/png';

        var img = new Image();
        img.src = "http://localhost:8082/api/" + this.props.type + "/" + this.props.id + "/data";

        console.log(img);
        var logo = "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAKfSURBVHjabJNNSFRRGIafc+6d8Y6OM42aTmpNauRgUVBRVEwZCC6kdtGqRRBtWkWLKGgXtghaRIsK3ES0L4pKCPpZREX2oxnVlOn4V4026Tjj3HvPPS2asRp64OODw8v3cXjfTxinrlOGBHSxzgPjxW4Cqvj+j7icy8AVIAIcK5YPuAMc/9+2fxEioWz3sFoozCrloVzVrLKLtud6XQiRKKlKcrPYo8AbhEiq+Xxba2MN7dEwtqsQCExT8moszfRMNmFUWwN4uhKI/z1gHikCai6/fefaRlqiYW6+HGEunQU00cYaejbGeJacjgym0hEjGBhC66UvhIEWlbPHN6yqo7UhzLUbz9mxup65C4dInTtIxPLRd/sFW1vqaaoNoRw1DawAQhI4Awzi6fjahjD97ybAUfTuWc+Je6+5l5zmTOc6mMnydOQbm2N1sGh3AZNArwR6Pa0fRGqD5BYdvk7MEoo3sbG1npXVFsv8JtviTdAWZWjyB8pRUOkHuAqcNYEpDQOmFJ2O8iCbpyfegRSCk53rlszZFKtjYCiFqzyElAAPgQkTuGgIcfR7JkeouRYCfrw/Li1RcD38oQCW5UMvFKCqog/YYgJ9QAbHPTKbt5cnNrVy980op+uCzOVshBCYhmR4LM2+DTFG0vNgGu+BS8AjUYqyFiLp5QttBza38flnjudPPoDt/k5ulUX37g6k43JncAwjGOhH626A0oA1wEfl6UVs10q0NxK2fGQLLkJAqMLHeGaBF5++KllVYQjIF+13SkFKAi2GFN+wfMOP36ZiZqWfppogrqeZTM+jXYURtO4XN8cAp/wWvgA5YMoIWiOelPtHZ7JMZBYywm/uNSorQOvRona0/Bb+ZhcgBRQMQ14CUsAtoAoolIt/DQBMqAUSa5wR2gAAAABJRU5ErkJggg==";




        img.addEventListener('load', function () {
            var image = getBase64Image(img);
            console.log("couocuocuocuc");
            console.log(image);
            //var blob = b64toBlob(image, contentType);
            // var name =  type + 'png';

            // Initialize with your OAuth.io app public key
            OAuth.initialize('SB6S4-dwB3azNlMTtoqSvhvLNv8');


            OAuth.popup("twitter").then(function(result) {
                console.log(result);
                var data = new FormData();
                data.append('status', comment);
                data.append('media[]', b64toBlob(image), 'logo.png');

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
                close;
            }).fail(function(e){
                var errorTxt = JSON.stringify(e, null, 2)
                //$('#result').html("Error\n" + errorTxt).show()
                console.log("Error\n" + errorTxt);

            });


        });
    }
    _uploadFacebook(){

        var comment = this.state.comment;
        var close = this._close();


        const contentType = 'image/png';

        var img = new Image();
        img.src = "http://localhost:8082/api/" + this.props.type + "/" + this.props.id + "/data";

        console.log(img);
        $("#modal1").show();


        img.addEventListener('load', function () {
            var image = getBase64Image(img);
            console.log("couocuocuocuc");
            console.log(image);
            var blob = b64toBlob(image, contentType);
            //var blobUrl = URL.createObjectURL(blob);


            FB.login(function () {
                // FB.getLoginStatus(function(response) {
                //if (response.status === 'connected') {
                // var access_token = response.authResponse.accessToken;

                var access_token =   FB.getAuthResponse()['accessToken'];
                console.log('Access Token = ' + access_token);


                //fd.append("access_token",access_token);

                var fd = new FormData();
                fd.append("access_token", access_token);
                fd.append("source", blob);
                fd.append("message", comment);
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
                            close;
                        }
                    });
                }
                catch (e) {
                    console.log(e);
                }
            } ,  {scope: 'publish_actions,user_photos'});
        } );

        //Call function to close the modal

    }

}

ShareButton.propTypes = {
    comment: React.PropTypes.string
};

module.exports = ShareButton;

