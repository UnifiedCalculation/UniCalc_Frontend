import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

import ProjectDetails from '../projectDetails/projectDetails';

import OfferCards from '../offerCards/offerCards';
import ContractCards from '../contractCards/contractCards';
import NewOfferDialog from '../newOfferDialog/newOfferDialog';
import OfferDisplay from '../offerDisplay/offerDisplay';
import BackButton from '../layouts/backButton/backButton';
import * as API from '../connectionHandler/connectionHandler';



const ProjectDisplay = ({ projectData, onShowOffer, onClose, onError, onChange, ...props }) => {

    const [offers, setOffers] = useState(null);
    const [contracts, setContracts] = useState(null);

    const [offerDetails, setOfferDetails] = useState(null);
    const [showNewOfferDialog, setNewOfferDialogViewState] = useState(false);

    useEffect(() => {
        getOffersFromProject();
        getContractsFromProject();
    },[]);

    const getOffersFromProject = () => {
        API.getOffersFromProject(projectData.id, onError, setOffers);
    }

    const getContractsFromProject = () => {
        API.getContractsFromProject(projectData.id, onError, setContracts);
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '90%',
            margin: 'auto',
        },
        heading: {
            fontSize: theme.typography.pxToRem(35),
            fontWeight: theme.typography.fontWeightRegular,
            flexBasis: '93.00%',
            flexShrink: 0,
        },
        tertiaryHeadingButton: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '7.00%',
        }
    }));

    const addNewOffer = (offer) => {
        setNewOfferDialogViewState(false);
        offer.payment_target += ' Tage';
        offer.updated_at = new Date();
        offer.projectId = projectData.id;
        API.saveOfferToProject(projectData.id, offer, onError, getOffersFromProject);
    }

    const openNewOfferDialog = () => {
        setNewOfferDialogViewState(true);
    }

    const classes = useStyles();

    const offerCards =
        addOfferCard.concat(offers ?
            offers.map((entry, index) =>
                <DynamicCard
                    key={(index + 1) + "-offerCard"}
                    onClick={() => setOfferDetails(offers[index])}
                    projectName={entry.name}
                    description={"Zuletz bearbeitet am: " +
                        new Date(entry.updated_at)
                            .toLocaleString("de-DE", dateOptions)
                            .replace(/(.*)\D\d+/, "$1")}
                />
            ) : null
        );

    const projectDetails = projectData ?
        <TableContainer >
            <Table className={classes.table} aria-label="simple table">
                <TableBody>
                    <TableRow key={0 + "-projectDetails"}>
                        <TableCell component="th" scope="row">
                            Adresse
                            </TableCell>
                        <TableCell align="right">{projectData.address}</TableCell>
                    </TableRow>
                    <TableRow key={1 + "-projectDetails"}>
                        <TableCell component="th" scope="row">
                            Postleitzahl
                            </TableCell>
                        <TableCell align="right">{projectData.zip}</TableCell>
                    </TableRow>
                    <TableRow key={2 + "-projectDetails"}>
                        <TableCell component="th" scope="row">
                            Stadt
                            </TableCell>
                        <TableCell align="right">{projectData.city}</TableCell>
                    </TableRow>
                    <TableRow key={3 + "-projectDetails"}>
                        <TableCell component="th" scope="row">
                            Beschreibung
                            </TableCell>
                        <TableCell align="right">{projectData.description}</TableCell>
                    </TableRow>

                    <TableRow key={4 + "-projectDetails"}>
                        <TableCell component="th" scope="row">
                            Festgelegte Zeit zu zahlen
                            </TableCell>
                        <TableCell align="right">{projectData.payment_target}</TableCell>
                    </TableRow>
                </TableBody>
            </Table >
        </TableContainer >
        : null;

    const content = offerDetails ? 
        <OfferDisplay projectId={projectData.id} offerData={offerDetails} onClose={() => setOfferDetails(null)} onError={onError} />
        : <div className={classes.root}>
            <BackButton onClick={onClose} />
            <NewOfferDialog
                onCancel={() => setNewOfferDialogViewState(false)}
                onSubmit={addNewOffer}
                show={showNewOfferDialog}
            />
            <ExpansionPanel expanded={true}>
                <ExpansionPanelSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"

                >
                    <Typography className={classes.heading} gutterBottom variant="h5" component="h2">{projectData.name}</Typography>
                    <IconButton className={classes.tertiaryHeadingButton} >
                        <FontAwesomeIcon icon={faPen} />
                    </IconButton>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {projectDetails}
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <div className={classes.flexCards}>
                {offerCards}
            </div>
        </div>;

    return (
        content
    );
}


export default ProjectDisplay;

