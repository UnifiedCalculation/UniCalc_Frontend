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

const EditEmployeeDialog = ({employeeData, onCancel, onAccept, show, setErrorMessage}) => {

  /*  useEffect(() => {
      if (employeeData.role != null && employeeData.role.size > 0) {
        setEmployeeRoles({
          admin: employeeData.roles.contains("admin"),
          pl: employeeData.roles.contains("pl"),
          sales: employeeData.roles.contains("sales"),
          employee: employeeData.roles.contains("employee"),
        })
      }
    }, [employeeData])*/

  const [userState, setUserState] = useState([])
  const [employeeRoles, setEmployeeRoles] = useState({});

  useEffect(() => {
    setEmployeeRoles([
      {
        name: "admin",
        value: employeeData ? employeeData.role.includes('admin') : null
      },
      {
        name: "pl",
        value: employeeData ? employeeData.role.includes('pl') : null
      },
      {
        name: "sales",
        value: employeeData ? employeeData.role.includes('sales') : null
      },
      {
        name: "employee",
        value: employeeData ? employeeData.role.includes('employee') : null,
      }
    ])
    console.log(employeeRoles);
  }, [employeeData])

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
      value: employeeData ? employeeData.id : null
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

  function handleChange(role) {
    let employeeRolesCopy = Array.from(employeeRoles)
    let index = employeeRolesCopy.findIndex(element => element.name === role)
    let found = employeeRolesCopy.find(element => element.name === role)
    found.value = !(found.value)
    //employeeRolesCopy[index] = found
    setEmployeeRoles(employeeRolesCopy)
  }

  function getRoleValue(role) {
    let found = employeeRoles.find(element => element.name === role)
    return found.value
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
                control={<Switch defaultChecked={() => {
                  //getRoleValue('admin')
                  employeeRoles.find(employee => employee.name === 'admin')
                }
                } onChange={() => {
                  handleChange('admin')
                }
                } name="admin"/>}
                label="Administrator"
            />
            <FormControlLabel
                control={<Switch checked={false} onChange={() => {
                  handleChange('pl')
                }} name="pl"/>}
                label="Verkauf"
            />
            <FormControlLabel
                control={<Switch checked={false} onChange={() => {
                  handleChange('sales')
                }} name="sales"/>}
                label="Projektleitung"
            />
            <FormControlLabel
                control={<Switch checked={false} onChange={() => {
                  handleChange('employee')
                }} name="employee"/>}
                label="Handwerker"
            />
          </FormGroup>
        </FormControl>
      </DynamicDialog>

  );
}

export default EditEmployeeDialog;