import React, {useEffect} from 'react';
import DynamicDialog from "../../../dynamicDialog/dynamicDialog";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {getNpks, submitNewProduct} from "../../../connectionHandler/connectionHandler";
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
    articleData.name = npks.find(entry => entry.number == articleData.npk.split(" ")[0].split(".")[0]).name;
    articleData.npk_id = npks.find(entry => entry.number == articleData.npk.split(" ")[0].split(".")[1]).id;
    articleData.number = articleData.npk_id + "." + articleData.number;
    onSubmit(articleData);
  }

  useEffect(() => {
    getNpks(setErrorMessage, setNpks)
  }, []);

  const npkSelector =

      <Autocomplete
          id="npk-autocomplete"
          options={npks.filter(entry => entry.npk_id != null)}
          groupBy={option => npks.find(entry => entry.id == option.npk_id).number + ' '  + npks.find(entry => entry.id == option.npk_id).name}
          getOptionLabel={option => npks.find(entry => entry.id == option.npk_id).number + '.' + option.number + ' ' + option.name}
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
