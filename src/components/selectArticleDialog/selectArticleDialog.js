import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

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

    let emptyArticlesList = [];
    emptyArticlesList.push(<option id="emptyOption" key="0-option"></option>);
    const articlesSelection =
        <FormControl
            required
            className={classes.formControl}
            fullWidth
        >
            <InputLabel id="required-select-autowidth-label">Artikel</InputLabel>
            <Select
                native
                labelId="required-select-autowidth-label"
                id="article_id"
                name="article_id"
                fullWidth
                margin='dense'
            >
                {articles ? emptyArticlesList.concat(
                    articles.map((entry, index) =>
                        <option
                            value={entry.article_id}
                            key={(index + 1) + '-option'}
                        >
                            {entry.name}
                        </option >
                    )
                ) : emptyArticlesList}
            </Select>
        </FormControl>

    const inputFields = textfields.map((entry, index) =>
        <TextField
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
        console.log(JSON.stringify(jsonObject));
        jsonObject.discount = parseInt(jsonObject.discount);
        jsonObject.amount = parseInt(jsonObject.amount);
        console.log(JSON.stringify(jsonObject));
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