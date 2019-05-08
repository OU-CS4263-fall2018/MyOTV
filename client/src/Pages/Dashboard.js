import React, { Component } from 'react';
import '../App.css';
import '../assets/stylesheets/style.css'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../redux/actions/userActions';
import Card from '@material-ui/core/Card';
import PropTypes from 'prop-types';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Toolbar from '@material-ui/core/Toolbar';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  root: {
    flexGrow: 1,
  },
  card: {
    width: 275,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});
var cardStyle = {
  display: 'block',
  width: '20vw',
  transitionDuration: '0.3s',
  height: '20vw',
  color: '#44689B'
}

var logCardStyle = {
  display: 'block',
  width: '10vw',
  height: '40vw',
  color: '#44689B'
}
var progressCardStyle = {
  display: 'block',
  width: '60vw',
  transitionDuration: '0.3s',
  height: '5vw',
  color: '#44689B',
}
var headerStyle = {
  variant: 'h4'

}

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class TextFields extends React.Component {
  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    return (
      <form noValidate autoComplete="off">
        <Typography>
          Hello
        </Typography>
        <Typography>
          Hello
        </Typography>
        <Grid container spacing={24}>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Exercise Activity
                </Typography>
                <TextField 
                  id="Exercise-Activity"
                  multiline
                />
                <br></br>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Mood
                </Typography>
                <TextField 
                  id="Mood"
                  multiline
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Pain
                </Typography>
                <TextField 
                  id="Pain"
                  multiline
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Enter Weight
                </Typography>
                <TextField 
                  id="Weight-Activity"
                />
                <br></br>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Vital Signs
                </Typography>
                <Typography>
                  Body Temperature
                </Typography>
                <TextField 
                  id="Body-Temp"
                />
                <Typography>
                  Pulse Rate
                </Typography>
                <TextField 
                  id="Pulse-Rate"
                />
                <Typography>
                  Blood Pressure
                </Typography>
                <TextField 
                  id="Blood-Pressure"
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Food Intake
                </Typography>
                <Typography>
                  Breakfast
                </Typography>
                <TextField 
                  id="Breakfasr"
                  multiline
                />

                <Typography>
                  Lunch
                </Typography>
                  <TextField 
                    id="Lunch"
                    multiline
                  />

                <Typography>
                  Dinner
                </Typography>
                  <TextField 
                    id="Dinner"
                    multiline
                  />

                <Typography>
                  Snacks
                </Typography>
                <TextField 
                    id="Snacks"
                    multiline
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Medications
                </Typography>
                <TextField
                  multiline
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};
class FullScreenDialog extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Open full-screen dialog
        </Button>
        <Dialog
          fullScreen
          open={this.state.open}
          onClose={this.handleClose}
          TransitionComponent={Transition}>
          <AppBar>

            <Toolbar>
              <Button color="inherit" onClick={this.handleClose}>
                X
              </Button>
              <Typography variant="h6" color="inherit" className='AppBar'>
                Enter All Logs: 11/26/2018
              </Typography>
              <Button color="inherit" onClick={this.handleClose} >
                Save
              </Button>
            </Toolbar>

          </AppBar>
          < TextFields />
          
        </Dialog>
          </div>
    );
  }
}
function CenteredGrid(props) {
  const { classes } = props;
  return (
    <div>
      <Grid container spacing={24}>
        <Grid item xs={9}>
          <Card style = {progressCardStyle}>
            <CardContent style = {headerStyle}>
              <Typography variant="h6">
                <p>Treatment Progress: <b>6</b>/12</p>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <FullScreenDialog />
        </Grid>

        <Grid item xs={3}>
          <Card style = {cardStyle}>
            <CardContent style = {headerStyle}>
            <Typography variant="h5">
              <p>Patient Info</p>
              <Typography>
              <p>My Name</p>
              <p>My Doctor</p>
              </Typography>
            </Typography>
            <Typography variant="h5">
              <p>Clinic Info</p>
              <Typography>
              <p>Clinic Name</p>
              <p>Doctor's Name</p>
              </Typography>
            </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card style = {cardStyle}>
            <CardContent style = {headerStyle}>
            <Typography variant="h5">
                <p>Recent Excersise Activity</p>
              </Typography>
              <Typography variant="h6">
              <p>11/26/2018: </p>
              </Typography>
              <Typography>
                <p>None: Too much pain
                </p>
              </Typography>
              <Typography variant="h6">
              <p>11/25/2018: </p>
              </Typography>
              <Typography>
                <p>20 min Run, Yoga</p>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card style = {cardStyle}>
            <CardContent>
              <Typography variant="h5">
              <p>Recent Weight Entries <br></br> </p>
              </Typography>
              <Typography>
              <p>11/26/2018 120lbs</p>
              <p>11/25/2018 120lbs</p>
              <p>11/24/2018 120lbs</p>
              <p>11/23/2018 120lbs</p>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card style = {cardStyle}>
            <CardContent style = {headerStyle}>
              <Typography variant="h5">
              <p>Recent Vital Signs  </p>
              </Typography>
              <Typography variant="h6">
              <p>11/26/2018: <br></br> </p>
              </Typography>
              <Typography>
              <p>Body Temperature: 97 F <br></br>
                 Pulse Rate: 40 beats/min <br></br>
                 Blood Pressure: 120/80 mm Hg <br></br>
              </p>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        

        <Grid item xs={3}>
          <Card style = {cardStyle}>
            <CardContent style = {headerStyle}>
              <Typography variant="h5">
                <p>Recent Food Activity</p>
              </Typography>
              <Typography variant="h6">
              <p>11/26/2018: </p>
              </Typography>
              <Typography>
                <p>Oatmeal and berries <br></br>
                  Granola
                </p>
              </Typography>
              <Typography variant="h6">
              <p>11/25/2018: </p>
              </Typography>
              <Typography>
                <p>Oatmeal and berries <br></br>
                  Granola
                </p>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card style = {cardStyle}>
            <CardContent style = {headerStyle}>
            <Typography variant="h5">
                <p>Recent Mood Activity</p>
              </Typography>
              <Typography variant="h6">
              <p>11/26/2018: </p>
              </Typography>
              <Typography>
                <p>Feeling ill <br></br>
                </p>
              </Typography>
              <Typography variant="h6">
              <p>11/25/2018: </p>
              </Typography>
              <Typography>
                <p>Feeling gloomy <br></br>
                </p>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card style = {cardStyle}>
            <CardContent style = {headerStyle}>
            <Typography variant="h5">
                <p>Recent Pain Activity</p>
              </Typography>
              <Typography variant="h6">
              <p>11/26/2018: </p>
              </Typography>
              <Typography>
                <p>Pain Level: 4 <br></br>
                   Note: Increased back and shoulder pain
                </p>
              </Typography>
              <Typography variant="h6">
              <p>11/25/2018: </p>
              </Typography>
              <Typography>
                <p>Pain Level: 0 <br></br>
                   Note: No pain today!
                </p>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          <Card style = {cardStyle}>
            <CardContent style = {headerStyle}>
            <Typography variant="h5">
              <p>Today's Medications <br></br> </p>
              </Typography>
              <Typography>
              <p>Medication 1</p>
              <p>Medication 2</p>
              <p>Medication 3</p>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

      </Grid>
    </div>
  );
}

class Dashboard extends Component {
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
 
  render()  {
    return ( 
      <CenteredGrid />     
    );
    
  }
}
CenteredGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

FullScreenDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

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
    mapDispatchToProps,
)(Dashboard); 
