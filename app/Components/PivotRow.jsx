/**
 * Created by ophelie on 18/11/2016.
 */

import React from 'react';
import {Row} from 'react-bootstrap';
import ShareButton from './ShareButton';


/**
 * list row item for pivot table page
 */
class PivotRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {source:'',hidden:'list-group-item pivotHidden',hiddenShare:'pivotHidden',arrowPivot:'fa fa-arrow-left fa-lg'};
    }
    render(){
        return(
            <div>
                <button type="button" id={this.props.id} className="list-group-item" onClick={this._getHtmlTable.bind(this)}>
                    {this.props.name} <i className={this.state.arrowPivot}/>
                </button>
                <div className={this.state.hidden}>
                    <div>
                        <ShareButton id={this.props.id} source={this.state.source} type="reportTables"/>
                    </div>
                    <Row bsClass="text-center">
                        <div id={this.props.id+'piv'} className='imagePlugPivot'></div>
                    </Row>
                </div>
            </div>
        );
    }

    /**
     * get the html table of the current id reportTable,
     * inject it in the corresponding div
     * using the pivot table plugin
     * update arrows orientation
     * @private
     */
    _getHtmlTable(){
        //if hidden then show
        if(this.state.hidden==='list-group-item pivotHidden'){
            //set the arrow to open
            this.setState({hidden:'list-group-item',arrowPivot:'fa fa-arrow-down fa-lg'});

            //plugin init
            reportTablePlugin.url = "http://localhost:8082";
            reportTablePlugin.username = "admin";
            reportTablePlugin.password = "district";
            reportTablePlugin.loadingIndicator = true;
            var injectId=this.props.id+'piv';
            var r1 = { el: injectId, id: this.props.id };
            //plugin exec
            reportTablePlugin.load([r1]);

        }
        //if opened then hide
        else{
            this.setState({hidden:'list-group-item pivotHidden',arrowPivot:'fa fa-arrow-left fa-lg'});
        }


    }

}


module.exports = PivotRow;