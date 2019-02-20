import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
    <Card className={classes.card}>
      <CardContent>
      <CardActions>
        <div className="buttons">
            <Button style={{color:'#4BA9FA'}} size="small">Edit</Button>
            <Button style={{color:'#4BA9FA'}} size="small">Delete</Button>
        </div>
      </CardActions>
      <div className="stats">
            <div className="statNames" 
                style={{borderRight: '0.1em solid black', padding: '0.5em', borderColor: '#C0C0C0'}}>
                <h5>Body Temperature: </h5>
                <h5>Pulse Rate: </h5>
                <h5>Blood Pressure: </h5>
            </div>
            <div className="statNumbers">
                <h5>## F</h5>
                <h5>## beats/min</h5>
                <h5>###/## mm Hg</h5>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
