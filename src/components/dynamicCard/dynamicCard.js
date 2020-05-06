import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      minWidth: 350,
      maxWidth: 350,
      margin: 10,
    },
    media: {
      height: 140,
    },
  });

export default function DynamicCard({ projectName: carName, description, buttonName, onClick, hidden, ...props}) {
  const classes = useStyles();

  return (
    hidden ? null :
    <Card className={classes.root}>
      <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
            {carName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={onClick}>{buttonName}</Button>
      </CardActions>
    </Card>
  );
}
DynamicCard.propTypes = {
    projectName: PropTypes.string.isRequired, 
    buttonName: PropTypes.string,
    onClick: PropTypes.func.isRequired
}

DynamicCard.defaultProps = {
    buttonName: 'Mehr ansehen'
}