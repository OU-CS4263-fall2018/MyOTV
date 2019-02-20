import React, { Component } from 'react';
import '../App.css';
import '../assets/stylesheets/Vitals.css'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    Redirect
  } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../redux/actions/userActions';
import Card from './Card';

class VitalsLog extends Component {
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
      <div className='vitals'>
        <p>+ Add Log</p>
        <h5 style={{color: '#4BA9FA', paddingTop: '30px'}}>##/##/####</h5>
        <Card />
        <div className='vitals'>
          <h5 style={{color: '#4BA9FA', paddingTop: '30px'}}>##/##/####</h5>
          <Card />
        </div>
        <div className='vitals'>
          <h5 style={{color: '#4BA9FA', paddingTop: '30px'}}>##/##/####</h5>
          <Card />
        </div>
        <div className='vitals'>
          <h5 style={{color: '#4BA9FA', paddingTop: '30px'}}>##/##/####</h5>
          <Card />
        </div>
        <div className='vitals'>
          <h5 style={{paddingTop: '30px'}}>##/##/####</h5>
          <Card />
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
)(VitalsLog); 
