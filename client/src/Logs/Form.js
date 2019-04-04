import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class FormDialog extends React.Component {
    state = {
        open: true,
        bodyTemp: "",
        pulseRate: "",
        bloodPressure: "",
        date: ""
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    sendData() {
        this.props.vitalsData(this.state.bodyTemp, this.state.pulseRate, this.state.bloodPressure, this.state.date);
    };

    handleClose = () => {
        this.setState({ open: false });
        this.sendData();
    };

    setDate = (event) => {
        this.setState({ date: event.target.value });
    }

    setBodyTemp = (event) => {
        this.setState({ bodyTemp: event.target.value });
    }

    setPulseRate = (event) => {
        this.setState({ pulseRate: event.target.value });
    }

    setBloodPressure = (event) => {
        this.setState({ bloodPressure: event.target.value });
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Vitals Log</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                           Enter your vitals information.
                        </DialogContentText>
                        <TextField
                            onChange={this.setDate}
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Date"
                            type="date"
                            fullWidth
                        />
                        <TextField
                            onChange={this.setBodyTemp}
                            margin="dense"
                            id="name"
                            label="Body Temperature"
                            type="number"
                            fullWidth
                        />
                        <TextField
                            onChange={this.setPulseRate}
                            margin="dense"
                            id="name"
                            label="Pulse Rate"
                            type="number"
                            fullWidth
                        />
                        <TextField
                            onChange={this.setBloodPressure}
                            margin="dense"
                            id="name"
                            label="Blood Pressure"
                            type="number"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}