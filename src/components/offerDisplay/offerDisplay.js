import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Loading from '../loading/loading';
import OfferEntry from '../offerEntry/offerEntry';

import NewEntrySegmentDialog from '../newEntrySegmentDialog/newEntrySegmentDialog';

import * as API from '../connectionHandler/connectionHandler';
import BackButton from '../layouts/backButton/backButton';



const OfferDisplay = ({ offerData, projectId, onClose, onError, ...props }) => {

    const [offer, setOffer] = useState(offerData);
    const [entries, setEntries] = useState(null);

    const [newEntryDialog, setNewEntryDialogViewState] = useState(false);

    useEffect(() => {
        if (offer.id) {
            triggerUpdate();
        } else {
            API.saveOfferToProject(projectId, offer.id, onError, setNewOfferId)
        }
    }, []);

    const triggerUpdate = () => {
        API.getOfferData(projectId, offer.id, onError, setOffer);
        API.getEntriesFromOffer(projectId, offer.id, onError, setEntries);
    }

    const setNewOfferId = (data) => {
        offerData.id = data.id;
        triggerUpdate(offerData);
    }

    const loadOfferAsPdf = () => {
        API.getOfferAsPDF(projectId, offer.id, onError);
    }

    const addNewEntry = (entry) => {
        API.addNewEntryToOffer(projectId, offer.id, entry, onError, triggerUpdate);
        setNewEntryDialogViewState(false);
    }

    const turnOfferIntoContract = () => {
        API.turnOfferIntoContract(projectId, offer.id, onError, onClose);
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

    const header = offer ?
        <ExpansionPanel expanded={true}>
            <ExpansionPanelSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.offerTitle} >{offer.name}</Typography>
            </ExpansionPanelSummary>
            <div className={classes.buttonsAlign}>
                <Button
                    onClick={() => setNewEntryDialogViewState(true)}
                >
                    Neuen Segment hinzufügen
                </Button>
                <Button
                    disabled={offer.id ? false : true}
                    onClick={loadOfferAsPdf}
                >
                    Offerte als PDF laden
                </Button>
                <Button
                    disabled={offer.id ? false : true}
                    onClick={turnOfferIntoContract}
                >
                    Offerte zu Auftrag umwandeln
                </Button>
            </div>
            <ExpansionPanelDetails>
            </ExpansionPanelDetails>
        </ExpansionPanel>
        : null;

    const segments = entries?
        entries.map((entry, index) =>
            <OfferEntry
                key={index + "-entry"}
                projectId={projectId}
                offerId={offer.id}
                entryData={entry}
                onChange={triggerUpdate}
                onError={onError}
            />)
        : <Loading text={"Lade Daten..."} />;

    const loading = offer ? null : <Loading text={"Lade Daten..."} />;

    const newSegmentDialog =
        <NewEntrySegmentDialog
            show={newEntryDialog}
            onCancel={() => setNewEntryDialogViewState(false)}
            onSubmit={addNewEntry}
        />

    return (
        <>
            <NewEntrySegmentDialog
                show={showNewSegmentDialog}
                onCancel={() => setNewEntrySegmentDialogViewState(false)}
                onSubmit={addEntry}
            />
            <SelectArticleDialog 
                show={showNewArticleDialog != 0}
                articles={articles}
                onCancel={() => setNewArticleDialogViewState(0)}
                onSubmit={addArticle}
            />
            <div className={classes.root}>
                <ExpansionPanel expanded={true}>
                    <ExpansionPanelSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"

                    >
                        <Typography gutterBottom variant="h5" component="h2">{offer.name}</Typography>
                    </ExpansionPanelSummary>
                    <Button onClick={() => setNewEntrySegmentDialogViewState(true)}>Neuen Segment hinzufügen</Button>
                    <Button onClick={saveOffer}>Offerte speichern</Button>
                    <Button onClick={getOfferAsPDF}>Offerte als PDF laden</Button>
                    <ExpansionPanelDetails>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                {entryPanel}
            </div>
            <div className='flexCards'>
            </div>
        </>
            {header}
    );
}


export default OfferDisplay;

