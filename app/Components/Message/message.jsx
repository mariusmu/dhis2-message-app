import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {fetchAllMessages, selectMessage} from 'actions/message.action';
import ErrorDisplay from 'components/common/error-display';
import AllMessages from 'components/message/AllMessages/all-messages';
import ReadMessage from 'components/message/ReadMessage/read-message';

class Message extends React.Component {
    
    constructor() {
        super();
        this.state = {};
        this.routeState = "INIT";
        this.selectMessage = this.selectMessage.bind(this);
        
    }

    componentDidMount() {
        fetchAllMessages()(this.props.dispatch);
    }



    render() {
        let errorComponents = [];
        {
            this.props.messages_error.forEach((val, id) => {
                errorComponents.push(<ErrorDisplay error={val} key={id + "err"}/>);
            }
        )};

        return (
            this.props.selectedMessage == null ? 
                <AllMessages messages={this.props.messages} selectMessage={this.selectMessage} dispatch={this.props.dispatch}/> : 
                <ReadMessage message={this.props.messages.filter(
                    (val) => {
                        return val.id == this.props.selectedMessage})[0]} dispatch={this.props.dispatch}/>
        )
    }

    selectMessage(id) {
        if(id) {
            selectMessage(id)(this.props.dispatch);
        }
    }

    logout() {
        logOut()(this.props.dispatch);
    }

}

function mapStateToProps(state, ownprops) {
    
    return {
        messages: state.messages.messages,
        messages_error: state.messages.messages_error,
        selectedMessage: state.messages.selected_message
        
    };
}

// function mapDispatchToProps(dispatch) {
//     return bindActionCreators({createOAuthClient}, dispatch);
// }
module.exports = connect(mapStateToProps)(Message);