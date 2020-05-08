import React, {useEffect, useState} from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import DynamicDialog from "../../../dynamicDialog/dynamicDialog"
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {func} from "prop-types";

const EditEmployeeDialog = ({employeeData, setEmployeeData, onCancel, onAccept, show, setErrorMessage}) => {

  const [employeeRoles, setEmployeeRoles] = useState({});

  const roles = {
    admin: employeeData ? employeeData.roles.admin : null,
    pl: employeeData ? employeeData.roles.admin : null,
    sales: employeeData ? employeeData.roles.admin : null,
    employee: employeeData ? employeeData.roles.admin : null
  }

  useEffect(() => {
    setEmployeeRoles(roles)
    console.log(employeeRoles);
  }, [])

  const cancelButtonText = 'Abbrechen';
  const acceptButtonText = 'Bestätigen';
  const title = 'Änderungen speichern';
  const text = 'Ändern Sie die gewünschten Angaben des Mitarbeiters.';
  const textfields = [
    {
      id: 'employeeId',
      label: 'Mitarbeiternummer',
      type: 'textarea',
      required: true,
      disabled: true,
      value: roles.admin
      //value: employeeData ? employeeData.id : null
    },
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
    userDetails: {
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
            autoComplete={false}
            defaultValue={entry.value ? entry.value : null}
            disabled={entry.disabled}
            onChange={e => handleInputChange(e.target.value, e.target.name)}
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

  function handleInputChange(value, name) {
    let copy = JSON.parse(JSON.stringify(employeeData))
    copy[name] = value
    setEmployeeData(copy)
    console.log(employeeData);
  }

  function handleRoleSwitch(value, name) {
    let copy = JSON.parse(JSON.stringify(employeeData))
    copy.roles[name] = value
    setEmployeeData(copy)
  }

  return (

      <DynamicDialog
          title={title}
          text={text}
          onCancel={onCancel}
          cancelButtonText={cancelButtonText}
          onAccept={onAccept}
          acceptButtonText={acceptButtonText}
          show={show}
      >
        {inputFields}
        <FormControl className={classes.userRoles} component="fieldset">
          <FormLabel style={{marginBottom: '10px'}} component="legend">Rollen</FormLabel>
          <FormGroup>
            <FormControlLabel
                control={<Switch defaultChecked={employeeData ? employeeData.roles.admin : null}
                                 onChange={e => handleRoleSwitch(e.target.checked, e.target.name)}
                                 name="admin"/>}
                label="Administrator"
            />
            <FormControlLabel
                control={<Switch defaultChecked={employeeData ? employeeData.roles.pl : null}
                                 onChange={() => console.log("clicked")}
                                 name="pl"/>}
                label="Projektleitung"
            />
            <FormControlLabel
                control={<Switch defaultChecked={employeeData ? employeeData.roles.sales : null}
                                 onChange={() => console.log("clicked")}
                                 name="sales"/>}
                label="Verkauf"
            />
            <FormControlLabel
                control={<Switch defaultChecked={employeeData ? employeeData.roles.employee : null}
                                 onChange={() => console.log("clicked")}
                                 name="employee"/>}
                label="Handwerker"
            />
          </FormGroup>
        </FormControl>
      </DynamicDialog>

  );
}

export default EditEmployeeDialog;