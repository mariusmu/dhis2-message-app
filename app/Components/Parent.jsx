/**
 * Created by ophelie on 18/11/2016.
 */

import React from 'react';
import Widget from './Widget';
import PivotRow from './PivotRow';
import { Row } from 'react-bootstrap';

/**
 * Parent component responsible for displaying datas for maps, charts and reportTables
 */
class Parent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data:[],type:this.props.type, searchPivot:''};
    }
    render() {
        var self = this;

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
                                <input type="text" className="form-control" onChange={this._sortSearch.bind(this)} placeholder="Search for..." value={this.state.searchPivot}/>
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
                                <input type="text" className="form-control" onChange={this._sortSearch.bind(this)} placeholder="Search for..." value={this.state.searchPivot}/>
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
        this.getGraphsData(this.props.type, 1, []);
    }
    componentWillReceiveProps(nextProps){
        if(this.state.type !== nextProps.type){
            this.setState({searchPivot:''});
        }
        this.setState({type:nextProps.type});
        this.getGraphsData(nextProps.type, 1, []);
    }

    /**
     * Recursive function to request all the data to the API, store result in a state
     * @param type: type of the data
     * @param page: number of the json page
     * @param outputData: array of results
     */
    getGraphsData(type, page, outputData){

        var  username = 'admin',
            password = 'district',
            url = 'http://localhost:8082/api/'+type+'.json?page='+page.toString();

        var self =this;

        //ajax request
        $.ajax({
            url : url,
            type: 'GET',
            headers: {
                "Authorization": "Basic " + btoa(username + ":" + password)
            },
            success : function (data) {
                //maps
                if(type==="maps"){
                    for (var i = 0; i < data.maps.length; i++) {
                        var id = data.maps[i].id;
                        var name = data.maps[i].displayName;
                        //set to visible only the first 15th
                        if(i<15 && page ===1){
                            outputData.push({id: id, name: name, visible:true});
                        }
                        else{
                            outputData.push({id: id, name: name, visible:false});
                        }
                    }
                }
                //charts
                else if (type ==="charts"){
                    for (var i = 0; i < data.charts.length; i++) {
                        var id = data.charts[i].id;
                        var name = data.charts[i].displayName;
                        //set to visible only the first 15th
                        if(i<15 && page ===1){
                            outputData.push({id: id, name: name, visible:true});
                        }
                        else{
                            outputData.push({id: id, name: name, visible:false});
                        }
                    }
                }
                //reportTables
                else if (type==='reportTables'){
                    for (var i = 0; i < data.reportTables.length; i++) {
                        var id = data.reportTables[i].id;
                        var name = data.reportTables[i].displayName;
                        outputData.push({id: id, name: name, visible:true});
                    }
                }

                self.setState({data:outputData,savedData:outputData});

                //if we didn't read all the json pages, go to the next one
                if(page<data.pager.pageCount){
                    self.getGraphsData(type, page+1, outputData);
                }
            }
        });
    }

    /**
     * Set visibility of datas according to search value
     * @param ev: event
     * @private
     */
    _sortSearch(ev){
        //set state search content
        this.setState({searchPivot:ev.target.value});

        var my_data = this.state.data;
        //regex expression
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
        //set state new data
        this.setState({data:my_data});
    }

    /**
     * set visibility of data according to search value after clicking button
     * @private
     */
    _searchSetDisplay(){
        var my_data = this.state.data;
        var reg = new RegExp('\\b'+this.state.searchPivot, 'i');
        for(var i =0; i<my_data.length; i++){
            my_data[i].visible = !(my_data[i].name.search(reg) === -1);
        }

        this.setState({data:my_data});
    }



}


module.exports = Parent;




