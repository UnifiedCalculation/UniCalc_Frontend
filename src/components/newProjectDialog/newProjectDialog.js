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
 * @param {Array} customer array with customers in the form of [{name: 'Albert Einstein',customerId: '1237120'}]
 * @param {Function} onCancel
 * @param {Function} onSubmit 
 * @param {Boolean} show
 */
const NewProjectDialog = ({ customers, onCancel, onSubmit, show, ...props }) => {

    const cancelText = 'Abbrechen';
    const acceptText = 'Bestätigen';
    const title = 'Neues Projekt erstellen';
    const text = 'Tragen Sie bitte alle Felder ein, um ein neues Projekt zu erstellen.';

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

    let emptyNameSelection = [];
    emptyNameSelection.push(<option id="emptyOption" key="0-option"></option>);
    const customerSelector = customers ? emptyNameSelection.concat(
        customers.map((entry, index) =>
            <option
                value={entry.customer_id}
                key={(index + 1) + '-option'}
            >
                {entry.name}
            </option >
        )
    ) : emptyNameSelection;

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
                aria-labelledby="new-project-dialog-title"
                aria-describedby="new-project-dialog-description"
                fullScreen={fullScreen}
            >
                <DialogTitle id="new-project-dialog-title">{title}</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText id="new-project-dialog-description">
                        {text}
                    </DialogContentText>
                    <form id='newProjectForm' onSubmit={prepareProjectData}>
                        <FormControl
                            required
                            className={classes.formControl}
                            fullWidth
                        >
                            <InputLabel id="required-select-autowidth-label">Kunde</InputLabel>
                            <Select
                                native
                                labelId="required-select-autowidth-label"
                                id="customer_id"
                                name="customer_id"
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
                    <Button type="submit" form='newProjectForm' color="primary" autoFocus>
                        {acceptText}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

NewProjectDialog.propTypes = {
    customers: PropTypes.array.isRequired, 
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
}

export default NewProjectDialog;