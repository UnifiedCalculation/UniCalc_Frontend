import React, {useState} from 'react';
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
import DialogContent from "@material-ui/core/DialogContent";

const EditEmployeeDialog = ({employeeData, onCancel, onAccept, show, setErrorMessage}) => {

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
      value: employeeData.id
    },
    {
      id: 'email',
      label: 'Email',
      type: 'textarea',
      required: true,
      value: employeeData.email
    },
    {
      id: 'firstname',
      label: 'Vorname',
      type: 'textarea',
      required: true,
      value: employeeData.firstname
    },
    {
      id: 'lastname',
      label: 'Nachname',
      type: 'textarea',
      required: true,
      value: employeeData.lastname
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

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const [state, setState] = React.useState({
    admin: false,
    pl: false,
    sales: false,
    employee: false,
  });

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
            defaultValue={entry.value ? entry.value : null}
            disabled={entry.disabled}
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

  function handleChange() {
    console.log("change swipe button")
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
          <FormLabel style={{marginBottom: '10px'}} component="legend">Rollen zuweisen</FormLabel>
          <FormGroup>
            <FormControlLabel
                control={<Switch checked={state.admin} onChange={handleChange} name="admin"/>}
                label="Administrator"
            />
            <FormControlLabel
                control={<Switch checked={state.pl} onChange={handleChange} name="pl"/>}
                label="Verkauf"
            />
            <FormControlLabel
                control={<Switch checked={state.sales} onChange={handleChange} name="sales"/>}
                label="Projektleitung"
            />
            <FormControlLabel
                control={<Switch checked={state.employee} onChange={handleChange} name="employee"/>}
                label="Handwerker"
            />
          </FormGroup>
        </FormControl>
      </DynamicDialog>
  );
}

export default EditEmployeeDialog;