/**
 * Created by ophelie on 07/11/2016.
 */

import React from 'react';
import { Image } from 'react-bootstrap';
import ShareButton from './ShareButton';


class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.state = { source:''};
    }


    render(){
        var source = 'http://' + this.props.username + ':' + this.props.password + '@192.168.189.1:8082/api/maps/'+ this.props.id+'/data';
        console.log(source);
        return (
            <div className="widgetImg">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <i className="fa fa-bar-chart-o fa-fw"></i> Area Chart Example
                        <div className="pull-right">
                            <div className="btn-group">
                                <ShareButton id={this.props.id}/>
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        <Image className="widgetImgTest" src={source} rounded/>
                    </div>
                </div>
            </div>
        );
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


