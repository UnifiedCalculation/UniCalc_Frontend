import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Loading from '../loading/loading';
import SelectProductDialog from '../selectProductDialog/selectProductDialog';
import NewEntrySegmentDialog from '../newEntrySegmentDialog/newEntrySegmentDialog';
import Alert from '../alert/alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrash, faTools, faPlus } from '@fortawesome/free-solid-svg-icons'

import ArticleTable from '../articleTable/articleTable';
import { UserContext } from '../singlePage/singlePage';
import EditProductDialog from '../editProductDialog/editProductDialog';

import * as API from '../connectionHandler/connectionHandler';

const DynamicEntry = ({ projectId, offerId, contractId, invoiceId, entryData, onChange, onError, deactivateFunctions = false, ...props }) => {

    const [entry, setEntryData] = useState(null);
    const [entryProducts, setEntryProducts] = useState(null);
    const [products, setProducts] = useState([]);
    const [deleteEntryAlert, setDeleteEntryAlertShowState] = useState(false);
    const [editEntryDialog, setEditEntryDialogShowState] = useState(false);
    const [addArticleDialog, setAddArticleDialogShowState] = useState(false);

    const [productToDelete, setProductToDelete] = useState(null);
    const [productToEdit, setProductToEdit] = useState(null);

    useEffect(() => {
        updateData();
        API.getProducts(onError, setProducts);
    }, [])

    const updateData = () => {
        if (offerId != null) {
            updateOfferEntryData();
        } else if (contractId != null) {
            updateContractEntryData();
        } else {
            updateInvoiceEntryData();
        }
    }
    const updateOfferEntryData = () => {
        API.getEntryDataForOffer(projectId, offerId, entryData.id, onError, setEntryData);
        API.getEntryProductsForOffer(projectId, offerId, entryData.id, onError, setEntryProducts);
    }

    const updateContractEntryData = () => {
        API.getEntryDataForContract(projectId, contractId, entryData.id, onError, setEntryData);
        API.getEntryProductsForContract(projectId, contractId, entryData.id, onError, setEntryProducts);
    }

    const updateInvoiceEntryData = () => {
        API.getEntryDataForInvoice(projectId, invoiceId, entryData.id, onError, setEntryData);
        API.getEntryProductsForInvoice(projectId, invoiceId, entryData.id, onError, setEntryProducts);
    }

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '90%',
            margin: 'auto',
        },
        heading: {
            fontSize: theme.typography.pxToRem(25),
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

    const user = useContext(UserContext);

    const functionsDisabled = !(user && ((user.roles.some(element => element.name == "Admin") || user.roles.some(element => element.name == "Verkäufer"))));

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
        if (offerId != null) {
            API.addArticleToOfferEntry(projectId, offerId, entry.id, article, onError, updateData);
        } else if (contractId != null) {
            API.addArticleToContractEntry(projectId, contractId, entry.id, article, onError, updateData);
        }
    }

    const deleteEntry = (event) => {
        event.stopPropagation();
        setDeleteEntryAlertShowState(true);
    }

    const deleteEntryConfirmed = () => {
        if (offerId != null) {
            API.deleteEntryFromOffer(projectId, offerId, entry.id, onError, onChange);
        } else if (contractId != null) {
            API.deleteEntryFromContract(projectId, contractId, entry.id, onError, onChange);
        }
        setDeleteEntryAlertShowState(false);
    }

    const closeDeleteEntryAlert = () => {
        setDeleteEntryAlertShowState(false);
    }

    const editEntryData = (entryData) => {
        console.log(JSON.stringify(entryData));
        if (offerId != null) {
            API.updateOfferEntryData(projectId, offerId, entry.id, entryData, onError, onChange);
        } else if (contractId != null) {
            API.updateContractEntryData(projectId, contractId, entry.id, entryData, onError, onChange);
        }
        setEditEntryDialogShowState(false);
    }

    const confirmDeleteProduct = (productId) => {
        setProductToDelete(productId)
    }

    const cancelProductDelete = () => {
        setProductToDelete(null);
    }

    const deleteProductConfirmed = () => {
        if (offerId != null) {
            API.deleteProductFromEntryInOffer(projectId, offerId, entry.id, productToDelete, onError, hideAlertAndReload)
        } else if (contractId != null) {
            API.deleteProductFromEntryInContract(projectId, offerId, entry.id, productToDelete, onError, hideAlertAndReload)
        }
    }

    const hideAlertAndReload = () => {
        setProductToDelete(null);
        updateData();
    }

    const editProduct = (product) => {
        setProductToEdit(product);
    }

    const submitEditedProduct = (changedProduct) => {
        productToEdit.amount = changedProduct.amount;
        productToEdit.discount = changedProduct.discount;
        productToEdit.description = changedProduct.discount;
        if (offerId != null) {
            API.submitEditedEntryProductInOffer(projectId, offerId, entry.id, productToEdit.article_id, productToEdit, onError, updateData);
        } else if (contractId != null) {
            API.submitEditedEntryProductInContract(projectId, contractId, entry.id, productToEdit.article_id, productToEdit, onError, updateData);
        }

    }

    const closeEditProductDialog = () => {
        setProductToEdit(null)
    }

    const classes = useStyles();

    const body = entryProducts && entry ?
        <ArticleTable
            projectId={projectId}
            entryId={entry.id}
            products={entryProducts}
            discount={entry.discount}
            onError={onError}
            confirmDeleteProduct={confirmDeleteProduct}
            editProduct={editProduct}
            projectId={projectId}
            offerId={offerId}
            entryId={entryData.id}
            deactivateFunctions={deactivateFunctions}
        />
        : <Loading text={"Lade Einträge..."} />

    const buttons = deactivateFunctions ?
        null :
        <>
            <Tooltip title={"Segmentdetails bearbeiten"} disableFocusListener >
                <IconButton onClick={editEntry} className={classes.tertiaryHeadingButton} disabled={functionsDisabled}>
                    <FontAwesomeIcon icon={faPen} />
                </IconButton>
            </Tooltip>
            <Tooltip title={"Segment löschen"} disableFocusListener >
                <IconButton onClick={deleteEntry} className={classes.tertiaryHeadingButton} disabled={functionsDisabled}>
                    <FontAwesomeIcon icon={faTrash} />
                </IconButton>
            </Tooltip>
            <Tooltip title={"Neuen Artikel hinzufügen"} disableFocusListener >
                <IconButton onClick={addArticle} className={classes.tertiaryHeadingButton} disabled={functionsDisabled}>
                    <FontAwesomeIcon icon={faTools} />
                    <FontAwesomeIcon icon={faPlus} />
                </IconButton>
            </Tooltip>
        </>;

    const content = entry ?
        <ExpansionPanel key={entry.name + "-entries-list"}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
            >
                <Typography className={classes.heading}>{entry.title}</Typography>
                <Typography className={classes.secondaryHeading}>{"Rabatt: ".concat(entry.discount ? Number(entry.discount).toFixed(2) : "0.00").concat("%")}</Typography>
                {buttons}

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
            <SelectProductDialog
                show={addArticleDialog}
                products={products}
                onCancel={() => setAddArticleDialogShowState(false)}
                onSubmit={addNewArticle}
            />
            <Alert
                show={productToDelete ? true : false}
                title={"Artikel löschen"}
                text={"Sind Sie sicher, dass Sie diesen Artikel löschen möchten?"}
                onAccept={deleteProductConfirmed}
                onCancel={cancelProductDelete}
            />
            <EditProductDialog
                show={productToEdit ? true : false}
                amount={productToEdit ? productToEdit.amount : null}
                discount={productToEdit ? productToEdit.discount : null}
                description={productToEdit ? productToEdit.description : null}
                onSubmit={submitEditedProduct}
                onCancel={closeEditProductDialog}
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

export default DynamicEntry;