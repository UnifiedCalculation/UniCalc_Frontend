import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import ArticleTable from '../articleTable/articleTable';

import * as API from '../connectionHandler/connectionHandler';

import '../singlePage/singlePage.css'


const OfferDisplay = ({ offer, projectId, onClose, ...props }) => {

    const [entries, setEntries] = useState(offer.entries);

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

    const classes = useStyles();

    const addEntry = (entry) => {
        setEntries([
            ...entries,
            entry
        ]);
    }

    const entryPanel = entries.map((entry, index) =>
        <ExpansionPanel key={index + "entries-list"}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Typography className={classes.heading}>{entry.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Typography>
                    <ArticleTable articles={entry.articles} />
          </Typography>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );


    return (
        <>
            <div className={classes.root}>
                <ExpansionPanel expanded={true}>
                    <ExpansionPanelSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"

                    >
                        <Typography gutterBottom variant="h5" component="h2">{offer.name}</Typography>
                    </ExpansionPanelSummary>
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

