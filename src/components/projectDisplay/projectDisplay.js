import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import ProjectCard from '../projectCard/projectCard';
import NewOfferDialog from '../newOfferDialog/newOfferDialog';
import Loading from '../loading/loading';
import * as API from '../connectionHandler/connectionHandler';

import '../singlePage/singlePage.css'


const ProjectDisplay = ({ projectData, onShowOffer, ...props }) => {

    const [offers, setOfferData] = useState(null);
    const [showNewOfferDialog, setNewOfferDialogViewState] = useState(false);

    const dateOptions = {
        timeZone: "Europe/Zurich",
        hour12: false
    };

    useEffect(() => {
        API.getOffersFromProject(projectData.project_id, setOfferData);
    }, []);

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

    const addNewOffer = (offer) => {
        setNewOfferDialogViewState(false);
        setOfferData([
            ...offers,
            {
                name: offer.offername,
                updated_at: new Date()
                .toLocaleString("de-DE", dateOptions)
                .replace(/(.*)\D\d+/, "$1")
            }
        ]);
        API.postNewOfferToProject(projectData.id);
        API.getOffersFromProject(projectData.id, setOfferData);
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

    const offerCards = offers ?
        addOfferCard.concat(
            offers.map((entry, index) =>
                <ProjectCard
                    key={(index + 1) + "-offerCard"}
                    onClick={() => onShowOffer(entry.offer_id)}
                    projectName={entry.name}
                    description={"Zuletz bearbeitet am: " +
                        new Date(entry.updated_at)
                            .toLocaleString("de-DE", dateOptions)
                            .replace(/(.*)\D\d+/, "$1")}
                />
            )
        )
        : <Loading text={'Lade Offerten...'} />;


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

    return (
        <>
            <NewOfferDialog
                onCancel={() => setNewOfferDialogViewState(false)}
                onSubmit={addNewOffer}
                show={showNewOfferDialog}
            />
            <div className={classes.root}>
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
            </div>
            <div className='flexCards'>
                {offerCards}
            </div>
        </>
    );
}


export default ProjectDisplay;

