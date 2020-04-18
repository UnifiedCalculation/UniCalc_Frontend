import React from 'react';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

import './loginForm.css';

class LoginForm extends React.Component {
  render() {
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
          }
        }
      }
    });


    return (
      <>
        <div className="LoginForm">
          <div className="cardStyle">
            <TextField
              required
              InputLabelProps={{ required: true }}
              name="email"
              id="email"
              label="E-Mail"
            />
          </div>

          <div className="cardStyle">
          <TextField
            required
            InputLabelProps={{ required: true }}
            id="password"
            name="password"
            label="Password"
            type="password"
          />
        </div>

        <ThemeProvider theme={theme}>

          <div className="cardStyle">
            <Button type="submit" variant="contained" color="primary" disabled={false}>
              Login
                      </Button>
            <Button type="button" variant="contained" color="secondary" disabled={true}>
              Logout
                      </Button>
          </div>
        </ThemeProvider>

      </div >
      </>
    );
  }
}

export default LoginForm;