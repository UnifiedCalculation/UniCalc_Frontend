import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

/**
 * @param {Function} onCancel
 * @param {Function} onSubmit 
 * @param {Boolean} show
 */
const NewEntrySegmentDialog = ({ onCancel, onSubmit, show, ...props }) => {

    const cancelText = 'Abbrechen';
    const acceptText = 'Annehmen';
    const title = 'Neues Segment erstellen';
    const text = 'Tragen Sie bitte alle Felder ein, um ein neues Segment zu erstellen.';

    const textfields = [
        {
            id: 'name',
            label: 'Segmentname',
            type: 'text',
            required: true
        }
    ];

    const inputFields = textfields.map((entry, index) =>
        <TextField
            id={entry.id}
            name={entry.id}
            key={index + '-textField'}
            label={entry.label}
            type={entry.type}
            required={entry.required}
            fullWidth
            multiline
            margin='dense'
        />
    );

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    const prepareProjectData = (event) => {
        event.preventDefault();
        let jsonObject = {};
        for (const [key, value] of new FormData(event.target).entries()) {
            jsonObject[key] = value;
        }
        event.target.reset();
        onSubmit(jsonObject);
    };

    return (
        <>
            <Dialog
                open={show}
                onClose={onCancel}
                aria-labelledby="new-segment-entry-dialog-title"
                aria-describedby="new-segment-entry-dialog-description"
                fullScreen={fullScreen}
            >
                <DialogTitle id="new-segment-entry-dialog-title">{title}</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText id="new-segment-entry-dialog-description">
                        {text}
                    </DialogContentText>
                    <form id='newSegmentEntryForm' onSubmit={prepareProjectData}>
                        {inputFields}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel} color="primary">
                        {cancelText}
                    </Button>
                    <Button type="submit" form='newSegmentEntryForm' color="primary" autoFocus>
                        {acceptText}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

NewEntrySegmentDialog.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
}

export default NewEntrySegmentDialog;