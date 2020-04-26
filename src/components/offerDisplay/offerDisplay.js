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

    const openNewArticleDialog = () => {
        setNewArticleDialogViewState(true);
    }

    const classes = useStyles();

    const addEntry = (entry) => {
        setNewEntrySegmentDialogViewState(false);
        setEntries([
            ...entries,
            {
                name: entry.name,
                discount: null,
                articles: []
            }
        ]);
        offer.entries = entries;
    }

    const saveOffer = () => {
        API.saveOfferToProject(projectId, offer);
    }

    const getOfferAsPDF = () => {
        API.getOfferAsPDF(projectId, offer);
    }

    const addArticle = (article) => {
        setEntries(prev => prev.map((a, index) => index === showNewArticleDialog-1 ? ({
        ...a,
        articles: a.articles.concat(article)
      }) : a));
      setNewArticleDialogViewState(0);
    };

    const entryPanel = entries.map((entry, index) =>
        <ExpansionPanel key={index + "entries-list"}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Typography className={classes.heading}>{entry.name}</Typography>
            </ExpansionPanelSummary>
            <Button onClick={() => openNewArticleDialog(index+1)}>Neuen Artikel hinzufügen</Button>
            <ExpansionPanelDetails>
                    {entry.articles.length > 0 ? <ArticleTable articles={entry.articles} /> : null}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );


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
    );
}


export default OfferDisplay;

