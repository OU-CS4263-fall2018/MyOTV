import React, { Component } from 'react';
import Modal from 'react-modal';
import ReactLoading from 'react-loading';
import './Account.css';

const domContainer = document.querySelector('#container');
//ReactDOM.render(App, domContainer);
Modal.setAppElement('#root')

//Displays basic store info
class StoreInfo extends React.Component {
  render() {
    return (
      <div>
        <h5 class="heading section-header">Store Information</h5>
        <p>Store Manager: {this.props.storeManager} </p>
        <p>Authorized Employees: {this.props.authorizedEmployees}</p>
        <p>Number of Cameras: {this.props.numCameras}</p>
        <p>Time Zone: {this.props.timeZone}</p>
        <p>Hours of Operation: {this.props.hoursOperation}</p>
      </div>
    )
  }
}

//Displays a map of the store
class StoreMap extends React.Component {
  render() {
    return (
      <div>
        <h5 class="heading">Store Map</h5>
        <p><img src='https://i.pinimg.com/originals/a3/fd/0f/a3fd0f6c3b30ad7fefed5251b5d21673.png'
          alt="Store Map"
          style={{ width: 400, height: 400 }}></img></p>
      </div>
    )
  }
}

// Camera object contains camera name, location, thumbnail, and what kind of FRS it uses.
class Camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      location: "",
      thumbnail: "",
      demographicFrsOn: true,
      emotionalFrsOn: true,
    };
  }

  //Change camera name
  changeName(newName) {
    this.setState({ name: newName });
  }

  //Change location
  changeLocation(newLocation) {
    this.setState({ location: newLocation });
  }

  //Change thumbnail image
  changeThumbnail(newImage) {
    this.setState({ thumbnail: newImage });
  }

  //Turn demographic FRS on/off
  toggleDemographicFRS(setOn) {
    if (setOn === true) {
      this.setState({ demographicFrsOn: true });
    }
    else {
      this.setState({ demographicFrsOn: false });
    }
  }

  //Turn emotional FRS on/off
  toggleEmotionalFRS(setOn) {
    if (setOn === true) {
      this.setState({ emotionalFrsOn: true });
    }
    else {
      this.setState({ emotionalFrsOn: false });
    }
  }
}

// List of cameras to be displayed in "Manage Cameras" section
class CameraList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cameraList: [
        new Camera("Camera 1", "Produce Aisle", "https://thumbor.forbes.com/thumbor/1280x868/https%3A%2F%2Fblogs-images.forbes.com%2Fmarciaturner%2Ffiles%2F2018%2F01%2FWegmans-Produce-1.jpg", true),
        new Camera("Camera 2", "Aisle 2", "https://c1.staticflickr.com/7/6088/6075050600_ab3c24a0fb_b.jpg", true),
        new Camera("Camera 3", "Checkout 3", "https://www.sgvtribune.com/wp-content/uploads/migration/2014/201405/NEWS_140519373_AR_0_JCGPQNZUQULS.jpg?w=620", true),
      ],
    };
  }

  // Add camera to CameraList
  addCamera(name, location, frsOn) {
    var temp = new Camera(name, location, frsOn);
    this.state.cameraList.push();
  }

  // Display CameraList in an image carousel
  render() {
    return (
      <div class="scrolling-wrapper">
        cameraList.forEach(Camera => {
          <div class="camera-card"><h2>name</h2></div>
        });
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
      cameraModalIsOpen: false,
      emailModalIsOpen: false,
      passwordModalIsOpen: false,
      videoModalIsOpen: false,
      sampleRateModalIsOpen: false,
      graphUpdateRateModalIsOpen: false,
      mapModalIsOpen: false,
      uploadingModalIsOpen: false,
      successModalIsOpen: false,

      // variables for each item in "Store Info" section
      storeManager: "Cody Degner",
      authorizedEmployees: "Emma Greene, Mengrui Luo, Timo Sheridan, Delano Usiukiewicz, Richard Yang",
      numCameras: 14,
      timeZone: "US/Central",
      hoursOperation: "M-F 9am-7pm",

      // temp variables for "Store Info" to be used when infoModal is open
      tempStoreManager: "Cody Degner",
      tempAuthorizedEmployees: "Emma Greene, Mengrui Luo, Timo Sheridan, Delano Usiukiewicz, Richard Yang",
      tempNumCameras: 14,
      tempTimeZone: "US/Central",
      tempHoursOperation: "M-F 9am-7pm",

      // variables for image sample rate and graph update rate
      sampleRate: "5",
      graphUpdateRate: "15 minutes",

      // upload video path
      camera: "camera1",
      mediaPath: "",
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.editCamera = this.editCamera.bind(this);
  }

  async handleFormSubmit(event) {
    event.preventDefault();

    // close modal
    this.closeModal("video");

    this.openModal("upload");

    // build form 
    let data = new FormData();
    data.append('file', this.uploadInput.files[0]);

    // upload form
    let uploadResponse = await fetch('/amazon/upload', {
      method: 'POST',
      body: data,
    });

    let uploadInfo = await uploadResponse.json();
    let mediaPath = uploadInfo.mediaPath;

    // analyze the video
    let processMediaResponse = await fetch("/amazon/processMedia",
      {
        headers: {
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          mediaPath: mediaPath,
          camera: this.state.camera,
          interval: this.state.sampleRate
        }),
      });

    let myJSON = await processMediaResponse.json();
    this.closeModal("upload");
    this.openModal("success");
    console.log("myJSON = " + JSON.stringify(myJSON.response));
    console.log("done with handleFormSubmit")
  }

  // Open the appropriate modal based on the argument passed
  openModal(button) {
    if (button === "info") {
      this.setState({ infoModalIsOpen: true });
    }
    else if (button === "camera") {
      this.setState({ cameraModalIsOpen: true });
    }
    else if (button === "email") {
      this.setState({ emailModalIsOpen: true });
    }
    else if (button === "password") {
      this.setState({ passwordModalIsOpen: true });
    }
    else if (button === "video") {
      this.setState({ videoModalIsOpen: true });
    }
    else if (button === "setSampleRate") {
      this.setState({ setSampleRateModalIsOpen: true });
    }
    else if (button === "setGraphUpdateRate") {
      this.setState({ setGraphUpdateRateModalIsOpen: true });
    }
    else if (button === "map") {
      this.setState({ mapModalIsOpen: true });
    }
    else if (button === "upload") {
      this.setState({ uploadingModalIsOpen: true });
    }
    else if (button === "success") {
      this.setState({ successModalIsOpen: true });
    }
  }

  // Close the appropriate modal based on the argument passed
  closeModal(button) {
    if (button === "info") {
      this.setState({ infoModalIsOpen: false });
    }
    else if (button === "camera") {
      this.setState({ cameraModalIsOpen: false });
    }
    else if (button === "email") {
      this.setState({ emailModalIsOpen: false });
    }
    else if (button === "password") {
      this.setState({ passwordModalIsOpen: false });
    }
    else if (button === "video") {
      this.setState({ videoModalIsOpen: false });
    }
    else if (button === "setSampleRate") {
      this.setState({ setSampleRateModalIsOpen: false });
    }
    else if (button === "setGraphUpdateRate") {
      this.setState({ setGraphUpdateRateModalIsOpen: false });
    }
    else if (button === "map") {
      this.setState({ mapModalIsOpen: false });
    }
    else if (button === "upload") {
      this.setState({ uploadingModalIsOpen: false });
    }
    else if (button === "success") {
      this.setState({ successModalIsOpen: false });
    }
  }

  // functions to edit storeInfo items
  editStoreManager(e) {
    this.setState({ tempStoreManager: e.target.value });
  }

  editAuthorizedEmployees(e) {
    this.setState({ tempAuthorizedEmployees: e.target.value })
  }

  editNumCameras(e) {
    this.setState({ tempNumCameras: e.target.value })
  }

  editTimeZone(e) {
    this.setState({ tempTimeZone: e.target.value })
  }

  editHoursOperation(e) {
    this.setState({ tempHoursOperation: e.target.value })
  }

  editCamera(e) {
    this.setState({ camera: e.target.value });
  }

  // Save changes to Store Info section and close relevant modal
  saveChanges(modal) {
    this.closeModal(modal);

    this.setState({ storeManager: this.state.tempStoreManager });
    this.setState({ tempStoreManager: this.state.storeManager });

    this.setState({ authorizedEmployees: this.state.tempAuthorizedEmployees });
    this.setState({ tempAuthorizedEmployees: this.state.authorizedEmployees });

    this.setState({ numCameras: this.state.tempNumCameras });
    this.setState({ tempNumCameras: this.state.numCameras });

    this.setState({ timeZone: this.state.tempTimeZone });
    this.setState({ tempTimeZone: this.state.timeZone });

    this.setState({ hoursOperation: this.state.tempHoursOperation });
    this.setState({ tempHoursOperation: this.state.hoursOperation });

    this.renderStoreInfo();
  }

  // update sample rate and close the modal
  saveSampleRate(modal) {
    this.closeModal(modal);
    var newRate = document.getElementById("selectSampleRate");
    this.setState({ sampleRate: newRate.options[newRate.selectedIndex].value });
  }

  // update graph update rate and close the modal
  saveGraphUpdateRate(modal) {
    this.closeModal(modal);
    var newRate = document.getElementById("selectGraphUpdateRate");
    this.setState({ graphUpdateRate: newRate.options[newRate.selectedIndex].value });
  }

  // render the StoreInfo component
  renderStoreInfo() {
    return <StoreInfo />;
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
              {/* display rate at which images are taken from camera video */}
              <div class="col-sm-4 text-center">
                <p>Image Sample Rate: {this.state.sampleRate}</p>
                {/* "Change" button opens a modal allowing user to edit image sample rate */}
                <button type="button" class="btn btn-outline-primary" onClick={() => this.openModal("setSampleRate")}>Change</button>
                <Modal
                  isOpen={this.state.setSampleRateModalIsOpen}
                  onRequestClose={this.closeModal}
                  style={{
                    content: {
                      margin:"auto",
                      height:"50%",
                      width:"50%"
                    }
                  }}
                  contentLabel="Set Sample Rate Modal"
                >
                  <div class="page-header">
                    <h4>Change Sample Rate</h4>
                  </div>
                  <div>
                    <form>
                      <div class="form-group">
                        <label for="sel1">Choose how often to take pictures for analysis:</label>
                        <select class="form-control" id="selectSampleRate">
                          <option>1 second</option>
                          <option>5 seconds</option>
                          <option>10 seconds</option>
                          <option>15 seconds</option>
                          <option>20 seconds</option>
                          <option>30 seconds</option>
                          <option>45 seconds</option>
                          <option>1 minute</option>
                          <option>1.5 minutes</option>
                          <option>2 minutes</option>
                        </select>
                      </div>
                      <button type="submit" class="btn btn-primary" onClick={() => this.saveSampleRate("setSampleRate")}>Submit Changes</button>
                      <button type="button" class="btn btn-secondary" onClick={() => this.closeModal("setSampleRate")}>Close</button>
                    </form>
                  </div>
                </Modal>
              </div>

              {/* displays rate at which graphs are updated with new data */}
              <div class="col-sm-4 text-center">
                <p>Graph Update Rate: {this.state.graphUpdateRate}</p>
                {/* "Change" button opens a modal allowing user to change the graph update rate */}
                <button type="button" class="btn btn-outline-primary" onClick={() => this.openModal("setGraphUpdateRate")}>Change</button>
                <Modal
                  isOpen={this.state.setGraphUpdateRateModalIsOpen}
                  onRequestClose={this.closeModal}
                  style={{
                    content: {
                      margin:"auto",
                      height:"50%",
                      width:"50%"
                    }
                  }}
                  contentLabel="Set Graph Update Rate Modal"
                >
                  <div class="page-header">
                    <h4>Change Graph Update Rate</h4>
                  </div>
                  <div>
                    <form>
                      <div class="form-group">
                        <label for="sel1">Choose how often to take update visualizations with new data:</label>
                        <select class="form-control" id="selectGraphUpdateRate">
                          <option>15 minutes</option>
                          <option>30 minutes</option>
                          <option>1 hour</option>
                          <option>3 hours</option>
                          <option>6 hours</option>
                          <option>1 day</option>
                          <option>2 days</option>
                          <option>1 week</option>
                        </select>
                      </div>
                      <button type="submit" class="btn btn-primary" onClick={() => this.saveGraphUpdateRate("setGraphUpdateRate")}>Submit Changes</button>
                      <button type="button" class="btn btn-secondary" onClick={() => this.closeModal("setGraphUpdateRate")}>Close</button>
                    </form>
                  </div>
                </Modal>
              </div>

              <div class="col-sm-4 text-center">
                {/* "Change Email" button opens a modal to allow user to change their email */}
                <button type="button" class="btn btn-outline-primary" onClick={() => this.openModal("email")}>Change Email</button>
                <Modal
                  isOpen={this.state.emailModalIsOpen}
                  onRequestClose={this.closeModal}
                  style={{
                    content: {
                      margin:"auto",
                      height:"50%",
                      width:"50%"
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
                      margin:"auto",
                      height:"60%",
                      width:"60%"
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
          </div>

          {/* Manage Cameras section allows users to view, edit, and add cameras used for FRS */}
          <div>
            <h5 class="heading">Manage Cameras</h5>

            {/* Carousel */}
            <div id="cameraCarousel" class="carousel slide" data-ride="carousel" data-interval="false">

              {/* Carousel Indicators */}
              <ul class="carousel-indicators">
                <li data-target="#cameraCarousel" data-slide-to="0" class="active"></li>
                <li data-target="#cameraCarousel" data-slide-to="1" class="active"></li>
              </ul>

              {/* Slideshow */}
              <div class="carousel-inner">
                <div class="carousel-item active">
                  <div class="row">
                    <div class="col">
                      <a href="#0">
                        <img src="https://thumbor.forbes.com/thumbor/1280x868/https%3A%2F%2Fblogs-images.forbes.com%2Fmarciaturner%2Ffiles%2F2018%2F01%2FWegmans-Produce-1.jpg" alt="Produce Aisle" class="img-responsive"></img>
                      </a>
                    </div>
                    <div class="col">
                      <a href="#1">
                        <img src="https://c1.staticflickr.com/7/6088/6075050600_ab3c24a0fb_b.jpg" alt="Aisle 2"></img>
                      </a>
                    </div>
                    <div class="col">
                      <a href="#2">
                        <img src="https://www.sgvtribune.com/wp-content/uploads/migration/2014/201405/NEWS_140519373_AR_0_JCGPQNZUQULS.jpg?w=620" alt="Checkout 3" class="img-responsive"></img>
                      </a>
                    </div>
                  </div>
                </div>

                <div class="carousel-item">
                  <div class="row">
                    <div class="col">
                      <a href="#3">
                        <img src="https://prods3.imgix.net/images/articles/2018_03/nonfeatured-salvation-army-grocery-store.jpg?auto=format%2Ccompress&dpr=2&ixjsv=2.2.3&q=50&w=520" alt="Freezer Aisle" class="img-responsive"></img>
                      </a>
                    </div>
                    <div class="col">
                      <a href="#4">
                        <img src="https://image.oregonlive.com/home/olive-media/width620/img/ent_impact_dining/photo/img-5160jpg-493d23b7beb1636c.jpg" alt="Produce Aisle 2"></img>
                      </a>
                    </div>
                    <div class="col">
                      <a href="#5">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/Self_checkout_using_NCR_Fastlane_machines.jpg" alt="Self Checkout" class="img-responsive"></img>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Controls */}
              <a class="carousel-control-prev" href="#cameraCarousel" data-slide="prev">
                <span class="carousel-control-prev-icon"></span>
              </a>
              <a class="carousel-control-next" href="#cameraCarousel" data-slide="next">
                <span class="carousel-control-next-icon"></span>
              </a>
            </div>

            <div class="row">
              <div class="col-sm-3">
                {/* "Add Camera" button opens a modal to allow user to add a new camera for FRS */}
                <button type="button" class="btn btn-outline-primary" onClick={() => this.openModal("camera")}>Add Camera</button>
                <Modal
                  isOpen={this.state.cameraModalIsOpen}
                  onRequestClose={this.closeModal}
                  style={{
                    content: {
                      margin:"auto",
                      height:"70%",
                      width:"70%"
                    }
                  }}
                  contentLabel="Add Camera Modal"
                >
                  <div class="page-header">
                    <h4>Add Camera</h4>
                  </div>
                  <div>
                    <form>
                      <div class="form-group row">
                        <label for="cameraName" class="col-sm-2 col-form-label">Camera Name</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="cameraName"></input>
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="cameraLocation" class="col-sm-2 col-form-label">Camera Location</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="cameraLocation"></input>
                        </div>
                      </div>
                      <fieldset class="form-group">
                        <div class="row">
                          <legend class="col-form-label col sm-2 pt-0">FRS Demographics</legend>
                          <div class="form col-sm-10">
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="frsDemographicsRadio" id="frsDemographicsOn" value="on" checked></input>
                              <label class="form-check-label" for="frsDemographicsOn">
                                On
                            </label>
                            </div>
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="frsDemographicsRadio" id="frsDemographicsOff" value="off"></input>
                              <label class="form-check-label" for="frsDemographicsOff">
                                Off
                            </label>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      <fieldset class="form-group">
                        <div class="row">
                          <legend class="col-form-label col sm-2 pt-0">FRS Emotions</legend>
                          <div class="col-sm-10">
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="frsEmotionsRadio" id="frsEmotionsOn" value="on" checked></input>
                              <label class="form-check-label" for="frsEmotionsOn">
                                On
                            </label>
                            </div>
                            <div class="form-check">
                              <input class="form-check-input" type="radio" name="frsEmotionsRadio" id="frsEmotionsOff" value="off"></input>
                              <label class="form-check-label" for="frsEmotionsOff">
                                Off
                            </label>
                            </div>
                          </div>
                        </div>
                      </fieldset>
                      <div class="form-group row">
                        <label for="cameraSource" class="col-sm-2 col-form-label">Camera Source</label>
                        <div class="custom-file col-sm-10">
                          <input type="file" class="form-control-file" id="cameraSource"></input>
                        </div>
                      </div>
                      <button type="submit" class="btn btn-primary" onClick={() => this.closeModal("camera")}>Submit Changes</button>
                      <button type="button" class="btn btn-secondary" onClick={() => this.closeModal("camera")}>Close</button>
                    </form>
                  </div>
                </Modal>
              </div>

              {/* "Upload video" button opens a modal to allow user to upload footage they already have */}
              <div class="col-sm-3">
                <button type="button" class="btn btn-outline-primary mt-1" onClick={() => this.openModal("video")}>Upload Photo/Video</button>
                <Modal
                  isOpen={this.state.videoModalIsOpen}
                  onRequestClose={this.closeModal}
                  style={{
                    content: {
                      margin:"auto",
                      height:"50%",
                      width:"50%"
                    }
                  }}
                  contentLabel="Upload Video Modal"
                >
                  <div class="page-header">
                    <h4>Upload Photo/Video</h4>
                  </div>
                  <div>
                    <label for="upload" class="col-form-label">Choose a photo or video to upload.</label>
                    <form method="POST" encType="multipart/form-data" onSubmit={this.handleFormSubmit}>
                      <input type="file" name="upload" ref={(ref) => { this.uploadInput = ref; }}></input>
                      <button type="submit" value="upload" class="btn btn-primary">Upload</button>
                      <button type="button" class="btn btn-secondary" onClick={() => this.closeModal("video")}>Close</button>
                    </form>
                  </div>
                </Modal>
              </div>
            </div>
          </div>

          {/* Modal to alert user that their video is being processed */}
          <Modal
            isOpen={this.state.uploadingModalIsOpen}
            onRequestClose={this.closeModal}
            style={{
              content: {
                margin:"auto",
                height:"30%",
                width:"30%"
              }
            }}
            contentLabel="Data Uploading Modal"
          >
            <div class="text-center">
              <div class="page-header">
                <h4>Please wait while your photo or video is uploaded.</h4>
              </div>
              <div class="text-center">
                <ReactLoading
                  type="bubbles"
                  style={{
                    margin: "auto",
                    height: "20%",
                    width: "20%",
                  }}
                ></ReactLoading>
              </div>
            </div>
          </Modal>

          {/* Modal to alert user that the upload has completed */}
          <Modal
            isOpen={this.state.successModalIsOpen}
            onRequestClose={this.closeModal}
            style={{
              content: {
                margin:"auto",
                height:"30%",
                width:"30%"
              }
            }}
            contentLabel="Upload Success Modal"
          >
            <div class="text-center">
              <div class="page-header">
                <h4>Success! Your photo or video has been uploaded.</h4>
              </div>
              <div>
                <form>
                  <button type="button" class="btn btn-primary" onClick={() => this.closeModal("success")}>Close</button>
                </form>
              </div>
            </div>
          </Modal>

          <div class="row">
            {/* Store Info section contains basic information about store employees, manager, hours, etc. */}
            <div class="info col-sm-6">
              {/* load all StoreInfo variables */}
              <StoreInfo storeManager={this.state.storeManager} authorizedEmployees={this.state.authorizedEmployees}
                numCameras={this.state.numCameras} timeZone={this.state.timeZone} hoursOperation={this.state.hoursOperation} />
              {/* "Edit Store Info" button opens a modal to allow user to edit the store information */}
              <button type="button" class="btn btn-outline-primary" onClick={() => this.openModal("info")}>Edit Store Info</button>
              <Modal
                isOpen={this.state.infoModalIsOpen}
                onRequestClose={this.closeModal}
                style={{
                  content: {
                    margin:"auto",
                    height:"75%",
                    width:"70%"
                  }
                }}
                contentLabel="Edit Info Modal"
              >
                <div class="page-header">
                  <h4>Edit Store Information</h4>
                </div>
                <div>
                  <form>
                    <div class="form-group row">
                      <label for="storeManager" class="col-sm-2 col-form-label">Store Manager</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" id="storeManager" value={this.state.tempStoreManager} onChange={(e) => this.editStoreManager(e)}></input>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="authorizedEmployees" class="col-sm-2 col-form-label">Authorized Employees</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" id="authorizedEmployees" value={this.state.tempAuthorizedEmployees} onChange={(e) => this.editAuthorizedEmployees(e)}></input>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="numCameras" class="col-sm-2 col-form-label">Number of Cameras</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" id="numCameras" value={this.state.tempNumCameras} onChange={(e) => this.editNumCameras(e)}></input>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="timeZone" class="col-sm-2 col-form-label">Time Zone</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" id="timeZone" value={this.state.tempTimeZone} onChange={(e) => this.editTimeZone(e)}></input>
                      </div>
                    </div>
                    <div class="form-group row">
                      <label for="hoursOfOperation" class="col-sm-2 col-form-label">Hours of Operation</label>
                      <div class="col-sm-10">
                        <input type="text" class="form-control" id="hoursOfOperation" value={this.state.tempHoursOperation} onChange={(e) => this.editHoursOperation(e)}></input>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary" onClick={() => this.saveChanges("info")}>Submit Changes</button>
                    <button type="button" class="btn btn-secondary" onClick={() => this.closeModal("info")}>Close</button>
                  </form>
                </div>
              </Modal>
            </div>
            {/* store map image */}
            <div class="col-sm-6">
              <StoreMap />
              {/* "Upload Map" button opens a modal to allow user to upload a new store map */}
              <button type="button" class="btn btn-outline-primary" onClick={() => this.openModal("map")}>Upload Map</button>
              <Modal
                isOpen={this.state.mapModalIsOpen}
                onRequestClose={this.closeModal}
                style={{
                  content: {
                    margin:"auto",
                    height:"50%",
                    width:"50%"
                  }
                }}
                contentLabel="Upload Map Modal"
              >
                <div class="page-header">
                  <h4>Upload Map</h4>
                </div>
                <div>
                  <label for="mapUpload" class="col-form-label">Choose a map to upload.</label>
                  <form>
                    <input type="file" name="mapUpload"></input>
                    <button type="submit" value="upload" class="btn btn-primary" onClick={() => this.closeModal("map")}>Upload</button>
                    <button type="button" class="btn btn-secondary" onClick={() => this.closeModal("map")}>Close</button>
                  </form>
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Account;
