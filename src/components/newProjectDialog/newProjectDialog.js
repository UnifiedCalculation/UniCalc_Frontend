import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';

import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const NewProjectDialog = ({ customerList, onSubmit, show, ...props }) => {


    const textfields = [
        {
            id: 'projectname',
            label: 'Projektname',
            type: 'text',
            required: true
        },
        {
            id: 'adress',
            label: 'Adresse',
            type: 'address',
            required: true
        },
        {
            id: 'adressNumber',
            label: 'Hausnummer',
            type: 'number',
            required: true
        },
        {
            id: 'zipcode',
            label: 'Postleitzahl',
            type: 'number',
            required: true
        },
        {
            id: 'city',
            label: 'Stadt',
            type: 'text',
            required: true
        },
        {
            id: 'description',
            label: 'Beschreibung',
            type: 'text',
            required: true
        }
    ];

    return (
        <div>
                        {textfields.map(entry => {
                            console.log(entry)
                            return <TextField
                                autoFocus
                                id={entry.id}
                                key={entry.id}
                                label={entry.label}
                                type={entry.type}
                                required={entry.required}
                                fullWidth
                                multiline
                                margin='dense'
                            />
                        }

                        )}
        </div>
    )
}

export default NewProjectDialog;