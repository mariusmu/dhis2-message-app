/**
 * Created by ophelie on 07/11/2016.
 */

import React from 'react';
import { Image } from 'react-bootstrap';
import ShareButton from './ShareButton';


class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.state = { source:'',type:this.props.type};
    }


    render(){
        var source = 'http://' + this.props.username + ':' + this.props.password + '@localhost:8082/api/'+this.state.type+'/'+ this.props.id+'/data';
        return (
            <div className="widgetImg">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <i className="fa fa-bar-chart-o fa-fw"></i> {this.props.name}
                        <div className="pull-right">
                            <div className="btn-group">
                                <ShareButton id={this.props.id} type={this.state.type}/>
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
    componentWillReceiveProps(nextProps){
        this.setState({type:nextProps.type});
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


