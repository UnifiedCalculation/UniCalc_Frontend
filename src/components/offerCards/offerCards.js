import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DynamicCard from '../dynamicCard/dynamicCard';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'


import { UserContext } from '../singlePage/singlePage';

const OfferCards = ({ offers, setOfferDetails, onNewOffer }) => {

    const useStyles = makeStyles((theme) => ({
        panel: {
            padding: 25
        },
        flexCards: {
            display: 'flex',
            flexDirection: 'row',
            padding: '25px',
            margin: 'auto',
            flexWrap: 'wrap',
            alignSelf: 'auto',
            alignItems: 'center',
            justifyContent: 'center',
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

    const classes = useStyles();

    const user = useContext(UserContext);

    const dateOptions = {
        timeZone: "Europe/Zurich",
        hour12: false
    };

    const triggerNewOfferDialog = (event) => {
        event.stopPropagation();
        onNewOffer();
    }

    const offerCards = offers ?
        offers.map((entry, index) =>
            <DynamicCard
                key={(index + 1) + "-offerCard-detail"}
                onClick={() => setOfferDetails(offers[index])}
                projectName={entry.name}
                description={"Zuletz bearbeitet am: " +
                    new Date(entry.updated_at)
                        .toLocaleString("de-DE", dateOptions)
                        .replace(/(.*)\D\d+/, "$1")}
            />
        ) : <p>Keine Offerten erstellt</p>;

    return (
        <ExpansionPanel className={classes.panel} key={"offer-entries-list"}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Typography className={classes.heading} gutterBottom variant="h5" component="h2">Offerten</Typography>
                <IconButton className={classes.tertiaryHeadingButton} onClick={triggerNewOfferDialog} disabled={!(user && ((user.roles.some(element => element.name == "Admin") || user.roles.some(element => element.name == "Verkäufer")))) }>
                    <FontAwesomeIcon icon={faPen} />
                </IconButton>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.flexCards}>
                {offerCards}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );


}

export default OfferCards;