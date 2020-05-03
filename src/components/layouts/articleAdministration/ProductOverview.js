import React, {useEffect, useState} from 'react';
import ProductTable from "./productTable";
import Button from "@material-ui/core/Button";
import * as API from "../../connectionHandler/connectionHandler";
import AddProductDialog from "./addProductDialog";
import {getProducts} from "../../connectionHandler/connectionHandler";
import AddNpkProductDialog from "./addNpkProductDialog";


const ArticleOverview = ({ setErrorMessage, customers, onCancel, onSubmit, show, ...props }) =>  {

  const [showNewArticleDialog, setNewProductDialogViewState] = useState(false);
  const [showNewNpkArticleDialog, setNewNpkProductDialogViewState] = useState(false);
  const [productData, setProductData] = useState([]);
  const buttonName = "Neuen Artikel hinzufügen";
  const buttonNpkName = "Neuen NPK Artikel hinzufügen";
  const [products, setProducts] = useState([]);
  const [npks, setNpks] = useState([]);

  const closeNewProductDialog = () => {
    setNewProductDialogViewState(false);
    setProductData([]);
  }

  const getProducts = () => {
    API.getProducts(setErrorMessage, setProducts);
  }

  const loadNewProducts = () => {
    closeNewProductDialog();
    getProducts();
  }

  const openNewProductDialog = () => {
    setNewProductDialogViewState(true);
  }

  const openNewNpkProductDialog = () => {
    setNewProductDialogViewState(true);
  }

  const submitNewArticle = (newArticleData) => {
    setNewProductDialogViewState(false);
    console.log(JSON.stringify(newArticleData));
    API.submitNewProduct(newArticleData, setErrorMessage, getProducts);
  }

  const addNewProductDialog =
      <AddNpkProductDialog
          show={showNewArticleDialog}
          articles={productData}
          onCancel={closeNewProductDialog}
          onSubmit={loadNewProducts}
          products={products}
          npks={npks}
          setNpks={setNpks}
      />

  const addNewNpkProductDialog =
      <AddNpkProductDialog
          show={showNewArticleDialog}
          articles={productData}
          onCancel={closeNewProductDialog}
          onSubmit={loadNewProducts}
          products={products}
          npks={npks}
          setNpks={setNpks}
      />

  return (
      <div>
        {addNewProductDialog}
        <Button variant="outlined" color="primary" disableElevation onClick={openNewProductDialog}>{buttonName}</Button>
        <Button variant="outlined" color="primary" disableElevation onClick={openNewNpkProductDialog}>{buttonNpkName}</Button>
        <ProductTable npks={npks} setErrorMessage={setErrorMessage} setProducts={setProducts} products={products}/>
      </div>
  );
}

export default ArticleOverview;