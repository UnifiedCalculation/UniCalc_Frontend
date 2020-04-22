import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


/**
 * This component creates an alert dialog with cancel and accept options. You can leave `onCancel` null,
 * and it will only render the accept button.
 * @param {string} title
 * @param {string} text 
 * @param {string} acceptText standard value is Accept
 * @param {string} cancelText standard value is Cancel
 * @param {CallableFunction} onAccept
 * @param {CallableFunction} onCancel
 * @param {boolean} show
 */
const Alert = ({ title, text, onAccept, acceptText, onCancel, cancelText, show, ...props }) => {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const cancelButton =
        onCancel ? <Button onClick={onCancel} color="primary">
            {cancelText}
        </Button > : null;

    return (
        <div>
            <Dialog
                open={show}
                onClose={onCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullScreen={fullScreen}
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {cancelButton}
                    <Button onClick={onAccept} color="primary" autoFocus>
                        {acceptText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

Alert.defaultProps = {
    acceptText: 'Accept',
    cancelText: 'Cancel'
}

Alert.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    acceptText: PropTypes.string,
    cancelText: PropTypes.string,
    onAccept: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
}

export default Alert;