import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DynamicDialog from "../../../dynamicDialog/dynamicDialog"
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const EmployeeDialog = ({ employeeData, onCancel, onAccept, show }) => {


  const cancelButtonText = 'Abbrechen';
  const acceptButtonText = 'Bestätigen';
  const title = 'Mitarbeiteradministration';
  const text = 'Füllen Sie alle Angaben des Mitarbeiters ab.';
  const textfields = [
    {
      id: 'email',
      label: 'Email',
      type: 'textarea',
      required: true,
      value: employeeData ? employeeData.email : null
    },
    {
      id: 'firstname',
      label: 'Vorname',
      type: 'textarea',
      required: true,
      value: employeeData ? employeeData.firstname : null
    },
    {
      id: 'lastname',
      label: 'Nachname',
      type: 'textarea',
      required: true,
      value: employeeData ? employeeData.lastname : null
    }
  ];

  const useStyles = makeStyles(() => ({
    password: {
      marginTop: '10px',
      marginBottom: '10px'
    },
    userRoles: {
      marginTop: '20px'
    },
  }));

  const classes = useStyles();

  const inputFields = textfields.map((entry, index) => {
    return <TextField
      key={(index + 1) + "-textField"}
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
      autoComplete={'false'}
      defaultValue={entry.value ? entry.value : null}
      disabled={entry.disabled}
    >
      {entry.select ?
        entry.options.map((entry) =>
          <MenuItem key={entry.value} value={entry.value}>
            {entry.name}
          </MenuItem>
        )
        : null}
    </TextField>
  }
  );

  const buttons = <FormControl className={classes.userRoles} component="fieldset">
    <FormLabel style={{ marginBottom: '10px' }} component="legend">Rollen</FormLabel>
    <FormGroup>
      <FormControlLabel
        control={<Switch defaultChecked={employeeData && Array.isArray(employeeData.roles) ? employeeData.roles.includes("Admin") : false}
          name="Admin" />}
        label="Administrator"
      />
      <FormControlLabel
        control={<Switch defaultChecked={employeeData && Array.isArray(employeeData.roles) ? employeeData.roles.includes("Projektleiter") : false}
          name="Projektleiter" />}
        label="Projektleiter"
      />
      <FormControlLabel
        control={<Switch defaultChecked={employeeData && Array.isArray(employeeData.roles) ? employeeData.roles.includes("Verkäufer") : false}
          name="Verkäufer" />}
        label="Verkäufer"
      />
      <FormControlLabel
        control={<Switch defaultChecked={employeeData && Array.isArray(employeeData.roles) ? employeeData.roles.includes("Mitarbeiter") : false}
          name="Mitarbeiter" />}
        label="Mitarbeiter"
      />
    </FormGroup>
  </FormControl>

  const parseEmployeeData = (jsonObject) => {
    console.log('fresh from form: ' + JSON.stringify(jsonObject));
    jsonObject.roles = [];
    if (jsonObject.hasOwnProperty("Admin")) {
      jsonObject.roles.push("Admin")
      delete jsonObject.Admin
    }
    if (jsonObject.hasOwnProperty("Mitarbeiter")) {
      jsonObject.roles.push("Mitarbeiter")
      delete jsonObject.Mitarbeiter
    }
    if (jsonObject.hasOwnProperty("Verkäufer")) {
      jsonObject.roles.push("Verkäufer")
      delete jsonObject.Verkäufer
    }
    if (jsonObject.hasOwnProperty("Projektleiter")) {
      jsonObject.roles.push("Projektleiter")
      delete jsonObject.Projektleiter
    }
    if (employeeData && employeeData.id) {
      jsonObject.id = employeeData.id;
    }
    onAccept(jsonObject);
  }

  return (

    <DynamicDialog
      title={title}
      text={text}
      onCancel={onCancel}
      cancelButtonText={cancelButtonText}
      onAccept={parseEmployeeData}
      acceptButtonText={acceptButtonText}
      show={show}
    >
      {inputFields}
      {buttons}
    </DynamicDialog>

  );
}

export default EmployeeDialog;