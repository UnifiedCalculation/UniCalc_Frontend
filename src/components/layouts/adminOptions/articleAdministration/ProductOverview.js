import React, {useEffect, useState} from 'react';
import ProductTable from "./productTable";
import Button from "@material-ui/core/Button";
import * as API from "../../../connectionHandler/connectionHandler";
import AddProductDialog from "./addProductDialog";
import AddNpkProductDialog from "./addNpkProductDialog";
import {makeStyles} from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';


const ProductOverview = ({ setErrorMessage, onCancel, onSubmit, show, ...props }) =>  {

  const [showNewProductDialog, setNewProductDialogViewState] = useState(false);
  const [showNewNpProductDialog, setNewNpkProductDialogViewState] = useState(false);
  const [productData, setProductData] = useState([]);
  const buttonName = "Artikel";
  const buttonNpkName = "NPK Artikel";
  const [products, setProducts] = useState([]);
  const [npks, setNpks] = useState([]);

  const useStyles = makeStyles({
    button:{
      marginRight: '10px',
      marginBottom: '10px',
    },
    icon: {
      marginRight: '10px'
    }
  });

  const classes = useStyles();

  const closeNewProductDialog = () => {
    setNewProductDialogViewState(false);
    setProductData([]);
  }

  const closeNewNpkProductDialog = () => {
    setNewNpkProductDialogViewState(false);
    setProductData([]);
  }

  const getProducts = () => {
    API.getProducts(setErrorMessage, setProducts);
  }

  const loadNewProducts = () => {
    closeNewProductDialog();
    closeNewNpkProductDialog();
    getProducts();
  }

  const openNewProductDialog = () => {
    setNewProductDialogViewState(true);
  }

  const openNewNpkProductDialog = () => {
    setNewNpkProductDialogViewState(true);
  }

  const addNewProductDialog =
      <AddProductDialog
          show={showNewProductDialog}
          articles={productData}
          onCancel={closeNewProductDialog}
          onSubmit={loadNewProducts}
          products={products}
          npks={npks}
          setNpks={setNpks}
      />

  const addNewNpkProductDialog =
      <AddNpkProductDialog
          show={showNewNpProductDialog}
          articles={productData}
          onCancel={closeNewNpkProductDialog}
          onSubmit={loadNewProducts}
          products={products}
          npks={npks}
          setNpks={setNpks}
      />

  return (
      <div >
        {addNewProductDialog}
        {addNewNpkProductDialog}

        <Button className={classes.button} variant="outlined" color="primary" disableElevation onClick={openNewProductDialog}><AddIcon className={classes.icon}/>{buttonName}</Button>
        <Button className={classes.button} variant="outlined" color="primary" disableElevation onClick={openNewNpkProductDialog}><AddIcon className={classes.icon}/>{buttonNpkName}</Button>
        <ProductTable npks={npks} setErrorMessage={setErrorMessage} setProducts={setProducts} products={products}/>
      </div>
  );
}

export default ProductOverview;