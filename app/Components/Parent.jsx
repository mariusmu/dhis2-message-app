/**
 * Created by ophelie on 18/11/2016.
 */

import React from 'react';
import Widget from './Widget';
import { Row } from 'react-bootstrap';


class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data:[],type:this.props.type};
    }
    render(){
        var self = this;
        console.log("coucou c'est moi");
        console.log(self.state.type);
        return(
            <div>
                <Row>
                    <div id="typeTitle" className="col-lg-12">
                        <h1>Favorite {self.state.type}</h1>
                    </div>
                </Row>
               <div>
                   {this.state.data.map(function(val){ return <Widget username="admin" password="district" id={val.id} type={self.state.type} key={Math.random()}/>;})}
               </div>
            </div>
        );
    }
    componentWillMount(){
        this.setState({type:this.props.type});
        console.log("willMount");
        this.getMapsData(this.props.type);
    }
    componentWillReceiveProps(nextProps){
        this.setState({type:nextProps.type});
        console.log("willUpdate");
        console.log(this.state.type);
        this.getMapsData(nextProps.type);
    }
    displayMap(val){
        return <Widget username="admin" password="district" id={val.id} key={Math.random()}/>
    }
    getMapsData(type){

        var outputData= [];
        var  username = 'admin',
            password = 'district',
           // url = 'http://' + username + ':' + password + '@192.168.189.1:8082/api/maps.json';
            url = 'http://localhost:8082/api/'+type+'.json';

        console.log(url);

        var self =this;

        $.ajax({
            url : url,
            type: 'GET',
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            },
            success : function (data) {
                console.log(data);
                if(type==="maps"){
                    for (var i = 0; i < data.maps.length; i++) {
                        var id = data.maps[i].id;
                        var name = data.maps[i].displayName;
                        outputData.push({id: id, name: name});
                    }
                }
                else if (type ==="charts"){
                    for (var i = 0; i < data.charts.length; i++) {
                        var id = data.charts[i].id;
                        var name = data.charts[i].displayName;
                        outputData.push({id: id, name: name});
                    }
                }

                self.setState({data:outputData});
                console.log(outputData);
            }
        });

    }


}


module.exports = Parent;




