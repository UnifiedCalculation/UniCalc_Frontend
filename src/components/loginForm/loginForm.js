import React from 'react';
import TextField from "@material-ui/core/TextField";
import Logo from '../header/logo.png';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

import './loginForm.css';

class LoginForm extends React.Component {
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
        id: 'email',
        label: 'E-Mail',
        type: 'email',
        required: true
      },
      {
        id: 'password',
        label: 'Passwort',
        type: 'password',
        required: true
      },
    ];

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
          margin='dense'
        />
      </div>
    );


    const uniCalcLogo = <img src={Logo} alt={'Logo uniCalc'} height={'100px'} />
    const textComponent =
      <div className="cardStyle">
        <Typography variant="h6">
          Bitte loggen Sie sich mit Ihrer E-Mail Adresse und Ihrem Passwort ein. Falls Sie noch kein Login haben, können Sie unten auf "Registrieren" drücken.
        </Typography>
      </div>
      ;

    const errorComponent = errorMessage ?
      <div className="cardStyle">
        <Typography variant="h5">
          {errorMessage}
        </Typography>
      </div>
      : null;


    return (
      <>
        <div className="LoginForm">
          <ThemeProvider theme={theme}>
            {uniCalcLogo}
            {textComponent}
            {errorComponent}
            {formFields}
            <div className="cardStyle">
            <Button type="button" variant="contained" color="secondary" href={"/registration"}>
                Registrieren
                      </Button>
              <Button type="submit" variant="contained" color="primary" disabled={false}>
                Login
                      </Button>
            </div>
          </ThemeProvider>

        </div >
      </>
    );
  }
}

export default LoginForm;