import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

const BackButton = ({ onClick, ...props }) => {

    const useStyles = makeStyles(theme => ({
        root: {
            margin: 15,
            marginLeft: 0,
            marginBottom: 0,
            padding: 0
        }
    }));

    const classes = useStyles();


    return (
        <IconButton onClick={onClick} className={classes.root}>
            <FontAwesomeIcon icon={faArrowLeft} />
        </IconButton >
    );

}

export default BackButton;