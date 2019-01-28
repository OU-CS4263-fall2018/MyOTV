import React, { Component } from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
  } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from './redux/actions/userActions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: "",
        token: "",
        email: "",
        pw: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(event.target.value);
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    this.props.userActions.saveUser(this.state.email);
    this.props.userActions.saveToken(this.state.pw);
    this.setState({user: this.state.email, token: this.state.pw});
    console.log(this.state.user);
    event.preventDefault();
  }

  render() {
    return ( 
        <div className="d-flex justify-content-center">
            <div className="col-md-4">
                <form role="form">
                    {/*<div className="text-center mb-1">                       
                        <Link to="/login"><img src={require('./assets/images/loginlogo.png')} className="responsive" alt="Who's On My WiFi" /></Link>
    </div>*/}
                    <div className="form-group">
                        <label for="user-email">Email address</label>
                        <input className="form-control" placeholder="Valid email address" type="email" id="user-email" name="email" value={this.state.email} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group">
                        <label for="user-password">Password</label>
                        <input className="form-control" placeholder="Password" type="password" id="user-password" name="pw" value={this.state.pw} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group checkbox">
                        <label>
                            <input type="checkbox" id="user-remember" /> Keep me logged in
                        </label>
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
                    </div>
                    <div className="form-group text-center">
                        <a href="#">Forgot Password</a>&nbsp;|&nbsp;<Link to="/newaccount">New Account</Link>
                    </div>
                </form>         
            </div>         
        </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        user: state.userReducer,
        token: state.tokenReducer
    }
}
  
function mapDispatchToProps(dispatch) {
    return {
        userActions: bindActionCreators(userActions, dispatch),
    }
}
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login); 
