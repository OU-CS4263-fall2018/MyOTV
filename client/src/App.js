import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from './redux/actions/userActions';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'

import Login from './User/Login.js';
import NewAccount from './User/NewAccount.js';
import Account from './User/Account.js';
import Dashboard from './Pages/Dashboard.js';
import Logs from './Pages/Logs.js';
import Photos from './Pages/Photos.js';
import Settings from './User/Settings.js';
import SurvivorshipPlan from './Pages/SurvivorshipPlan.js';
import './assets/stylesheets/style.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      token: ""
    };
  }
  
  render() {
    const user = this.state.user;

    // change back to "!=="
    if (this.props.user !== ""){
      return (
        <Router>
          <div className="container-fluid">
            <nav class="navbar navbar-dark sticky-top bg-info flex-md-nowrap p-0">
              <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">MyOTV</a>
              <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search"/>
              <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                  <a class="nav-link" href="#">Sign out</a>
                </li>
              </ul>
            </nav>

            <div class="container-fluid">
              <div class="row">
                <nav class="col-md-2 d-none d-md-block bg-light sidebar">
                  <div class="sidebar-sticky">
                    <ul class="nav flex-column">
                      <li className="nav-item">
                        <Link className="nav-link" to="/dashboard">Dashboard</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/logs">Logs</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/survivorshipplan">Survivorship Plan</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/photos">Photos</Link>
                      </li>
                    </ul>
                  </div>
                </nav>

                <main role="main" className="col-md-10 ml-sm-auto col-lg-10 px-4 body">
                  <Switch>  
                    <Route path="/account" component={Account} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/logs" component={Logs} />
                    <Route path="/photos" component={Photos} />
                    <Route path="/settings" component={Settings} />
                    <Route path="/survivorshipplan" component={SurvivorshipPlan} />
                    <Redirect from="*" to="/dashboard"/>
                  </Switch>
                </main>

              </div>
            </div>
          </div>
        </Router>
      );
    }
    
    else {
      return (
        <Router>
          <div>
          <Switch>
            <Route path="/newaccount" component={NewAccount} />
            <Route path="/login" component={Login} />
            <Redirect from="*" to="/login"/>
          </Switch>           
          </div>
        </Router>
      );
    }
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
)(App); 