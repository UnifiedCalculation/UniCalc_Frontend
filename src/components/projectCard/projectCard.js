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
      minWidth: 370,
      margin: 10,
    },
    media: {
      height: 140,
    },
  });

export default function ProjectCard({ projectName, description, buttonName, onClick, ...props}) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
      <Typography gutterBottom variant="h5" component="h2">
            {projectName}
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
ProjectCard.propTypes = {
    projectName: PropTypes.string.isRequired, 
    buttonName: PropTypes.string,
    onClick: PropTypes.func.isRequired
}

ProjectCard.defaultProps = {
    buttonName: 'Mehr ansehen'
}