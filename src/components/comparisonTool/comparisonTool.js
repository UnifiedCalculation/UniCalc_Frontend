import React, { useState, useEffect } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';

import * as API from '../connectionHandler/connectionHandler';

import DynamicDialog from '../dynamicDialog/dynamicDialog';
import Loading from '../loading/loading';
import ArticleTableEntry from '../articleTable/articleTableEntry';
import ArticleTableHead from '../articleTable/articleTableHead';




function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const ComparisonTool = ({ contractId, onSubmit, onCancel, onError, show, ...props }) => {

    const [tabIndex, setIndex] = useState(0);

    const [data, setData] = useState(null);
    const [editedData, setEditedData] = useState(null);
    const [size, setSize] = useState(0);
    const [selected, setSelected] = useState(false);


    const useStyles = makeStyles({
        stepper: {
            flexGrow: 1,
            backgroundColor: 'transparent',
        },
    });

    const classes = useStyles();

    useEffect(() => {
        if(show){
            //API.getComparisonDataForContract(contractId, onError, manipulateData);
            manipulateData(props.data)
        }
    }, [show]);

    const createTables = () => {
        const tables = [];
        let currSize = 0;
        data.entries.forEach((entry, entryIndex) => {
            entry.articles_entries.forEach((article, articleIndex) => {
                tables.push(
                    <TabPanel value={tabIndex} index={entryIndex + articleIndex} key={'swipe-panel-article-comparison-' + currSize}>
                        <TableContainer >
                            <Table aria-label={"comparison-table-" + currSize}>
                                <ArticleTableHead hideFunctionColumn />
                                <ArticleTableEntry entry={getOldEntry(article)} onClick={() => selected ? null : selectOld(entryIndex, articleIndex)} />
                                <ArticleTableEntry entry={getNewEntry(article)} onClick={() => selected ? null : selectNew(entryIndex, articleIndex)} />
                            </Table>
                        </TableContainer>
                    </TabPanel>
                );
                currSize++;
            })
        })
        return tables;
    };

    const manipulateData = (comparisonData) => {
        let length = 0;
        delete comparisonData.created_at;
        delete comparisonData.updated_at;
        comparisonData.entries.forEach(entry => {
            delete entry.created_at;
            delete entry.updated_at;
            entry.articles_entries.forEach(article => 
                length++
            )
        });
        setSize(length);
        console.log(comparisonData);
        setData(comparisonData);
        setEditedData(comparisonData);
    }

    const getOldEntry = (entry) => {
        const oldEntry = Object.assign({}, entry);
        oldEntry.discount = entry.discount.old;
        oldEntry.description = entry.description.old;
        oldEntry.amount = entry.amount.old;
        return oldEntry;
    }

    const getNewEntry = (entry) => {
        const newEntry = Object.assign({}, entry);
        newEntry.discount = entry.discount.new;
        newEntry.description = entry.description.new;
        newEntry.amount = entry.amount.new;
        return newEntry;
    }

    const selectOld = (entryId, articleId) => {
        setSelected(true);
        const editData = editedData
        editData.entries[entryId].articles_entries[articleId].amount =
        data.entries[entryId].articles_entries[articleId].amount.old
        editData.entries[entryId].articles_entries[articleId].discount =
        data.entries[entryId].articles_entries[articleId].discount.old

        editData.entries[entryId].articles_entries[articleId].description =
        data.entries[entryId].articles_entries[articleId].description.old
        
        setEditedData(editData);
    }

    const selectNew = (entryId, articleId) => {
        setSelected(true);
        const editData = editedData
        editData.entries[entryId].articles_entries[articleId].amount =
        data.entries[entryId].articles_entries[articleId].amount.new

        editData.entries[entryId].articles_entries[articleId].discount =
        data.entries[entryId].articles_entries[articleId].discount.new

        editData.entries[entryId].articles_entries[articleId].description =
        data.entries[entryId].articles_entries[articleId].description.new

        setEditedData(editData);
    }

    const handleNext = () => {
        setIndex(tabIndex + 1);
        setSelected(false);
    }

    const stepper = <MobileStepper
        variant="progress"
        steps={size}
        position="static"
        activeStep={tabIndex}
        className={classes.stepper}
        nextButton={
            <Button size="small" onClick={handleNext} disabled={tabIndex === size - 1 || !selected}>
                Vor
                <KeyboardArrowRight />
            </Button>
        }
    />

    const tables = data ? createTables() : null;

    const children = tables ?
        <>
            {tables}
            {stepper}
        </>
        : <Loading text={"Bereite Daten vor..."} />;

    return (
        <DynamicDialog
            title={'Vergleichsassisten'}
            text={'Wählen Sie die Punkte aus, die auf der Schlussrechnung genommen werden sollen. Wenn Sie noch Einträge bearbeiten möchten, '
                + 'drücke Sie auf abbrechen und bearbeiten Sie diese in der Auftragsansicht. Der Obere Eintrag ist der von der Offerte, der untere der vom Auftrag. '
                + 'Durch das drücken auf einen Artikel wird dieser ausgewählt.'}
            show={show}
            onAccept={() => onSubmit(editedData)}
            acceptButtonText={'Änderungen speichern'}
            disableAcceptButton={!(tabIndex === size - 1 && selected)}
            onCancel={onCancel}
            cancelButtonText={'Abbrechen'}
        >
            {children}
        </DynamicDialog>
    )

}

export default ComparisonTool;