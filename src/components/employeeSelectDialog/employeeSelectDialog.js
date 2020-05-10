import React, { useState, useEffect } from "react";
import DynamicDialog from '../dynamicDialog/dynamicDialog';
import Autocomplete from '@material-ui/lab/Autocomplete';

import TextField from '@material-ui/core/TextField';

import * as API from '../connectionHandler/connectionHandler';

const EmployeeSelectDialog = ({ onCancel, onSubmit, show, ...props }) => {

    const acceptButtonText = 'Bestätigen';
    const cancelButtonText = 'Abbrechen';
    const title = 'Zuständigen Mitarbeiter ändern';
    const text = 'Wählen Sie einen neuen zuständigen Mitarbeiter';

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        API.getEmployees(props.onError, setEmployees);
    }, []);

    const employeeSelector =
        <Autocomplete
            id="customer-autocomplete"
            options={employees}
            getOptionLabel={option => option.lastname + ' ' + option.firstname}
            renderInput={(params) =>
                <TextField
                    {...params}
                    id="employee"
                    label="Mitarbeiter"
                    type="textarea"
                    name="employee"
                    fullWidth
                    required
                    margin='dense' />
            }
        />

    const parseEmployeeSelection = (jsonObject) => {
        jsonObject.name = jsonObject.employee;
        delete jsonObject.employee;
        jsonObject.id = employees.find(element =>
            (element.lastname + ' ' + element.firstname == jsonObject.name
            )).id;
        onSubmit(jsonObject);
    }

    return (
        <DynamicDialog
            title={title}
            text={text}
            onCancel={onCancel}
            cancelButtonText={cancelButtonText}
            onAccept={parseEmployeeSelection}
            acceptButtonText={acceptButtonText}
            show={show}
        >
            {employeeSelector}
        </DynamicDialog>
    );
}

export default EmployeeSelectDialog;