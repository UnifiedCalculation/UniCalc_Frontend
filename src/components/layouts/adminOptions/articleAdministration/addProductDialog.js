import React, {} from 'react';
import DynamicDialog from "../../../dynamicDialog/dynamicDialog";
import PropTypes, {func} from "prop-types";
import TextField from "@material-ui/core/TextField";
import {submitNewProduct} from "../../../connectionHandler/connectionHandler";
import MenuItem from "@material-ui/core/MenuItem";

const AddProductDialog = ({setErrorMessage, onCancel, onSubmit, show, setProducts, ...props}) => {

  const cancelButtonText = 'Abbrechen';
  const acceptButtonText = 'Bestätigen';
  const title = 'Neuen Artikel erstellen';
  const text = 'Füllen Sie alle Felder ab um einen neuen Artikel zu erstellen.';
  const textfields = [
    {
      id: 'number',
      label: 'Artikelnummer',
      type: 'textarea',
      required: true
    },
    {
      id: 'name',
      label: 'Artikelbezeichnung',
      type: 'textarea',
      required: true
    },
    {
      id: 'price',
      label: 'Preis',
      type: 'number',
      required: true,
      inputProps: { 
        min: "0",  
        step: "0.05" 
    },
    },
    {
      id: 'unit',
      label: 'Einheit',
      type: 'textarea',
      required: true,
      select: true,
      options: [
        {
          name: 't',
          value: 'tons'
        },
        {
          name: 'Stk.',
          value: 'pieces'
        },
        {
          name: 'm',
          value: 'meter'
        },
        {
          name: 'kg',
          value: 'kilo'
        },
        {
          name: 'l',
          value: 'liter'
        },
        {
          name: 'qm',
          value: 'squarem'
        },
        {
          name: 'h',
          value: 'hours'
        },
      ],
    },
    {
      id: 'description',
      label: 'Beschreibung',
      type: 'textarea',
      required: true
    }
  ];

  const saveNewArticle = (articleData) => {
    submitNewProduct(articleData, setErrorMessage, onSubmit);
  }

  const parseArticleData = (articleData) => {
    articleData.price = parseInt(articleData.price);
    articleData.npk = "";
    saveNewArticle(articleData);
  }

  const inputFields = textfields.map((entry, index) => {

        return <TextField
            inputProps={entry.inputProps}
            type={entry.type}
            id={entry.id}
            name={entry.id}
            key={index + '-textField'}
            label={entry.label}
            required={entry.required}
            fullWidth
            select={entry.select}
            native={entry.select}
            margin='dense'
            autoComplete={false}
        >
          {entry.select ?
              entry.options.map((entry, index) =>
                  <MenuItem key={entry.value} value={entry.value}>
                    {entry.name}
                  </MenuItem>
              )
              : null}
        </TextField>
      }
  );

  return (
      <DynamicDialog
          title={title}
          text={text}
          onCancel={onCancel}
          cancelButtonText={cancelButtonText}
          onAccept={parseArticleData}
          acceptButtonText={acceptButtonText}
          show={show}
      >
        {inputFields}
      </DynamicDialog>
  );
}

AddProductDialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
}

export default AddProductDialog;
