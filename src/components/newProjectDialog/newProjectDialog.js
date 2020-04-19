import React from 'react';
import PropTypes from 'prop-types';
import DynamicDialog from '../dynamicDialog/dynamicDialog';

import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
/**
 * @param {Array} customer array with customers in the form of [{name: 'Albert Einstein',customerId: '1237120'}]
 * @param {Function} onCancel
 * @param {Function} onSubmit 
 * @param {Boolean} show
 */
const NewProjectDialog = ({ customers, onCancel, onSubmit, show, ...props }) => {

    const cancelButtonText = 'Abbrechen';
    const acceptButtonText = 'Bestätigen';
    const title = 'Neues Projekt erstellen';
    const text = 'Tragen Sie bitte alle Felder ein, um ein neues Projekt zu erstellen.';

    const textfields = [
        {
            id: 'name',
            label: 'Projektname',
            type: 'text',
            required: true
        },
        {
            id: 'address',
            label: 'Adresse',
            type: 'text',
            required: true
        },
        {
            id: 'zip',
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

    let emptyNameSelection = [];
    emptyNameSelection.push(<option id="emptyOption" key="0-option"></option>);

    const customerSelector =
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
                {customers ? emptyNameSelection.concat(
                    customers.map((entry, index) =>
                        <option
                            value={entry.id}
                            key={(index + 1) + '-option'}
                        >
                            {entry.user.lastname + ' ' + entry.user.firstname}
                        </option >
                    )
                ) : emptyNameSelection}
            </Select>
        </FormControl>

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
        <DynamicDialog
            title={title}
            text={text}
            onCancel={onCancel}
            cancelButtonText={cancelButtonText}
            onAccept={prepareProjectData}
            acceptButtonText={acceptButtonText}
            show={show}
        >
            {customerSelector}
            {inputFields}
        </DynamicDialog>
    );
}

NewProjectDialog.propTypes = {
    customers: PropTypes.array.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
}

export default NewProjectDialog;