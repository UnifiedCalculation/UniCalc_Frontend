import React, {useEffect, useState} from 'react';
import DynamicDialog from "../../dynamicDialog/dynamicDialog";
import PropTypes, {func} from "prop-types";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import {getNpks, submitNewArticle} from "../../connectionHandler/connectionHandler";
import MenuItem from "@material-ui/core/MenuItem";

const AddArticleDialog = ({setErrorMessage, onCancel, onSubmit, show, ...props}) => {
  const [npks, setNpks] = useState([]);

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
          //todo fill units
          name: 'Tonnen',
          value: 'tons'
        }
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
    submitNewArticle(articleData, setErrorMessage)
  }

  const parseArticleData = (articleData) => {
    articleData.price = parseInt(articleData.price);
    saveNewArticle(articleData);
  }

  useEffect(() => {
    getNpks(setErrorMessage, setNpks)
  }, []);

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
                  required
                  margin='dense'/>
          }
      />

  const inputFields = textfields.map((entry, index) => {
        return         <TextField
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

AddArticleDialog.propTypes = {
  npks: PropTypes.array.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
}

export default AddArticleDialog;
