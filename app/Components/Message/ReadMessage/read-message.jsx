import React from 'react';
import {unSelectMessage} from 'actions/message.action';

class ReadMessage extends React.Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
    }

    componentWillReceiveProps(props) {
        console.log(props);
    }

    componentDidMount() {
        console.log(this.props.message);
    }
    render() {
        return(
            <div className="container">
            <div className="messageTopDiv horizontalMenu">
                <ul>
                    <li><button onClick={this.goBack} className="greyButtonLink">Go back</button></li>
                </ul>
            </div>
            <h2>Hei {this.props.message.subject}</h2>
            </div>
            
        )
    }

    goBack() {
        unSelectMessage()(this.props.dispatch);
    }
}

module.exports = ReadMessage;