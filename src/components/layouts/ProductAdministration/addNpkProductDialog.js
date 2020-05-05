import React, {} from 'react';
import DynamicDialog from "../../dynamicDialog/dynamicDialog";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {submitNewProduct} from "../../connectionHandler/connectionHandler";
import MenuItem from "@material-ui/core/MenuItem";

const AddNpkProductDialog = ({setErrorMessage, onCancel, onSubmit, show, setProducts, npks, setNpks, ...props}) => {

  const cancelButtonText = 'Abbrechen';
  const acceptButtonText = 'Bestätigen';
  const title = 'Neuen NPK Artikel erstellen';
  const text = 'Füllen Sie alle Felder ab um einen neuen NPK Artikel zu erstellen.';
  const textfields = [
    {
      id: 'number',
      label: 'Artikelnummer',
      type: 'textarea',
      required: true
    },
    {
      id: 'price',
      label: 'Preis',
      type: 'number',
      required: true
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
    articleData.name = articleData.npk.substring(4, articleData.npk.size)
    articleData.npk = (articleData.npk.split(" "))[0]
    saveNewArticle(articleData);
  }

  const npkSelector =

      <Autocomplete
          id="npk-autocomplete"
          options={npks}
          getOptionLabel={(option) => option.id + ' ' + option.name}
          renderInput={(params) =>
              <TextField
                  {...params}
                  id="npk"
                  label="NPK Gruppe"
                  type="textarea"
                  name="npk"
                  fullWidth
                  margin='dense'/>
          }
      />

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
        {npkSelector}
        {inputFields}
      </DynamicDialog>
  );
}

AddNpkProductDialog.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
}

export default AddNpkProductDialog;
