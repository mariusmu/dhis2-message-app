/**
 * Created by ophelie on 07/11/2016.
 */

import React from 'react';
import { Image, Modal, Row, Button } from 'react-bootstrap';
import ShareButton from './ShareButton';

/**
 * widget component used in chart and maps body content to display a map or chart
 */
class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.state = { source:'',type:this.props.type, showModal: false,divhide:'',nodisplay:''};
    }

    render(){

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
        //handle cache
        if( prevState.showModal == false && this.state.showModal ==true) {
            var $image = $('#sharedImgModal');
            if ($image[0].complete) {
                this._hideLoading();
            }
        }
    }

    /**
     * generate source and set to state
     * @private
     */
    _getSource(){
        var source = 'https://play.dhis2.org/test/api/'+this.state.type+'/'+ this.props.id+'/data';
        this.setState({source:source});
    }

    /**
     * set state display of modal to true: show modal
     * @private
     */
    _previewImage(){
        this.setState({showModal: true});
    }

    /**
     * hide loading gif, set state to nodisplay
     * @private
     */
    _hideLoading(){
        this.setState({nodisplay:"nodisplay"});
    }

    /**
     * close modal: set state to false
     * @private
     */
    _close(){
        this.setState({ showModal: false});
    }
}

Widget.propTypes = {
    id: React.PropTypes.string,
    name:React.PropTypes.string
};

module.exports = Widget;


