import React from 'react';
import MessageLine from 'components/Message/AllMessages/MessageLine/message-line';

class AllMessages extends React.Component {

    constructor() {
        super();
    }

    render() {
        let messages = [];
        this.props.messages.map((val, id) => {
            messages.push(<MessageLine message={val} selectMessage={this.props.selectMessage} key={id + "message"}/>);
        });

        return(
            <div className="container">
            <h2>All messages</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Sender</th>
                        <th>Subject</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {messages}
                </tbody>
            </table>
            </div>
        );
    }
}

module.exports = AllMessages;