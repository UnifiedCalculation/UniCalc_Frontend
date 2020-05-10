import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Loading from '../loading/loading';
import DynamicEntry from '../dynamicEntry/dynamicEntry';

import NewEntrySegmentDialog from '../newEntrySegmentDialog/newEntrySegmentDialog';
import EmployeeSelectDialog from '../employeeSelectDialog/employeeSelectDialog';
import Alert from '../alert/alert';
import { UserContext } from '../singlePage/singlePage';

import * as API from '../connectionHandler/connectionHandler';
import BackButton from '../layouts/backButton/backButton';



const ContractDisplay = ({ contractData, projectId, onClose, onError, ...props }) => {

    const [contract, setContract] = useState(contractData);
    const [entries, setEntries] = useState(null);
    const [showAlert, setAlertViewState] = useState(false);
    const [employee, setEmployee] = useState(null);
    const [selectEmployeeViewState, setSelectEmployeeDialogViewState] = useState(false);

    const [newEntryDialog, setNewEntryDialogViewState] = useState(false);

    useEffect(() => {
        triggerUpdate();
        API.getEmployeeData(contractData.employee_id, onError, filterEmployeeData);
    }, []);

    const filterEmployeeData = (employeeData) => {
        delete employeeData.roles;
        delete employeeData.email;
        setEmployee(employeeData);
    }

    const triggerUpdate = () => {
        API.getContractData(projectId, contract.id, onError, setContract);
        API.getEntriesFromContract(projectId, contract.id, onError, setEntries);
    }

    const addNewEntry = (entry) => {
        API.addNewEntryToContract(projectId, contract.id, entry, onError, triggerUpdate);
        setNewEntryDialogViewState(false);
    }

    const turnContractIntoInvoice = () => {
        API.turnContractIntoInvoice(projectId, contract.id, onError, onClose);
    }

    const changeAssignedEmployee = (newEmployee) => {
        API.changeEmployeeAssigneToContract(contract.id, newEmployee.id, onError, onClose)
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '90%',
            margin: 'auto',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            color: theme.palette.text.secondary,
        },
        tertiaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
        },
        offerTitle: {
            fontSize: theme.typography.pxToRem(35),
            fontWeight: theme.typography.fontWeightRegular,
            margin: "auto"
        },
        noSegmentsTitle: {
            fontSize: theme.typography.pxToRem(25),
            fontWeight: theme.typography.fontWeightRegular,
            textAlign: "center",
            padding: 50,
        },
        table: {
            minWidth: 300,
        },
        buttonsAlign: {
            textAlign: "center",
        },
        assignedEmployee: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
            margin: "auto"
        }
    }));

    const classes = useStyles();

    const user = useContext(UserContext);

    const functionsDisabled = !(user.roles.includes("Admin") || user.roles.includes("Verkäufer") || user.roles.includes("Projektleiter"));

    const warnBeforeDeletion = () => {
        setAlertViewState(true);
    }

    const deleteContract = () => {
        API.deleteContractFromProject(projectId, contract.id, onError, afterDelete);
    }

    const afterDelete = () => {
        setAlertViewState(false);
        onClose();
    }

    const assignedEmployee = employee ?
        <Typography className={classes.assignedEmployee} >
            {"Zuständiger Mitarbeiter: " + employee.firstname + ' ' + employee.lastname}
        </Typography>
        : null;

    const header = contract ?
        <ExpansionPanel expanded={true} data-testid="offerDisplay-header">
            <ExpansionPanelSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.offerTitle} >{contract.name}</Typography>
                {assignedEmployee}
            </ExpansionPanelSummary>
            <div className={classes.buttonsAlign}>
                <Button
                    onClick={() => setNewEntryDialogViewState(true)}
                    data-testid="offerDisplay-button-newSegment"
                >
                    Neuen Segment hinzufügen
                </Button>
                <Button
                    disabled={functionsDisabled}
                    onClick={turnContractIntoInvoice}
                >
                    Auftrag zu Schlussrechnung umwandeln
                </Button>
                <Button
                    onClick={() => setSelectEmployeeDialogViewState(true)}
                >
                    Zuständiger Mitarbeiter ändern
                </Button>
                <Button
                    disabled={functionsDisabled}
                    onClick={warnBeforeDeletion}
                    color="secondary"
                >
                    Auftrag Löschen
                </Button>
            </div>
            <ExpansionPanelDetails>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        : null;

    const segments = entries ?
        entries.map((entry, index) =>
            <DynamicEntry
                key={index + "-entry"}
                projectId={projectId}
                contractId={contract.id}
                entryData={entry}
                onChange={triggerUpdate}
                onError={onError}
            />)
        : <Loading text={"Lade Daten..."} />;

    const loading = contract ? null : <Loading text={"Lade Daten..."} />;

    const dialogs =
        <>
            <NewEntrySegmentDialog
                show={newEntryDialog}
                onCancel={() => setNewEntryDialogViewState(false)}
                onSubmit={addNewEntry}
            />
            <Alert
                title={"Auftrag Löschen"}
                text={"Wollen Sie diesen Auftrag Löschen? Dies kann nicht rückgängig gemacht werden!"}
                onAccept={deleteContract}
                onCancel={() => setAlertViewState(false)}
                show={showAlert}
            />
            <EmployeeSelectDialog
                onCancel={() => setSelectEmployeeDialogViewState(false)}
                onSubmit={changeAssignedEmployee}
                onError={onError} 
                show={selectEmployeeViewState}
                />
        </>

    return (
        <div className={classes.root} data-testid={"offerDisplay-container"}>
            <BackButton onClick={onClose} />
            {dialogs}
            {header}
            {segments}
            {loading}
        </div>
    );
}


export default ContractDisplay;

