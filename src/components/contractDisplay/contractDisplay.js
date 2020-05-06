import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Loading from '../loading/loading';
import OfferEntry from '../offerEntry/offerEntry';

import NewEntrySegmentDialog from '../newEntrySegmentDialog/newEntrySegmentDialog';
import Alert from '../alert/alert';
import { UserContext } from '../singlePage/singlePage';

import * as API from '../connectionHandler/connectionHandler';
import BackButton from '../layouts/backButton/backButton';



const ContractDisplay = ({ contractData, projectId, onClose, onError, ...props }) => {

    const [contract, setContract] = useState(contractData);
    const [entries, setEntries] = useState(null);
    const [showAlert, setAlertViewState] = useState(false);

    const [newEntryDialog, setNewEntryDialogViewState] = useState(false);

    useEffect(() => {
        if (contract.id) {
            triggerUpdate();
        } else {
            API.saveContractToProject(projectId, contract.id, onError, setNewContractId)
        }
    }, []);

    const triggerUpdate = () => {
        API.getContractData(projectId, contract.id, onError, setContract);
        API.getEntriesFromContract(projectId, contract.id, onError, setEntries);
    }

    const setNewContractId = (data) => {
        contractData.id = data.id;
        triggerUpdate(contractData);
    }

    const addNewEntry = (entry) => {
        API.addNewEntryToOffer(projectId, contract.id, entry, onError, triggerUpdate);
        setNewEntryDialogViewState(false);
    }

    const turnContractIntoInvoice = () => {
        API.turnContractIntoInvoice(projectId, contract.id, onError, onClose);
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
    }));

    const classes = useStyles();

    const user = useContext(UserContext);

    const functionsDisabled = !(user && ((user.roles.includes("Admin") || user.roles.includes("Verkäufer"))));

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

    const header = contract ?
        <ExpansionPanel expanded={true} data-testid="offerDisplay-header">
            <ExpansionPanelSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.offerTitle} >{contract.name}</Typography>
            </ExpansionPanelSummary>
            <div className={classes.buttonsAlign}>
                <Button
                    onClick={() => setNewEntryDialogViewState(true)}
                    data-testid="offerDisplay-button-newSegment"
                    disabled={functionsDisabled}
                >
                    Neuen Segment hinzufügen
                </Button>
                <Button
                    disabled={(contract.id ? false : true) || functionsDisabled}
                    onClick={turnContractIntoInvoice}
                >
                    Auftrag zu Schlussrechnung umwandeln
                </Button>
                <Button
                    disabled={(contract.id ? false : true) || functionsDisabled}
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
            <OfferEntry
                key={index + "-entry"}
                projectId={projectId}
                offerId={contract.id}
                entryData={entry}
                onChange={triggerUpdate}
                onError={onError}
            />)
        : <Loading text={"Lade Daten..."} />;

    const loading = contract ? null : <Loading text={"Lade Daten..."} />;

    const newSegmentDialog =
        <NewEntrySegmentDialog
            show={newEntryDialog}
            onCancel={() => setNewEntryDialogViewState(false)}
            onSubmit={addNewEntry}
        />

    return (
        <div className={classes.root} data-testid={"offerDisplay-container"}>
            <Alert
                title={"Auftrag Löschen"}
                text={"Wollen Sie diesen Auftrag Löschen? Dies kann nicht rückgängig gemacht werden!"}
                onAccept={deleteContract}
                onCancel={() => setAlertViewState(false)}
                show={showAlert}
            />
            <BackButton onClick={onClose} />
            {newSegmentDialog}
            {header}
            {segments}
            {loading}
        </div>
    );
}


export default ContractDisplay;

