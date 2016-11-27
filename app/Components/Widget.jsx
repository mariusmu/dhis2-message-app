/**
 * Created by ophelie on 07/11/2016.
 */

import React from 'react';
import { Image, Modal, Row, Button } from 'react-bootstrap';
import ShareButton from './ShareButton';
import domtoimage from 'dom-to-image';


class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.state = { source:'',type:this.props.type, showModal: false,divhide:'',nodisplay:''};
    }


    render(){

        return (
            <div className="widgetImg">
                <div id="lol"></div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <i className="fa fa-bar-chart-o fa-fw"/> {this.props.name}
                        <div className="pull-right">
                            <div className="btn-group">
                                <ShareButton id={this.props.id} type={this.state.type}/>
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        <Image className="widgetImgTest" src={this.state.source} rounded onClick={this._previewImage.bind(this)}/>
                    </div>
                    <Modal show={this.state.showModal} onHide={this._close.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Preview</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row bsClass="text-center">
                                <p>{this.props.name}</p>
                            </Row>
                            <Row bsClass="text-center">
                                <Image onLoad={this._hideLoading.bind(this)} id="sharedImgModal" src={this.state.source} rounded />
                                <div id="loading">
                                    <img  id="loader" className={this.state.nodisplay}  src="src/loading1.gif"/>
                                </div>
                            </Row>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this._close.bind(this)}>Close</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }
    componentWillMount(){
        this._getSource();
    }
    componentWillReceiveProps(nextProps){
        this.setState({type:nextProps.type});
        this._getSource();
    }
    componentDidUpdate(prevProps, prevState){
        if( prevState.showModal == false && this.state.showModal ==true && this.state.type != "reportTables") {
            var $image = $('#sharedImgModal');
            if ($image[0].complete) {
                this._hideLoading();
            }
        }
    }
    _getSource(){
        var source = '';
        if(this.state.type==='reportTables'){
            this._getHtmlTable();
        }
        else{
            source = 'http://' + this.props.username + ':' + this.props.password + '@localhost:8082/api/'+this.state.type+'/'+ this.props.id+'/data';
            this.setState({source:source});
        }
    }
    _previewImage(){
        this.setState({showModal: true});
    }
    _hideLoading(){
        this.setState({nodisplay:"nodisplay"});
    }
    _close(){
        this.setState({ showModal: false});
    }
    _convert(node){
        //var node = document.getElementById('my-table');
        var div = document.createElement('div');
        div.innerHTML=node;
        div.setAttribute("class",'hiddendiv');
        div.setAttribute("id",this.props.id + 'm');
        console.log(div.firstChild);

        document.getElementById('my-table').appendChild(div);

        var d = document.getElementById(this.props.id + 'm');

        //this.setState({divhide:div.firstChild});

        //var content = document.getElementById(this.props.id + 'm');

        var self = this;

        domtoimage.toPng(d)
            .then(function (dataUrl) {
                var img = new Image();
                img.src = dataUrl;
                console.log(dataUrl);
                console.log(d);
                //document.body.appendChild(img);
                self.setState({source:dataUrl});
                $('#'+self.props.id +'m').remove();
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });

    }
    _getHtmlTable(){
        var  username = 'admin',
            password = 'district';
        var url = 'http://localhost:8082/api/'+this.state.type+'/'+ this.props.id+'/data.html';
        console.log(url);
        var self = this;
        $.ajax({
            url : url,
            type: 'GET',
            dataType: 'text',
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            },
            success : function (data) {
                console.log("coucou")
                //console.log(data);
                self._convert(data);
            }
        });
    }
    // componentWillMount(){
    //     this.setState({source:source});
    //     console.log(this.state.source);
    // }

}

Widget.propTypes = {
    id: React.PropTypes.string,
    name:React.PropTypes.string
};

module.exports = Widget;


