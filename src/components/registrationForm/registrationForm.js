import React from 'react';
import Logo from '../header/logo.png';
import Typography from '@material-ui/core/Typography';
import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretSquareUp } from '@fortawesome/free-solid-svg-icons'
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';

import './registrationForm.css';

class RegistrationForm extends React.Component {
  render(errorMessage, ...props) {

    let theme = createMuiTheme({
      overrides: {
        MuiFormControlLabel: {
          root: {
            paddingTop: 10,
            paddingLeft: 10,
            color: '#000000'
          }
        },
        MuiButton: {
          root: {
            margin: 15,
            minWidth: 300,
          }
        },
        MuiTypography: {
          h5: {
            margin: 15,
            color: "#db0000",
            maxWidth: 400,
            fontSize: '1rem',
            '@media (min-width:600px)': {
              fontSize: '1.5rem',
            },
          },
          h6: {
            margin: 15,
            maxWidth: 400,
            fontSize: '1rem',
            '@media (min-width:600px)': {
              fontSize: '1.5rem',
            },
          }
        }
      }
    });

    const formData = [
      {
        id: 'company_name',
        label: 'Firmenname',
        type: 'text',
        required: true,
      },
      {
        id: 'phone_number',
        label: 'Telefonnummer',
        type: 'tel',
        required: true
      },
      {
        id: 'email',
        label: 'E-Mail',
        type: 'email',
        required: true
      },
      {
        id: 'webpage',
        label: 'Webseite',
        type: 'url',
        required: false
      },
      {
        id: 'address',
        label: 'Adresse',
        type: 'text',
        required: true
      },
      {
        id: 'zip',
        label: 'Postleitzahl',
        type: 'number',
        required: true,
        inputProps: {
          min: "0",
          step: "1"
        },
      },
      {
        id: 'city',
        label: 'Stadt',
        type: 'text',
        required: true
      },
      {
        id: 'country',
        label: 'Land',
        type: 'text',
        required: true,
        select: true,
        options: [
            {
              name: 'Switzerland',
              value: 'CH'
            }
          ],
      },
      {
        id: 'owner_firstname',
        label: 'Vorname Eigentümer*in',
        type: 'text',
        required: true
      },
      {
        id: 'owner_surname',
        label: 'Nachname Eigentümer*in',
        type: 'text',
        required: true
      },
      {
        id: 'iban',
        label: 'IBAN Firmenkonto',
        type: 'text',
        required: true
      },
      {
        id: 'password',
        label: 'Passwort',
        type: 'password',
        required: true
      },
      {
        id: 'password_confirmation',
        label: 'Passwort wiederholen',
        type: 'password',
        required: true
      },
    ];

    const checkFile = (event) => {
      var ext = event.target.value.match(/\.([^\.]+)$/)[1];
      switch (ext) {
        case 'jpg':
        case 'bmp':
        case 'png':
        case 'tif':
          break;
        default:
          alert('Die Datei hat ein falsches Format. Nur *.jpg oder *.png Dateien hochladen!');
          event.target.value = null;
      };
    }

    const uniCalcLogo = <img src={Logo} alt={'Logo uniCalc'} height={'100px'} />
    const textComponent =
      <div className="cardStyle">
        <Typography variant="h6">
          Bitte füllen Sie alle mit einem * markierten Felder aus, um sich und Ihre Firma zu registrieren. Die E-Mail Adresse sowie das Passwort können dann anschliessen als Login verwendet werden.
        </Typography>
      </div>
      ;


    const formFields = formData.map((entry, index) =>
      <div className="cardStyle">
        <TextField
          inputProps={entry.inputProps}
          type={entry.type}
          id={entry.id}
          name={entry.id}
          key={index + '-textField'}
          label={entry.label}
          required={entry.required}
          fullWidth
          select={entry.select ? true : false}
          native={entry.select ? true : false}
          margin='dense'
          autoComplete={false}
        >
          {entry.select ? 
          entry.options.map((entry, index) => 
          <MenuItem key={entry.value} value={entry.value}>
              {entry.name}
            </MenuItem>
          )
          : null}
        </TextField>
      </div>
    );

    const errorComponent = errorMessage ?
      <div className="cardStyle">
        <Typography variant="h5">
          {errorMessage}
        </Typography>
      </div>
      : null;

    const logoUploadComponent =
      <Button
        variant="contained"
        component="label"
        startIcon={<FontAwesomeIcon icon={faCaretSquareUp} />}
      >
        Firmenlogo laden*
      <input
          type="file"
          style={{ display: "none" }}
          required={true}
          accept={".jpg,.jpeg,.png,image/vnd.sealedmedia.softseal.jpg,image/png"}
          onChange={checkFile}
        />
      </Button>

    return (
      <>
        <div className="RegistrationForm">
          <ThemeProvider theme={theme}>
            {uniCalcLogo}
            {textComponent}
            {errorComponent}
            {formFields}
            {logoUploadComponent}
            <div className="cardStyle">
              <Button type="submit" variant="contained" color="primary" disabled={false}>
                Registrieren
              </Button>
            </div>
          </ThemeProvider>

        </div >
      </>
    );
  }
}

export default RegistrationForm;