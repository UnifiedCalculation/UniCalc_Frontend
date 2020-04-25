import React from 'react';
import DynamicDialog from "../../dynamicDialog/dynamicDialog";
import PropTypes from "prop-types";

const AddArticleDialog = ({ customers, onCancel, onSubmit, show, ...props }) => {

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
        {customerSelector}
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
