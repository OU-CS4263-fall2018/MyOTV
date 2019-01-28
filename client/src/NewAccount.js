import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
  } from 'react-router-dom'

class NewAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
        <div className="d-flex justify-content-center">
            <div className="col-md-4">
                <form role="form">
                    {/*<div className="text-center mb-1">                       
                        <Link to="/login" ><img src={require('./assets/images/loginlogo.png')} class="responsive" alt="Who's On My WiFi" /></Link>
    </div>*/}
                    <div className="form-group">
                        <label for="user-email">Email address</label>
                        <input className="form-control" placeholder="Valid email address" type="email" id="user-email" />
                    </div>
                    <div className="form-group">
                        <label for="user-password">Password</label>
                        <input className="form-control" placeholder="Password" type="password" id="user-password" />
                    </div>
                    <div className="form-group">
                        <label for="user-password">Confirm Password</label>
                        <input className="form-control" placeholder="Confirm Password" type="password" id="user-password" />
                    </div>
                    <div class="form-group text-center">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    <div class="form-group text-center">
                        &nbsp;Have an account? &nbsp;<Link to="/login">Login here.</Link>
                    </div>
                    
                </form>         
            </div>         
        </div>
    );
  }
}

export default NewAccount;