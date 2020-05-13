import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DynamicCard from '../dynamicCard/dynamicCard';
import Typography from '@material-ui/core/Typography';

const ContractCards = ({ contracts, setContractDetails }) => {

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
          }
    }));

    const classes = useStyles();

    const dateOptions = {
        timeZone: "Europe/Zurich",
        hour12: false
    };

    const contractsCards = contracts ?
        contracts.map((entry, index) =>
            <DynamicCard
                key={(index + 1) + "-offerCard"}
                onClick={() => setContractDetails(contracts[index])}
                projectName={entry.name}
                description={"Zuletz bearbeitet am: " +
                    new Date(entry.updated_at)
                        .toLocaleString("de-DE", dateOptions)
                        .replace(/(.*)\D\d+/, "$1")}
            />
        ) : <p>Keine Verträge erstellt</p>;

    return (
        <ExpansionPanel className={classes.panel} key={"offer-entries-list"}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Typography className={classes.heading} gutterBottom variant="h5" component="h2">Verträge</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.flexCards}>
                {contractsCards}
            </ExpansionPanelDetails>
        </ExpansionPanel>
    );


}

export default ContractCards;