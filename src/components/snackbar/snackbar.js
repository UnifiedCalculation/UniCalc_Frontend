import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function SnackbarOverlay({ text, severity, show, onClose, ...props }) {

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }));

    const classes = useStyles();


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        onClose();
    };

    return (
        <div className={classes.root}>
            <Snackbar open={show} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {text}
                </Alert>
            </Snackbar>
        </div>
    );
}