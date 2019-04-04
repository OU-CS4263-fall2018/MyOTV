import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

const styles = {
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

function SimpleCard(props) {
  const { classes } = props;

  return (
    <div>
      <h5 style={{ color: '#4BA9FA', paddingTop: '30px' }}>{props.date}</h5>
      <Card className={classes.card}>
        <CardContent>
          <CardActions>
            <div className="buttons">
              <Button style={{ color: '#4BA9FA' }} size="small">Edit</Button>
              <Button style={{ color: '#4BA9FA' }} size="small">Delete</Button>
            </div>
          </CardActions>
          <div className="stats">
            <div className="statNames"
              style={{ borderRight: '0.1em solid black', padding: '0.5em', borderColor: '#C0C0C0' }}>
              <h5>Body Temperature: </h5>
              <h5>Pulse Rate: </h5>
              <h5>Blood Pressure: </h5>
            </div>
            <div className="statNumbers">
              <h5>{props.bodyTemp} F</h5>
              <h5>{props.pulseRate} beats/min</h5>
              <h5>{props.bloodPressure} mmHg</h5> 
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
