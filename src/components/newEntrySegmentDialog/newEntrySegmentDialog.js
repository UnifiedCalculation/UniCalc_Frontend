import React from 'react';
import PropTypes from 'prop-types';
import DynamicFormDialog from '../dynamicFormDialog/dynamicFormDialog';

import TextField from '@material-ui/core/TextField';

/**
 * @param {Function} onCancel
 * @param {Function} onSubmit 
 * @param {Boolean} show
 */
const NewEntrySegmentDialog = ({ onCancel, onSubmit, show, ...props }) => {

    const acceptButtonText = 'Annehmen';
    const cancelButtonText = 'Abbrechen';
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
        <DynamicFormDialog
            title={title}
            text={text}
            onCancel={onCancel}
            cancelButtonText={cancelButtonText}
            onAccept={prepareProjectData}
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