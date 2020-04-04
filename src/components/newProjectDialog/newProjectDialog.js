import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const NewProjectDialog = ({ customerList, show, ...props }) => {

    const customers = [
        {
            name: 'Albert Einstein',
            customerId: '1237120'
        },
        {
            name: 'Ferdinand Fritz',
            customerId: '1237230'
        },
        {
            name: 'Person X',
            customerId: '1237540'
        }
    ];

    const textfields = [
        {
            id: 'projectname',
            label: 'Projektname',
            type: 'text',
            required: true
        },
        {
            id: 'adress',
            label: 'Adresse',
            type: 'text',
            required: true
        },
        {
            id: 'zipcode',
            label: 'Postleitzahl',
            type: 'number',
            required: true
        },
        {
            id: 'city',
            label: 'Stadt',
            type: 'text',
            required: true
        },
        {
            id: 'description',
            label: 'Beschreibung',
            type: 'text',
            required: true
        }
    ];

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

    const cancelText = 'Abbrechen';
    const acceptText = 'Annehmen';
    const title = 'Neues Projekt erstellen';

    const closeButton =
        onCancel ? <Button onClick={onClose} color="primary">
            {cancelText}
        </Button > : null;

    const text = 'Tragen Sie bitte alle Felder ein, um ein neues Projekt zu erstellen.';

    let emptyNameSelection = new Array();
    emptyNameSelection.push(<option value="" key="empty"></option>);
    const customerSelector = emptyNameSelection.concat(customers.map(entry =>
        <option
            value={entry.name}
            key={entry.key}
        >
            {entry.name}
        </option >
    )
    );



    const inputFields = textfields.map(entry =>
        <TextField
            id={entry.id}
            key={entry.key}
            label={entry.label}
            type={entry.type}
            required={entry.required}
            fullWidth
            multiline
            margin='dense'

        />
    );

    return (
        <div>
            <Dialog
                open={show}
                onClose={onClose}
                aria-labelledby="new-project-dialog-title"
                aria-describedby="new-project-dialog-description"
                fullScreen={fullScreen}
            >
                <DialogTitle id="new-project-dialog-title">{title}</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText id="new-project-dialog-description">
                        {text}
                    </DialogContentText>
                    <form id='newProjectForm' onSubmit={onSubmit}>
                        <FormControl
                            required
                            className={classes.formControl}
                            fullWidth
                        >
                            <InputLabel id="required-select-autowidth-label">Kunde</InputLabel>
                            <Select
                                native
                                labelId="required-select-autowidth-label"
                                id="required-select-autowidth"
                                //value={}
                                onChange={handleChange}
                                fullWidth
                                margin='dense'
                            >
                                {customerSelector}
                            </Select>
                        </FormControl>
                        {inputFields}
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancel} color="primary">
                        {cancelText}
                    </Button>
                    <Button type="submit" form='newProjectForm' onClick={onSubmit} color="primary" autoFocus>
                        {acceptText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default NewProjectDialog;