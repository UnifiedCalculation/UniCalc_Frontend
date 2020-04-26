import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import ProjectCard from '../projectCard/projectCard';
import NewOfferDialog from '../newOfferDialog/newOfferDialog';
import OfferDisplay from '../offerDisplay/offerDisplay';
import BackButton from '../layouts/backButton/backButton';
import * as API from '../connectionHandler/connectionHandler';

import '../singlePage/singlePage.css'


const ProjectDisplay = ({ projectData, onShowOffer, onClose, onError, onChange, ...props }) => {

    const [offers, setOfferData] = useState(null);

    const [offerDetails, setOfferDetails] = useState(null);
    const [showNewOfferDialog, setNewOfferDialogViewState] = useState(false);

    const dateOptions = {
        timeZone: "Europe/Zurich",
        hour12: false
    };

    useEffect(() => {
        getOffersFromProject();
    },[]);

    const getOffersFromProject = () => {
        API.getOffersFromProject(projectData.id, onError, setOfferData);
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '90%',
            margin: 'auto',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            fontWeight: theme.typography.fontWeightRegular,
        },
        table: {
            minWidth: 300,
        },
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

    let addOfferCard = [];
    addOfferCard.push(
        <ProjectCard
            key={'0-offerCard'}
            projectName={'Neue Offerte'}
            description={'Hier eine neue Offerte erstellen!'}
            buttonName={'Neue Offerte hinzufügen...'}
            onClick={openNewOfferDialog}
        />
    );

    const offerCards =
        addOfferCard.concat(offers ?
            offers.map((entry, index) =>
                <ProjectCard
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

    const content = offerDetails ? <OfferDisplay projectId={projectData.id} offerData={offerDetails} onClose={() => setOfferDetails(null)} onError={onError} />
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
                    <Typography gutterBottom variant="h5" component="h2">{projectData.name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    {projectDetails}
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <div className='flexCards'>
                {offerCards}
            </div>
        </div>;

    return (
        content
    );
}


export default ProjectDisplay;

