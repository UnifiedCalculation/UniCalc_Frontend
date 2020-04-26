import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import DynamicDialog from '../dynamicDialog/dynamicDialog';

/**
 * @param {Array} articles array with articles
 * @param {Function} onCancel
 * @param {Function} onSubmit 
 * @param {Boolean} show
 */
const SelectArticleDialog = ({ articles, onCancel, onSubmit, show, ...props }) => {


    const cancelButtonText = 'Abbrechen';
    const acceptButtonText = 'Bestätigen';
    const title = 'Artikel hinzufügen';
    const text = 'Alle Felder eintragen, um einen Artikel hinzuzufügen.';

    const textfields = [
        {
            id: 'amount',
            label: 'Anzahl',
            type: 'number',
            required: true
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
            required: true
        },
        {
            id: 'description',
            label: 'Beschreibung',
            type: 'text',
            required: true
        }
    ];

    const articlesSelection =
        <Autocomplete
            id="customer-autocomplete"
            options={articles}
            getOptionLabel={(article) => article.name}
            renderInput={(params)=> 
                <TextField
                    {...params}
                    id="article_id"
                    label="Artikel"
                    type="textarea"
                    name="article_id"
                    fullWidth
                    required 
                    margin='dense'/>
            }
        />

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

    const parseNewArticle = (jsonObject) => {
        jsonObject.discount = parseInt(jsonObject.discount);
        jsonObject.amount = parseInt(jsonObject.amount);
        onSubmit(jsonObject);
    };

    return (
        <DynamicDialog
            title={title}
            text={text}
            onCancel={onCancel}
            cancelButtonText={cancelButtonText}
            onAccept={parseNewArticle}
            acceptButtonText={acceptButtonText}
            show={show}
        >
            {articlesSelection}
            {inputFields}
        </DynamicDialog>
    );
}

SelectArticleDialog.propTypes = {
    articles: PropTypes.array.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
}

export default SelectArticleDialog;