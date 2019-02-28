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
import Button from '@material-ui/core/Button';

class VitalsLog extends Component {
  constructor(props) {
    super(props);
    this.state = {
        user: "",
        token: "",
        email: "",
        pw: "",
        logs: []
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

  addLog() {
    let nextId = this.state.logs.length + 1;
    this.setState({logs: this.state.logs.concat([nextId])});
  }

  // Gets called everytime setState is called
  renderLogs() {
    return this.state.logs.map((logID) => {
       return <Card key={logID}/>;
    });
  }

  render() {
    return ( 
      <div>
        <Button style={{color:'#4BA9FA', marginTop: '10px'}} size="small" 
          onClick={this.addLog.bind(this)}>
            + Add Log
        </Button>
        {this.renderLogs()}
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
