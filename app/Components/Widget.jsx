/**
 * Created by ophelie on 07/11/2016.
 */

import React from 'react';
import { Image, Modal, Row, Button } from 'react-bootstrap';
import ShareButton from './ShareButton';


class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.state = { source:'',type:this.props.type, showModal: false};
    }


    render(){
        var source = 'http://' + this.props.username + ':' + this.props.password + '@localhost:8082/api/'+this.state.type+'/'+ this.props.id+'/data';
        return (
            <div className="widgetImg">
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
                        <Image className="widgetImgTest" src={source} rounded onClick={this._previewImage.bind(this)}/>
                    </div>
                    <Modal show={this.state.showModal} onHide={this._close.bind(this)}>
                        <Modal.Header closeButton>
                            <Modal.Title>Preview</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Row bsClass="text-center">
                                <p>{this.props.name}</p>
                            </Row>
                            <Row>
                                <Image onLoad={this._hideLoading} id="sharedImgModal" src={source} rounded />
                                <div id="loading">
                                    <img id="loader" src="src/loading1.gif"/>
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
    componentWillReceiveProps(nextProps){
        this.setState({type:nextProps.type});
    }
    _previewImage(){
        this.setState({showModal: true});
    }
    _close(){
        this.setState({ showModal: false});
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


