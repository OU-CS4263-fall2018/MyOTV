import React, { Component } from 'react';
import Modal from 'react-modal';
import '../App.css';

const domContainer = document.querySelector('#container');
//ReactDOM.render(App, domContainer);
Modal.setAppElement('#root')

//Displays basic user info
class UserInfo extends React.Component {
  render() {
    return (
      <div>
        <h5 class="heading section-header">User Information</h5>
        <p>Name: {this.props.name} </p>
        <p>Date of Birth: {this.props.dob}</p>
        <p>Age: {this.props.age}</p>
        <p>Address: {this.props.address}</p>
      </div>
    )
  }
}


// Account class displays all info for Account page
class Account extends React.Component {
  constructor() {
    super();

    // state contains data in variables used throughout Account page
    this.state = {
      // whether or not modal for each button in "Settings" section is open
      infoModalIsOpen: false,
      emailModalIsOpen: false,
      passwordModalIsOpen: false,

      // variables for each item in "User Info" section
      name: "MyOTV",
      dob: "05/09/2019",
      age: 0,
      address: "US",

      // temp variables for "User Info" to be used when infoModal is open
      tempName: "MyOTV",
      tempDob: "05/09/2019",
      tempAge: 0,
      tempAddress: "US",
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  async handleFormSubmit(event) {
    event.preventDefault();

  }

  // Open the appropriate modal based on the argument passed
  openModal(button) {
    if (button === "info") {
      this.setState({ infoModalIsOpen: true });
    }
    else if (button === "email") {
      this.setState({ emailModalIsOpen: true });
    }
    else if (button === "password") {
      this.setState({ passwordModalIsOpen: true });
    }
  }
  // Close the appropriate modal based on the argument passed
  closeModal(button) {
    if (button === "info") {
      this.setState({ infoModalIsOpen: false });
    }
    else if (button === "email") {
      this.setState({ emailModalIsOpen: false });
    }
    else if (button === "password") {
      this.setState({ passwordModalIsOpen: false });
    }
  }

  // functions to edit userInfo items
  editName(e) {
    this.setState({ tempName: e.target.value });
  }

  editDob(e) {
    this.setState({ tempDob: e.target.value })
  }

  editAge(e) {
    this.setState({ tempAge: e.target.value })
  }

  editAddress(e) {
    this.setState({ tempAddress: e.target.value })
  }

  // Save changes to User Info section and close relevant modal
  saveChanges(modal) {
    this.closeModal(modal);

    this.setState({ name: this.state.tempName });

    this.setState({ dob: this.state.tempDob });

    this.setState({ age: this.state.tempAge });

    this.setState({ address: this.state.tempAddress });

    this.setState({ hoursOperation: this.state.tempHoursOperation });

    this.renderUserInfo();
  }

  // render the UserInfo component
  renderUserInfo() {
    return <UserInfo />;
  }

  // Render all components of Account
  render() {
    return (
      <div id="root">
        {/* page title */}
        <div class="panel panel-default">
          <div class="panel-heading"><h2>Account</h2></div>
        </div>

        {/* Settings section allows user to change image sample rate, graph update rate, and email/password */}
        <div>
          <h5 class="heading">Settings</h5>
          <div class="container">
            <div class="row">
              <div class="col-sm-4 text-center">
                {/* "Change Email" button opens a modal to allow user to change their email */}
                <button type="button" class="btn btn-outline-primary" onClick={() => this.openModal("email")}>Change Email</button>
                <Modal
                  isOpen={this.state.emailModalIsOpen}
                  onRequestClose={this.closeModal}
                  style={{
                    content: {
                      margin: "auto",
                      height: "50%",
                      width: "50%"
                    }
                  }}
                  contentLabel="Change Email Modal"
                >
                  <div class="page-header">
                    <h4>Change Email</h4>
                  </div>
                  <div>
                    <form>
                      <div class="form-group row">
                        <label for="newEmail" class="col-sm-2 col-form-label">New Email</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="newEmail"></input>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="confirmNewEmail" class="col-sm-2 col-form-label">Confirm New Email</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="confirmNewEmail"></input>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary" onClick={() => this.closeModal("email")}>Submit Changes</button>
                      <button type="button" class="btn btn-secondary" onClick={() => this.closeModal("email")}>Close</button>
                    </form>
                  </div>
                </Modal>
                {/* "Change Password" button opens a modal to allow user to change their password */}
                <button type="button" class="btn btn-outline-primary" onClick={() => this.openModal("password")}>Change Password</button>
                <Modal
                  isOpen={this.state.passwordModalIsOpen}
                  onRequestClose={this.closeModal}
                  style={{
                    content: {
                      margin: "auto",
                      height: "60%",
                      width: "60%"
                    }
                  }}
                  contentLabel="Change Password Modal"
                >
                  <div class="page-header">
                    <h4>Change Password</h4>
                  </div>
                  <div>
                    <form>
                      <div class="form-group row">
                        <label for="oldPassword" class="col-sm-2 col-form-label">Old Password</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="oldPassword"></input>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="newPassword" class="col-sm-2 col-form-label">New Password</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="newPassword"></input>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="confirmNewPassword" class="col-sm-2 col-form-label">Confirm New Password</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="confirmNewPassword"></input>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary" onClick={() => this.closeModal("password")}>Submit Changes</button>
                      <button type="button" class="btn btn-secondary" onClick={() => this.closeModal("password")}>Close</button>
                    </form>
                  </div>
                </Modal>
              </div>
            </div>
            <div class="row">
              {/* User Info section contains basic information about user employees, manager, hours, etc. */}
              <div class="info col-sm-6">
                {/* load all UserInfo variables */}
                <UserInfo name={this.state.name} dob={this.state.dob}
                  age={this.state.age} address={this.state.address} hoursOperation={this.state.hoursOperation} />
                {/* "Edit User Info" button opens a modal to allow user to edit the user information */}
                <button type="button" class="btn btn-outline-primary" onClick={() => this.openModal("info")}>Edit User Info</button>
                <Modal
                  isOpen={this.state.infoModalIsOpen}
                  onRequestClose={this.closeModal}
                  style={{
                    content: {
                      margin: "auto",
                      height: "75%",
                      width: "70%"
                    }
                  }}
                  contentLabel="Edit Info Modal"
                >
                  <div class="page-header">
                    <h4>Edit User Information</h4>
                  </div>
                  <div>
                    <form>
                      <div class="form-group row">
                        <label for="name" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="name" value={this.state.tempName} onChange={(e) => this.editName(e)}></input>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="dob" class="col-sm-2 col-form-label">Date of Birth</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="dob" value={this.state.tempDob} onChange={(e) => this.editDob(e)}></input>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="age" class="col-sm-2 col-form-label">Age</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="age" value={this.state.tempAge} onChange={(e) => this.editAge(e)}></input>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="address" class="col-sm-2 col-form-label">Address</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="address" value={this.state.tempAddress} onChange={(e) => this.editAddress(e)}></input>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary" onClick={() => this.saveChanges("info")}>Submit Changes</button>
                      <button type="button" class="btn btn-secondary" onClick={() => this.closeModal("info")}>Close</button>
                    </form>
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Account;
