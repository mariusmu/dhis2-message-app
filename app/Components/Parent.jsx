/**
 * Created by ophelie on 18/11/2016.
 */

import React from 'react';
import { Image } from 'react-bootstrap';

import Widget from './Widget';


class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data:[]};
    }
//{this.state.data.map(function(val){self.displayMap(val);})}
    render(){
        var self = this;
        console.log("YGHG");
        return(
           <div>
               {this.state.data.map(function(val){ return <Widget username="admin" password="district" id={val.id} key={Math.random()}/>;})}
           </div>
        );
    }
    componentWillMount(){
        this.getMapsData();
        console.log("HAHAHHAHHAHAH");
    }
    displayMap(val){
        console.log("heheheh");
        return <Widget username="admin" password="district" id={val.id} key={Math.random()}/>
    }
    getMapsData(){
        console.log("begin");
        var outputData= [];
        var  username = 'admin',
            password = 'district',
           // url = 'http://' + username + ':' + password + '@192.168.189.1:8082/api/maps.json';
            url = 'http://192.168.189.1:8082/api/maps.json';

        var self =this;

        console.log(url);
        $.ajax({
            url : url,
            type: 'GET',
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            },
            success : function (data) {
                console.log(data);
                for (var i = 0; i < data.maps.length; i++) {
                    var id = data.maps[i].id;
                    var name = data.maps[i].displayName;
                    outputData.push({id: id, name: name});
                }
                self.setState({data:outputData});
            }
        });

        this.setState({data:outputData});
        console.log(outputData);
    }


}


module.exports = Parent;




