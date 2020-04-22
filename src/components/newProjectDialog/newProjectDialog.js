import React from 'react';
import PropTypes from 'prop-types';
import DynamicDialog from '../dynamicDialog/dynamicDialog';
import Autocomplete from '@material-ui/lab/Autocomplete';

import TextField from '@material-ui/core/TextField';
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
            type: 'textarea',
            required: true
        },
        {
            id: 'address',
            label: 'Adresse',
            type: 'textarea',
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
            type: 'textarea',
            required: true
        },
        {
            id: 'description',
            label: 'Beschreibung',
            type: 'textarea',
            required: true
        }
    ];

    const customerSelector =
        <Autocomplete
            id="customer-autocomplete"
            options={customers}
            getOptionLabel={(option) => option.lastName + ' ' + option.firstName}
            renderInput={(params)=> 
                <TextField
                    {...params}
                    id="customer"
                    label="Kunde"
                    type="textarea"
                    name="customer"
                    fullWidth
                    required 
                    margin='dense'/>
            }
        />

    const inputFields = textfields.map((entry, index) => {
            return <TextField
                type={entry.type}
                id={entry.id}
                name={entry.id}
                key={index + '-textField'}
                label={entry.label}
                required={entry.required}
                fullWidth
                multiline={entry.type !== "email" && entry.type !== "number"}
                margin='dense'
            />
        }
        );

    return (
        <DynamicDialog
            title={title}
            text={text}
            onCancel={onCancel}
            cancelButtonText={cancelButtonText}
            onAccept={onSubmit}
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