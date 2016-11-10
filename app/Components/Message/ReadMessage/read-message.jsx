import React from 'react';
import { fetchAllConversations, unSelectMessage } from 'actions/message.action';
import Conversation from 'components/Message/ReadMessage/Conversation/conversation';
import NameLink from 'components/Message/ReadMessage/name-link';

class ReadMessage extends React.Component {
    constructor(props) {
        super(props);
        this.goBack = this.goBack.bind(this);
        this.click = this.click.bind(this);
        this.state = {};
        this.props.message.conversations = [];
        this.state.conversations = [];
        this.state.toNames = [];
        this.appendToName = this.appendToName.bind(this);
        fetchAllConversations(this.props.message.id)(this.props.dispatch);

    }

    /**
     * Recursive function to get the name of the users
     * from the child react component. Will be called from the 
     * conversation component
     * @param name the name object containing the name and id of the sender
     */
    appendToName(name) {
        if (name) {
           let updatedNameList = this.state.toNames;
           if(updatedNameList.indexOf(name) < 0)
                updatedNameList.push(name);
           this.setState({ toNames: updatedNameList });
        }
    }

    render() {
        let conversations = [];
        this.props.message.conversations.map((val, id) => {
            conversations.push(<Conversation appendToName={this.appendToName} users={this.props.users} conversation={val} key={id + "conv"} />);
        });

        let toFullNames = [];
        this.state.toNames.map((val, id) => {
            toFullNames.push(<NameLink name={val} key={id + "name"}/>);
        });

        return (

            <div className="container">
                
                <div className="messageTopDiv horizontalMenu">
                    <ul>
                        <li><button onClick={this.goBack} className="greyButtonLink">Go back</button></li>
                    </ul>
                </div>

                <h3>{this.props.message.subject}</h3>
                <div className="recipientsDiv">
                    <span className="pull-left to-desc">To: </span>
                    {toFullNames}
                </div>
                <br/>
                {conversations}
            </div>


        )
    }

    goBack() {
        unSelectMessage()(this.props.dispatch);
    }
}

module.exports = ReadMessage;