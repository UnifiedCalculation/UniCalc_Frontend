import React from 'react';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import Button from '@material-ui/core/Button';

const LoginForm = ({ loginFunction, ...props }) => {

    const handleSubmit = (event) => {
        event.preventDefault();
        let jsonObject = {};
        for (const [key, value] of new FormData(event.target).entries()) {
            jsonObject[key] = value;
        }
        event.target.reset();
        console.log(jsonObject.username, jsonObject.password);
    }

    const useStyles = makeStyles(theme => ({
        root: {
            "& .MuiTextField-root": {
                margin: theme.spacing(1),
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

    const theme = createMuiTheme({
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

    const handleChange = () => {
        console.log("stay logged in");
    }

    const classes = useStyles();

    const loginLabel = <p>Please log in</p>;

    return (
        <div>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                {loginLabel}
                <div>
                    <TextField
                        required
                        InputLabelProps={{ required: true }}
                        name="username"
                        id="username"
                        label="Username"
                    />
                    <TextField
                        required
                        InputLabelProps={{ required: true }}
                        id="standard-password-input"
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
            </form>

        </div>
    );
}

export default LoginForm;