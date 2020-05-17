import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Loading from '../loading/loading';
import DynamicEntry from '../dynamicEntry/dynamicEntry';

import Alert from '../alert/alert';
import { UserContext } from '../singlePage/singlePage';

import * as API from '../connectionHandler/connectionHandler';
import BackButton from '../layouts/backButton/backButton';



const InvoiceDisplay = ({ invoiceData, projectId, onClose, onError, ...props }) => {

    const [invoice, setInvoice] = useState(invoiceData);
    const [entries, setEntries] = useState(null);
    const [showAlert, setAlertViewState] = useState(false);

    useEffect(() => {
        if (invoice.id) {
            triggerUpdate();
        } else {
        }
    }, []);

    const triggerUpdate = () => {
        API.getInvoiceData(projectId, invoice.id, onError, setInvoice);
        API.getEntriesFromInvoice(projectId, invoice.id, onError, setEntries);
    }

    const setNewContractId = (data) => {
        invoiceData.id = data.id;
        triggerUpdate(invoiceData);
    }

    const loadInvoiceAsPDF = () => {
        API.getInvoiceAsPDF(projectId, invoice.id, onError);
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

    const functionsDisabled = !(user && ((user.roles.some(element => element.name == "Admin") || user.roles.some(element => element.name == "Verkäufer"))));

    const warnBeforeDeletion = () => {
        setAlertViewState(true);
    }

    const deleteInvoice = () => {
        API.deleteInvoiceFromProject(projectId, invoice.id, onError, afterDelete);
    }

    const afterDelete = () => {
        setAlertViewState(false);
        onClose();
    }

    const header = invoice ?
        <ExpansionPanel expanded={true} data-testid="offerDisplay-header">
            <ExpansionPanelSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.offerTitle} >{invoice.name}</Typography>
            </ExpansionPanelSummary>
            <div className={classes.buttonsAlign}>
                
            <a href={"/projects/" + projectId + "/forms/" + invoice.id + "/pdf"}
                    target={"_blank"}
                >
                <Button
                    disabled={(invoice.id ? false : true) || functionsDisabled}
                    onClick={loadInvoiceAsPDF}
                >
                    Schlussrechnung als PDF laden
                </Button>
                </a>
                <Button
                    disabled={(invoice.id ? false : true) || functionsDisabled}
                    onClick={warnBeforeDeletion}
                    color="secondary"
                >
                    Schlussrechnung Löschen
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
                invoiceId={invoice.id}
                entryData={entry}
                onChange={triggerUpdate}
                onError={onError}
                deactivateFunctions
            />)
        : <Loading text={"Lade Daten..."} />;

    const loading = invoice ? null : <Loading text={"Lade Daten..."} />;

    return (
        <div className={classes.root} data-testid={"offerDisplay-container"}>
            <Alert
                title={"Schlussrechnung Löschen"}
                text={"Wollen Sie diese Schlussrechnung Löschen? Dies kann nicht rückgängig gemacht werden!"}
                onAccept={deleteInvoice}
                onCancel={() => setAlertViewState(false)}
                show={showAlert}
            />
            <BackButton onClick={onClose} />
            {header}
            {segments}
            {loading}
        </div>
    );
}


export default InvoiceDisplay;

