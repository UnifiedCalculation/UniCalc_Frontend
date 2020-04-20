import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Switch from '@material-ui/core/Switch';
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import MailIcon from "@material-ui/icons/Mail";
import {makeStyles} from "@material-ui/core/styles";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(() => ({
  password: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  margin: {
    marginTop: '20px'
  }
}));

export default function UserRegister() {
  const [state, setState] = React.useState({
    admin: true,
    pl: false,
    sales: true,
    employee: false,
  });

  const classes = useStyles();


  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (

      <FormControl component="fieldset">
        <FormLabel component="legend">Benutzerdaten erassen</FormLabel>

        <FormControl style = {{width: '80%'}} className={classes.margin} disabled>
          <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
          <Input className={classes.inputText}
                 defaultValue={'standard@mailadress.se'}
                 id="input-with-icon-adornment"
                 startAdornment={
                   <InputAdornment position="start">
                     <MailIcon />
                   </InputAdornment>
                 }
          />
        </FormControl>
        <FormControl style = {{width: '80%'}} className={classes.margin}>
          <InputLabel htmlFor="input-with-icon-adornment">Vorname</InputLabel>
          <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
          />
        </FormControl>
        <FormControl style = {{width: '80%'}} className={classes.margin}>
          <InputLabel htmlFor="input-with-icon-adornment">Nachname</InputLabel>
          <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
          />
        </FormControl>

        <FormLabel component="legend">Rollen zuweisen</FormLabel>
        <FormGroup>
          <FormControlLabel
              control={<Switch checked={state.admin} onChange={handleChange} name="admin" />}
              label="Administrator"
          />
          <FormControlLabel
              control={<Switch checked={state.pl} onChange={handleChange} name="pl" />}
              label="Projektleiter"
          />
          <FormControlLabel
              control={<Switch checked={state.sales} onChange={handleChange} name="sales" />}
              label="Verkäufer"
          />
          <FormControlLabel
              control={<Switch checked={state.employee} onChange={handleChange} name="employee" />}
              label="Arbeiter"
          />
        </FormGroup>
        <FormHelperText>Einem Benutzer können mehrere Rollen zugeteilt werden</FormHelperText>
      </FormControl>
  );
}