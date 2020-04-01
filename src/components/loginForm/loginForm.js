import React from 'react';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';

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
            marginRight: 25,
            marginLeft: 5,
            marginTop: 15,
          }
        }
      }
    });

    let classes = makeStyles(theme => ({
      root: {
        "& .MuiTextField-root": {
          margin: theme.spacing(1)
        }
      },
      buttons: {
        buttons: {
          margin: 'auto',
          flexWrap: 'wrap',
          alignSelf: 'auto',
          justifyContent: 'center',
        }
      }
    }));

    return (
      <div>
          <div>
            <TextField
              required
              InputLabelProps={{ required: true }}
              name="email"
              id="email"
              label="E-Mail"
            />
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
            <div className={classes.buttons}>
              <Button type="submit" variant="contained" color="primary" disabled={false}>
                Login
                      </Button>
              <Button type="button" variant="contained" color="secondary" disabled={true} >
                Logout
                      </Button>
            </div>
          </ThemeProvider>

      </div>
    );
  }
}

export default LoginForm;