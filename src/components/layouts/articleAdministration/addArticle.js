import React from 'react';
import DynamicDialog from "../../dynamicDialog/dynamicDialog";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';

const AddArticleDialog = ({ npks, onCancel, onSubmit, show, ...props }) => {

  const cancelButtonText = 'Abbrechen';
  const acceptButtonText = 'Bestätigen';
  const title = 'Neuen Artikel erstellen';
  const text = 'Füllen Sie alle Felder ab um einen neuen Artikel zu erstellen.';

  const textfields = [
    {
      id: 'articleNumber',
      label: 'Artikelnummer',
      type: 'textarea',
      required: true
    },
    {
      id: 'npk',
      label: 'NPK',
      type: 'number',
      required: true
    },
    {
      id: 'articleName',
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
      required: true
    },
    {
      id: 'description',
      label: 'Beschreibung',
      type: 'textarea',
      required: true
    }
  ];

  // todo hand over npkNumber and npkTitle
  const npkSelector =
      <Autocomplete
          id="customer-autocomplete"
          options={npks}
          getOptionLabel={(option) => option.npkNumber + ' ' + option.npkTitle}
          renderInput={(params)=>
              <TextField
                  {...params}
                  id="customer"
                  label="NPK Gruppe"
                  type="textarea"
                  name="customer"
                  fullWidth
                  required
                  margin='dense'/>
          }
      />

  const inputFields = textfields.map((entry, index) => {
        return <TextField
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
      }
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

AddArticleDialog.propTypes = {
  customers: PropTypes.array.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired
}

export default AddArticleDialog;
