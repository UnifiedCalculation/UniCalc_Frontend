import React from 'react';
import PropTypes from 'prop-types';
import DynamicFormDialog from '../dynamicDialog/dynamicDialog';

import TextField from '@material-ui/core/TextField';

/**
 * @param {Function} onCancel
 * @param {Function} onSubmit 
 * @param {Boolean} show
 */
const NewEntrySegmentDialog = ({ onCancel, onSubmit, show, segmentName=' ' , discount, entryId, ...props }) => {

    const acceptButtonText = 'Bestätigen';
    const cancelButtonText = 'Abbrechen';
    const title = 'Neues Segment erstellen';
    const text = 'Tragen Sie bitte alle Felder ein, um ein neues Segment zu erstellen.';

    const textfields = [
        {
            id: 'title',
            label: 'Titel des Segments',
            type: 'text',
            required: true,
            value: segmentName,
        },
        {
            id: 'discount',
            label: 'Rabatt',
            type: 'number',
            inputProps: { 
                min: "0", 
                max: "100", 
                step: "0.01" 
            },
            required: false,
            value: discount,
        }
    ];

    const inputFields = textfields.map((entry, index) =>
        <TextField
            data-testid={'newSegment-testing-' + entry.id}
            inputProps={entry.inputProps}
            type={entry.type}
            id={entry.id}
            name={entry.id}
            key={index + '-textField'}
            label={entry.label}
            required={entry.required}
            defaultValue= {entry.value ? entry.value : 0}
            fullWidth
            multiline={entry.type !== "email" && entry.type !== "number"}
            margin='dense'
        />
    );
  
    const parseNewEntry = (entry) => {
        console.log(JSON.stringify(entry))
        onSubmit(entry);
    };
    return (
        <DynamicFormDialog
            title={title}
            text={text}
            onCancel={onCancel}
            cancelButtonText={cancelButtonText}
            onAccept={parseNewEntry}
            acceptButtonText={acceptButtonText}
            show={show}
        >
            {inputFields}
        </DynamicFormDialog>
    );
}

NewEntrySegmentDialog.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
}

export default NewEntrySegmentDialog;