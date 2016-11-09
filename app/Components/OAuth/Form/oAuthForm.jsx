import React from 'react';
import {createOAuthClient, checkForOAuth, logOut} from "actions/oauth.action"

class oAuthForm extends React.Component {
    
    constructor() {
        super();
        this.state = {};
        this.createOAuth = this.createOAuth.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        
    }
    onValueChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    render() {
        return(
            <div className="container">
                <div className="col-md-12">
                    <h2>Create an oAuthClient</h2>
                </div>
                <div className="col-md-6">
                <form method="POST" action="#" onSubmit={this.createOAuth}>
                    <p/>
                    <input 
                        type="text" 
                        required="required" 
                        onChange={this.onValueChange} 
                        className="form-control" 
                        name="username" 
                        placeholder="Username"
                    />
                    <br/>
                    <input 
                        type="text"
                        required="required" 
                        onChange={this.onValueChange} 
                        className="form-control" 
                        name="password" 
                        placeholder="Password"
                    />
                    <p/>
                    <input 
                        type="text"
                        required="required" 
                        onChange={this.onValueChange} 
                        className="form-control" 
                        name="cid" 
                        placeholder="ClientId"
                    />
                    <p/>
                    <input 
                        type="text"
                        required="required" 
                        onChange={this.onValueChange} 
                        className="form-control" 
                        name="cname" 
                        placeholder="ClientName"
                    />
                    <p/>
                    <button type="submit" className="btn btn-primary">Add client</button>
                    </form>
                </div>
                </div>);
    }
    createOAuth(e) {
        console.log(this.props.dispatch);
        e.preventDefault();
        
        const username = this.state.username;
        const password = this.state.password;
        const cid = this.state.cid;
        const cname = this.state.cname;

        if(!cid) throw new Error("CID is not filled");
        if(!cname) throw new Error("CNAME is not specified");
        
        console.log(this.props.dispatch != null);
        createOAuthClient(username, password, cid, cname)(this.props.dispatch);
    }
}

module.exports = oAuthForm;