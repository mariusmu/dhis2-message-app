/**
 * Created by ophelie on 18/11/2016.
 */

import React from 'react';
import Widget from './Widget';
import PivotRow from './PivotRow';
import { Row } from 'react-bootstrap';


class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data:[],type:this.props.type, searchPivot:''};
    }
    render() {
        var self = this;
        console.log("coucou c'est moi");
        console.log(self.state.type);
        console.log(this.state.data);

        if (self.state.type === "reportTables") {
            return(
                <div id="mainContent">
                    <Row>
                        <div id="typeTitle" className="col-lg-12">
                            <h1>Favorite {self.state.type}</h1>
                        </div>
                    </Row>
                    <Row>
                        <div id="searchDivPivot" className="col-lg-6">
                            <div className="input-group">
                                <input type="text" className="form-control" onChange={this._sortSearch.bind(this)} placeholder="Search for..."/>
                                  <span className="input-group-btn">
                                    <button className="btn btn-default" type="button" onClick={this._searchSetDisplay.bind(this)}><i className="fa fa-search fa-lg"/></button>
                                  </span>
                            </div>
                        </div>
                    </Row>
                    <div>
                        {this.state.data.map(function (val) {
                            if(val.visible === true){
                                return <PivotRow id={val.id} name={val.name} key={Math.random()} /> ;
                            }
                        })}
                    </div>
                </div>
            );
        }
        else {
            return (
                <div id="mainContent">
                    <Row>
                        <div id="typeTitle" className="col-lg-12">
                            <h1>Favorite {self.state.type}</h1>
                        </div>
                    </Row>
                    <Row>
                        <div id="searchDivPivot" className="col-lg-6">
                            <div className="input-group">
                                <input type="text" className="form-control" onChange={this._sortSearch.bind(this)} placeholder="Search for..."/>
                                <span className="input-group-btn">
                                    <button className="btn btn-default" type="button" onClick={this._searchSetDisplay.bind(this)}><i className="fa fa-search fa-lg"/></button>
                                  </span>
                            </div>
                        </div>
                    </Row>
                    <div>
                        {this.state.data.map(function (val) {
                            if(val.visible === true){
                                return <Widget username="admin" password="district" id={val.id} name={val.name}
                                               type={self.state.type} key={Math.random()}/>;
                            }
                        })}
                    </div>
                </div>
            );
        }
    }
    componentWillMount(){
        this.setState({type:this.props.type});
        console.log("willMount");
        this.getGraphsData(this.props.type, 1, []);
    }
    componentWillReceiveProps(nextProps){
        this.setState({type:nextProps.type});
        console.log("willUpdate");
        console.log(this.state.type);
        this.getGraphsData(nextProps.type, 1, []);
    }
    displayMap(val){
        return <Widget username="admin" password="district" id={val.id} key={Math.random()}/>
    }
    getGraphsData(type, page, outputData){

       // var outputData2= [];
        var  username = 'admin',
            password = 'district',
           // url = 'http://' + username + ':' + password + '@192.168.189.1:8082/api/maps.json';
            url = 'http://localhost:8082/api/'+type+'.json?page='+page.toString();

        console.log(url);

        var self =this;

        $.ajax({
            url : url,
            type: 'GET',
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            },
            success : function (data) {
                console.log("page");
                console.log(page);
                if(type==="maps"){
                    for (var i = 0; i < data.maps.length; i++) {
                        var id = data.maps[i].id;
                        var name = data.maps[i].displayName;
                        if(i<15 && page ===1){
                            outputData.push({id: id, name: name, visible:true});
                        }
                        else{
                            outputData.push({id: id, name: name, visible:false});
                        }
                    }
                }
                else if (type ==="charts"){
                    for (var i = 0; i < data.charts.length; i++) {
                        var id = data.charts[i].id;
                        var name = data.charts[i].displayName;
                        if(i<15 && page ===1){
                            outputData.push({id: id, name: name, visible:true});
                        }
                        else{
                            outputData.push({id: id, name: name, visible:false});
                        }
                    }
                }
                else if (type==='reportTables'){
                    for (var i = 0; i < data.reportTables.length; i++) {
                        var id = data.reportTables[i].id;
                        var name = data.reportTables[i].displayName;
                        outputData.push({id: id, name: name, visible:true});
                    }
                }

                self.setState({data:outputData,savedData:outputData});
                console.log(outputData);

                if(page<data.pager.pageCount){
                    console.log(data.pager.pageCount);
                    console.log("got to page");
                    console.log(page+1);
                    self.getGraphsData(type, page+1, outputData);
                }

            }
        });

    }

    _sortSearch(ev){
        console.log(ev.target.value);
        this.setState({searchPivot:ev.target.value});

        var my_data = this.state.data;
        var reg = new RegExp('\\b'+ev.target.value, 'i');
        for(var i =0; i<my_data.length; i++){
            if(this.state.type==='reportTables'){
                my_data[i].visible = !(my_data[i].name.search(reg) === -1);
            }
            else{
                if (ev.target.value===''){
                    if(i<15){
                        my_data[i].visible = !(my_data[i].name.search(reg) === -1);
                    }
                    else{
                        my_data[i].visible = false;
                    }
                }
                else{
                    my_data[i].visible = !(my_data[i].name.search(reg) === -1);
                }
            }



        }

        this.setState({data:my_data});
    }
    _searchSetDisplay(){
        var my_data = this.state.data;
        console.log('look');
        console.log(my_data);
        var reg = new RegExp('\\b'+this.state.searchPivot, 'i');
        for(var i =0; i<my_data.length; i++){
            my_data[i].visible = !(my_data[i].name.search(reg) === -1);
        }

        this.setState({data:my_data});
    }



}


module.exports = Parent;




