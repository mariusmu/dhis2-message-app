import React from 'react';
import {loginUser} from "actions/login.action"

class LoginForm extends React.Component {
    
    constructor() {
        super();
        this.state = {};
        this.logIn = this.logIn.bind(this);
        this.onValueChange = this.onValueChange.bind(this);
        
    }
    onValueChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    render() {
        return(
            <div className="container">
                
                <div className="col-md-12">
                
                    <h2>Log in with clientId {this.props.cid}</h2>
                </div>
                <div className="col-md-6">
                <form method="POST" action="#" onSubmit={this.logIn}>
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
                    
                    <button type="submit" className="btn btn-primary">Add client</button>
                    </form>
                </div>
                </div>);
    }
    logIn(e) {
        e.preventDefault();
        
        const username = this.state.username;
        const password = this.state.password;
        const cid = this.props.cid;

    
        loginUser(username, password, cid)(this.props.dispatch);
    }
}

module.exports = LoginForm;