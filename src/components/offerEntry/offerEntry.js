import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Loading from '../loading/loading';
import SelectArticleDialog from '../selectArticleDialog/selectArticleDialog';
import NewEntrySegmentDialog from '../newEntrySegmentDialog/newEntrySegmentDialog';
import Alert from '../alert/alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faTools, faPlus } from '@fortawesome/free-solid-svg-icons'

import ArticleTable from '../articleTable/articleTable';

import * as API from '../connectionHandler/connectionHandler';

import '../singlePage/singlePage.css'

const OfferEntry = ({ projectId, offerId, entryData, onChange, onError, ...props }) => {

    const [entry, setEntryData] = useState(null);
    const [articles, setArticles] = useState([]);
    const [deleteEntryAlert, setDeleteEntryAlertShowState] = useState(false);
    const [editEntryDialog, setEditEntryDialogShowState] = useState(false);
    const [addArticleDialog, setAddArticleDialogShowState] = useState(false);

    useEffect(() => {
        updateEntryData();
        API.getArticles(onError, setArticles);
    }, [])

    const updateEntryData = () => {
        API.getEntryData(projectId, offerId, entryData.id, onError, setEntryData);
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
            flexBasis: '8.33%',
        },
        tertiaryHeadingButton: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '8.33%',
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
        buttonWidth: {
            fontSize: theme.typography.pxToRem(15),
            width: 50,
        },
    }));

    const editEntry = (event) => {
        event.stopPropagation();
        setEditEntryDialogShowState(true);
    }

    const addArticle = (event) => {
        event.stopPropagation();
        setAddArticleDialogShowState(true);
    }

    const addNewArticle = (article) => {
        setAddArticleDialogShowState(false);
        API.addArticleToEntry(projectId, offerId, entry.id, article, onError, onChange);
    }

    const deleteEntry = (event) => {
        event.stopPropagation();
        setDeleteEntryAlertShowState(true);
    }

    const deleteEntryConfirmed = () => {
        API.deleteEntryFromOffer(projectId, offerId, entry.id, onError, onChange);
        setDeleteEntryAlertShowState(false);
    }

    const closeDeleteEntryAlert = () => {
        setDeleteEntryAlertShowState(false);
    }

    const editEntryData = (entryData) => {
        delete entryData.articles;
        API.updateEntryData(projectId, offerId, entry.id, entryData, onError, onChange);
        setEditEntryDialogShowState(false);
    }

    const classes = useStyles();

    const body = entry ?
        <ArticleTable projectId={projectId} offerId={offerId} entryId={entry.id} articles={entry.articles} discount={entry.discount} />
        : <Loading text={"Lade Einträge..."} />

    const content = entry ?
        <ExpansionPanel key={entry.name + "-entries-list"}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Typography className={classes.heading}>{entry.name}</Typography>
                <Typography className={classes.secondaryHeading}>{"Rabatt: ".concat(entry.discount ? Number(entry.discount).toFixed(2) : "0.00").concat("%")}</Typography>
                <Tooltip title={"Segmentdetails bearbeiten"} disableFocusListener >
                    <IconButton onClick={editEntry} className={classes.tertiaryHeadingButton} >
                        <FontAwesomeIcon icon={faPen} />
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Segment löschen"} disableFocusListener >
                    <IconButton onClick={deleteEntry} className={classes.tertiaryHeadingButton} >
                        <FontAwesomeIcon icon={faTrash} />
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Neuen Artikel hinzufügen"} disableFocusListener >
                    <IconButton onClick={addArticle} className={classes.tertiaryHeadingButton} tooltip={"Neuen Artikel hinzufügen"}>
                        <FontAwesomeIcon icon={faTools} />
                        <FontAwesomeIcon icon={faPlus} />
                    </IconButton>
                </Tooltip>

            </ExpansionPanelSummary>
            <div className={classes.buttonsAlign}>
                <IconButton >

                </IconButton>
            </div>
            <ExpansionPanelDetails>
                {body}
            </ExpansionPanelDetails>
        </ExpansionPanel>
        : null;

    const dialogs =
        <>
            <Alert
                show={deleteEntryAlert}
                title={"Segment löschen"}
                text={"Sind Sie sicher, dass Sie dieses Segment löschen möchten?"}
                onAccept={deleteEntryConfirmed}
                onCancel={closeDeleteEntryAlert}
            />
            <SelectArticleDialog
                show={addArticleDialog}
                articles={articles}
                onCancel={() => setAddArticleDialogShowState(false)}
                onSubmit={addNewArticle}
            />
            {entry ?
                <NewEntrySegmentDialog
                    show={editEntryDialog}
                    segmentName={entry.name}
                    discount={entry.discount}
                    onCancel={() => setEditEntryDialogShowState(false)}
                    onSubmit={editEntryData}
                />
            : null}
        </>

    return (
        <>
            {content}
            {dialogs}
        </>
    );
};

export default OfferEntry;