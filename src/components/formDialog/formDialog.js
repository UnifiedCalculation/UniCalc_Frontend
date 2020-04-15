import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

/**
 * @param {Function} onCancel
 * @param {Function} onAccept 
 * @param {Boolean} show
 */
const InputDialog = ({ title, text, onCancel, cancelButtonText, onAccept, acceptButtonText, show, children, ...props }) => {

    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(0),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(5),
        },
    }));

    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const prepareFormData = (event) => {
        event.preventDefault();
        let jsonObject = {};
        for (const [key, value] of new FormData(event.target).entries()) {
            jsonObject[key] = value;
        }
        event.target.reset();
        onAccept(jsonObject);
    };

    const form = children ?
        <form id={title + '-inputFormDialog'} onSubmit={prepareFormData}>
            <FormControl
                required
                className={classes.formControl}
                fullWidth
            >
            </FormControl>
            {children}
        </form>
        : null;

    const cancelButton = cancelButtonText ?
        <Button onClick={onCancel} color="primary">
            {cancelButtonText}
        </Button>
        : null;

    return (
        <>
            <Dialog
                open={show}
                onClose={onCancel}
                aria-labelledby={title + '-new-form-dialog-title'}
                aria-describedby={title + '-new-form-dialog-description'}
                fullScreen={fullScreen}
            >
                <DialogTitle id={title + '-new-form-dialog-title'}>{title}</DialogTitle>
                <DialogContent dividers={true} >
                    <DialogContentText id={title + '-new-form-dialog-description'}>
                        {text}
                    </DialogContentText>
                    <form id={title + '-inputFormDialog'} onSubmit={prepareFormData}>
                        <FormControl
                            required
                            className={classes.formControl}
                            fullWidth
                        >
                        </FormControl>
                        {children}
                    </form>
                </DialogContent>
                <DialogActions>
                    {cancelButton}
                    <Button type="submit" form={title + '-inputFormDialog'} color="primary" autoFocus>
                        {acceptButtonText}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

InputDialog.defaultProps = {
    title: 'defaultTitle',
    text: 'defaultText',
    acceptButtonText: 'Accept'
}

InputDialog.propTypes = {
    customers: PropTypes.array.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
}

export default InputDialog;