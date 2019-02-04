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

class MedicationLog extends Component {
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
        <div className="d-flex p-2">
        <div className="Checkbox Group">
            <p>2/4/19</p>
            <form>
            <input onChange={this.handleChange} type="checkbox" name="Meds" id="Meds1" />
            <label for="Meds"> Meds 1 </label>
            <br />
            <input onChange={this.handleChange} type="checkbox" name="Meds2" id="Meds2" />
            <label for="Meds2"> Meds 2 </label>
            <br />
            <input onChange={this.handleChange} type="checkbox" name="Meds3" id="Meds3" />
            <label for="Meds3">Meds 3 </label>
            </form>
            <p>2/5/19</p>
            <form>
            <input onChange={this.handleChange} type="checkbox" name="Meds" id="Meds1" />
            <label for="Meds"> Meds 1 </label>
            <br />
            <input onChange={this.handleChange} type="checkbox" name="Meds2" id="Meds2" />
            <label for="Meds2"> Meds 2 </label>
            <br />
            <input onChange={this.handleChange} type="checkbox" name="Meds3" id="Meds3" />
            <label for="Meds3">Meds 3 </label>
            </form>
            <p>2/6/19</p>
            <form>
            <input onChange={this.handleChange} type="checkbox" name="Meds" id="Meds1" />
            <label for="Meds"> Meds 1 </label>
            <br />
            <input onChange={this.handleChange} type="checkbox" name="Meds2" id="Meds2" />
            <label for="Meds2"> Meds 2 </label>
            <br />
            <input onChange={this.handleChange} type="checkbox" name="Meds3" id="Meds3" />
            <label for="Meds3">Meds 3 </label>
            </form>
            <p>2/7/19</p>
            <form>
            <input onChange={this.handleChange} type="checkbox" name="Meds" id="Meds1" />
            <label for="Meds"> Meds 1 </label>
            <br />
            <input onChange={this.handleChange} type="checkbox" name="Meds2" id="Meds2" />
            <label for="Meds2"> Meds 2 </label>
            <br />
            <input onChange={this.handleChange} type="checkbox" name="Meds3" id="Meds3" />
            <label for="Meds3">Meds 3 </label>
            </form>
            <p>2/8/19</p>
            <form>
            <input onChange={this.handleChange} type="checkbox" name="Meds" id="Meds1" />
            <label for="Meds"> Meds 1 </label>
            <br />
            <input onChange={this.handleChange} type="checkbox" name="Meds2" id="Meds2" />
            <label for="Meds2"> Meds 2 </label>
            <br />
            <input onChange={this.handleChange} type="checkbox" name="Meds3" id="Meds3" />
            <label for="Meds3">Meds 3 </label>
            </form>
        </ div>
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
)(MedicationLog); 
