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

    const onCancel = () => {
        console.log('cancel');
    }

    const onClose = () => {
        console.log('cancel');
    }

    const onAccept = () => {
        console.log('accept');
    }

    const handleChange = (value) => {
        console.log(value);
    }

    const cancelText = 'cancel';
    const acceptText = 'Accept';
    const title = 'title';
    const cancelButton = <p>CancelButton</p>;


    const closeButton =
        onCancel ? <Button onClick={onClose} color="primary">
            {cancelText}
        </Button > : null;

    const text = 'Tragen Sie bitte alle Felder ein, um ein neues Projekt zu erstellen.';

    return (
        <div>
            <Dialog
                open={show}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullScreen={fullScreen}
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent dividers={true}>
                    <DialogContentText id="alert-dialog-description">
                        {text}
                    </DialogContentText>
                    <FormControl
                        className={classes.formControl}
                        fullWidth
                    >
                        <InputLabel id="demo-simple-select-autowidth-label">Kunde</InputLabel>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            //value={}
                            onChange={handleChange}
                            fullWidth
                            margin='dense'
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
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