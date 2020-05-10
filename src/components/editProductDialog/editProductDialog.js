import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import DynamicDialog from '../dynamicDialog/dynamicDialog';

/**
 * @param {Array} products array with products
 * @param {Function} onCancel
 * @param {Function} onSubmit 
 * @param {Boolean} show
 */
const EditProductDialog = ({ amount, discount, description, onCancel, onSubmit, show, ...props }) => {


    const cancelButtonText = 'Abbrechen';
    const acceptButtonText = 'Bestätigen';
    const title = 'Artikel bearbeiten';
    const text = 'Einträge für den Artikel anpassen';

    const textfields = [
        {
            id: 'amount',
            label: 'Anzahl',
            type: 'number',
            required: true,
            value: Number(amount)
        },
        {
            id: 'discount',
            label: 'Rabatt in Prozent',
            type: 'number',
            inputProps: { 
                min: "0", 
                max: "100", 
                step: "0.01" 
            },
            required: true,
            value: discount? Number(discount) : 0.00
        },
        {
            id: 'description',
            label: 'Beschreibung',
            type: 'text',
            required: true,
            value: description
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
            multiline={entry.id === "description"}
            margin='dense'
            defaultValue={entry.value? entry.value : null}
        />
    );

    const parseEditedProduct = (jsonObject) => {
        jsonObject.discount = Number(jsonObject.discount);
        jsonObject.amount = Number(jsonObject.amount);
        onSubmit(jsonObject);
    };

    return (
        <DynamicDialog
            title={title}
            text={text}
            onCancel={onCancel}
            cancelButtonText={cancelButtonText}
            onAccept={parseEditedProduct}
            acceptButtonText={acceptButtonText}
            show={show}
        >
            {inputFields}
        </DynamicDialog>
    );
}

export default EditProductDialog;