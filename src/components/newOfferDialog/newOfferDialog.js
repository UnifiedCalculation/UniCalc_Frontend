import React from 'react';
import PropTypes from 'prop-types';
import DynamicDialog from '../dynamicDialog/dynamicDialog';

import TextField from '@material-ui/core/TextField';

/**
 * @param {Function} onCancel
 * @param {Function} onSubmit 
 * @param {Boolean} show
 */
const NewOfferDialog = ({ onCancel, onSubmit, show, ...props }) => {

    const acceptButtonText = 'Bestätigen';
    const cancelButtonText = 'Abbrechen';
    const title = 'Neue Offerte erstellen';
    const text = 'Tragen Sie bitte alle Felder ein, um eine neue Offerte zu erstellen.';

    const textfields = [
        {
            id: 'name',
            label: 'Offertenbezeichnung',
            type: 'text',
            required: true
        }
    ];

    const inputFields = textfields.map((entry, index) =>
        <TextField
            inputProps={entry.inputProps}
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
            {inputFields}
        </DynamicDialog>
    );
}

NewOfferDialog.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
}

export default NewOfferDialog;