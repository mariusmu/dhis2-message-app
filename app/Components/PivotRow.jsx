/**
 * Created by ophelie on 18/11/2016.
 */

import React from 'react';
import Image_boot from 'react-bootstrap/lib/Image';
import ShareButton from './ShareButton';
import domtoimage from 'dom-to-image';



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
                    <div className={this.state.hiddenShare}>
                        <ShareButton id={this.props.id} type="reportTables"/>
                    </div>
                    <Image_boot className='imagePivot' src={this.state.source}/>
                </div>
            </div>

        );
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
                self.setState({source:dataUrl, hiddenShare:''});

                $('#'+self.props.id +'m').remove();
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });

    }
    _getHtmlTable(){
        if(this.state.hidden==='list-group-item pivotHidden'){
            this.setState({hidden:'list-group-item',arrowPivot:'fa fa-arrow-down fa-lg'});

            console.log("ok");
            var  username = 'admin',
                password = 'district';
            var url = 'http://localhost:8082/api/reportTables/'+ this.props.id+'/data.html';
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
        else{
            this.setState({hidden:'list-group-item pivotHidden',arrowPivot:'fa fa-arrow-left fa-lg'});
        }


    }

}


module.exports = PivotRow;