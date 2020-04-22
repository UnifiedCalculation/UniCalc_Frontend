import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
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
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(() => ({
  password: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  userDetails: {
    marginTop: '20px'
  },
  addEmployee: {
    marginBottom: '20px'
  },
  userRoles: {
    marginTop: '40px'
  }
}));

export default function UserAdd() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const [state, setState] = React.useState({
    admin: false,
    pl: false,
    sales: false,
    employee: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <div>
        <Button className={classes.addEmployee} variant="outlined" color="primary" onClick={handleClickOpen}>
          <PersonAddIcon/> Mitarbeiter erstellen
        </Button>
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Mitarbeiter erfassen"}</DialogTitle>
          <DialogContent className={classes.userDetails}>
            <DialogContentText>
            </DialogContentText>

            <FormControl style = {{width: '80%'}} className={classes.userDetails}>
              <InputLabel htmlFor="input-with-icon-adornment">Email</InputLabel>
              <Input
                     id="input-with-icon-adornment"
                     startAdornment={
                       <InputAdornment position="start">
                         <MailIcon />
                       </InputAdornment>
                     }
              />
            </FormControl>
            <FormControl style = {{width: '80%'}} className={classes.userDetails}>
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
            <FormControl style = {{width: '80%'}} className={classes.userDetails}>
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

            <FormControl className={classes.userRoles} component="fieldset">
              <FormLabel style = {{marginBottom: '10px'}} component="legend">Rollen zuweisen</FormLabel>
              <FormGroup>
                <FormControlLabel
                    control={<Switch checked={state.admin} onChange={handleChange} name="admin" />}
                    label="Administrator"
                />
                <FormControlLabel
                    control={<Switch checked={state.pl} onChange={handleChange} name="pl" />}
                    label="Verkauf"
                />
                <FormControlLabel
                    control={<Switch checked={state.sales} onChange={handleChange} name="sales" />}
                    label="Projektleitung"
                />
                <FormControlLabel
                    control={<Switch checked={state.employee} onChange={handleChange} name="employee" />}
                    label="Handwerker"
                />
              </FormGroup>
            </FormControl>

          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Abbrechen
            </Button>
            <Button onClick={handleClose} color="primary" autoFocus>
              Annehmen
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
}

