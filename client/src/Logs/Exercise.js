import React, { Component } from 'react';
import '../App.css';
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

class ExerciseLog extends Component {
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
        <div class="home">
        <div className="d-flex p-2">
            <p>2/4/19</p>
        </div>
        <textarea value={"5 Push-Ups\n10 Crunches\n1 Mile Run"} 
        editable={false} style={{width:"800px", height:"100px"}}/>
        <div className="d-flex p-2">
            <p>2/5/19</p>
        </div>
        <textarea value={"5 Push-Ups\n10 Crunches\n1 Mile Run"} 
        editable={false} style={{width:"800px", height:"100px"}}/>
        <div className="d-flex p-2">
            <p>2/6/19</p>
        </div>
        <textarea value={"5 Push-Ups\n10 Crunches\n1 Mile Run"} 
        editable={false} style={{width:"800px", height:"100px"}}/>
        <div className="d-flex p-2">
            <p>2/7/19</p>
        </div>
        <textarea value={"5 Push-Ups\n10 Crunches\n1 Mile Run"} 
        editable={false} style={{width:"800px", height:"100px"}}/>
        <div className="d-flex p-2">
            <p>2/8/19</p>
        </div>
        <textarea value={"5 Push-Ups\n10 Crunches\n1 Mile Run"} 
        editable={false} style={{width:"800px", height:"100px"}}/>
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
)(ExerciseLog); 
