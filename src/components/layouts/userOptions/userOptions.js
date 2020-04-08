import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import MailIcon from '@material-ui/icons/Mail';
import BusinessIcon from '@material-ui/icons/Business';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import LanguageIcon from '@material-ui/icons/Language';

const useStyles = makeStyles(() => ({
  password: {
    marginTop: '10px',
    marginBottom: '10px'
  },
  margin: {
    marginTop: '20px'
  }
}));

export default function UserOptions() {
  const classes = useStyles();

  return (
      <div>
        <div className={classes.userDetails}>
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
          <Button className={classes.password} variant="outlined">Passwort ändern</Button>
        </div>

        // This block will just be displayed for the role CEO
        <div className={classes.companyDetails}>
          <FormControl style = {{width: '80%'}} className={classes.margin}>
            <InputLabel htmlFor="input-with-icon-adornment">Firma</InputLabel>
            <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <BusinessIcon />
                  </InputAdornment>
                }
            />
          </FormControl>
          <FormControl style = {{width: '80%'}} className={classes.margin}>
            <InputLabel htmlFor="input-with-icon-adornment">Strasse</InputLabel>
            <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <HomeIcon />
                  </InputAdornment>
                }
            />
          </FormControl>
          <FormControl style = {{width: '80%'}} className={classes.margin}>
            <InputLabel htmlFor="input-with-icon-adornment">PLZ</InputLabel>
            <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <HomeIcon />
                  </InputAdornment>
                }
            />
          </FormControl>
          <FormControl style = {{width: '80%'}} className={classes.margin}>
            <InputLabel htmlFor="input-with-icon-adornment">Ort</InputLabel>
            <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <HomeIcon />
                  </InputAdornment>
                }
            />
          </FormControl>
          <FormControl style = {{width: '80%'}} className={classes.margin}>
            <InputLabel htmlFor="input-with-icon-adornment">Telefon</InputLabel>
            <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                }
            />
          </FormControl>
          <FormControl style = {{width: '80%'}} className={classes.margin}>
            <InputLabel htmlFor="input-with-icon-adornment">Mail</InputLabel>
            <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <MailIcon />
                  </InputAdornment>
                }
            />
          </FormControl>
          <FormControl style = {{width: '80%'}} className={classes.margin}>
            <InputLabel htmlFor="input-with-icon-adornment">URL</InputLabel>
            <Input
                id="input-with-icon-adornment"
                startAdornment={
                  <InputAdornment position="start">
                    <LanguageIcon />
                  </InputAdornment>
                }
            />
          </FormControl>
        </div>
        <Button className={classes.password} variant="outlined">Änderungen speichern</Button>
      </div>
  );
}