import React, {useEffect, useState} from 'react';
import ProductTable from "./productTable";
import Button from "@material-ui/core/Button";
import * as API from "../../connectionHandler/connectionHandler";
import AddProductDialog from "./addProductDialog";
import AddNpkProductDialog from "./addNpkProductDialog";
import {makeStyles} from "@material-ui/core/styles";
import {getNpks} from "../../connectionHandler/connectionHandler";


const ProductOverview = ({ setErrorMessage, customers, onCancel, onSubmit, show, ...props }) =>  {

  const [showNewProductDialog, setNewProductDialogViewState] = useState(false);
  const [showNewNpProductDialog, setNewNpkProductDialogViewState] = useState(false);
  const [productData, setProductData] = useState([]);
  const buttonName = "Neuen Artikel hinzufügen";
  const buttonNpkName = "Neuen NPK Artikel hinzufügen";
  const [products, setProducts] = useState([]);
  const [npks, setNpks] = useState([]);

  const useStyles = makeStyles({
    overlay:{
      top: '50px',
      width: '100%',
      backgroundColor: 'white',
      position: "fixed",
      height: "100%",
      bottom: "50px",
      zIndex: 999,
      padding: "20px",
      boxSizing: 'border-box'
    },
    button:{
      marginRight: '10px',
      marginBottom: '10px'
    }
  });

  useEffect(() => {
    getNpks(setErrorMessage, setNpks)
    getProducts(setErrorMessage, setProducts)
  }, []);

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
      <div className={classes.overlay}>
        {addNewProductDialog}
        {addNewNpkProductDialog}

        <Button className={classes.button} variant="outlined" color="primary" disableElevation onClick={openNewProductDialog}>{buttonName}</Button>
        <Button className={classes.button} variant="outlined" color="primary" disableElevation onClick={openNewNpkProductDialog}>{buttonNpkName}</Button>
        <ProductTable npks={npks} setErrorMessage={setErrorMessage} setProducts={setProducts} products={products}/>
      </div>
  );
}

export default ProductOverview;