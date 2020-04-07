import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import NewEntrySegmentDialog from '../newEntrySegmentDialog/newEntrySegmentDialog';
import SelectArticleDialog from '../selectArticleDialog/selectArticleDialog';

import ArticleTable from '../articleTable/articleTable';

import * as API from '../connectionHandler/connectionHandler';

import '../singlePage/singlePage.css'


const OfferDisplay = ({ offer, projectId, onClose, ...props }) => {

    const [entries, setEntries] = useState(offer.entries);
    const [articles, setArticles] = useState([]);
    const [showNewSegmentDialog, setNewEntrySegmentDialogViewState] = useState(false);
    const [showNewArticleDialog, setNewArticleDialogViewState] = useState(0);

    useEffect(() => {
        API.getArticles(setArticles);
    },[]);

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
        table: {
            minWidth: 300,
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

