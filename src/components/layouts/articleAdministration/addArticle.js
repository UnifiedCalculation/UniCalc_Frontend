import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import DescriptionIcon from '@material-ui/icons/Description';
import ClassIcon from '@material-ui/icons/Class';
import AssignmentIcon from '@material-ui/icons/Assignment';


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
  addArticle: {
    marginBottom: '20px'
  },
  userRoles: {
    marginTop: '40px'
  },
  artIcon: {
    marginRight: '10px'
  }
}));

export default function AddArticle() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

  const [state, setState] = React.useState({
    name: false,
    price: false,
    description: false,
    unit: false,
  });

  const handleChange = (event) => {
    setState({...state, [event.target.name]: event.target.checked});
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <div>
        <Button className={classes.addArticle} variant="outlined" color="primary" onClick={handleClickOpen}>
          <AssignmentIcon className={classes.artIcon}/> Artikel erstellen
        </Button>
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Artikel erstellen"}</DialogTitle>
          <DialogContent>



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