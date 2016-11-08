/**
 * Created by ophelie on 07/11/2016.
 */

import React from 'react';


class ShareModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showModal: "modal fade" };
    }
    render() {
        return (<div className={this.state.showModal}>
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">Modal title</h4>
                            </div>
                            <div className="modal-body">
                                <p>One fine body&hellip;</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>);
    }
    _close(){
        this.setState({ showModal: "modal fade" });
    }
    open(){
        this.setState({ showModal: "modal fade in" });
    }

}

module.exports = ShareModal;
