import React, {useState} from 'react';
import AddArticle from "./addArticleDialog";
import ArticleTable from "./articleTable";
import Button from "@material-ui/core/Button";
import * as API from "../../connectionHandler/connectionHandler";
import AddArticleDialog from "./addArticleDialog";


const ArticleOverview = ({ setErrorMessage, customers, onCancel, onSubmit, show, ...props }) =>  {

  const [showNewArticleDialog, setNewArticleDialogViewState] = useState(false);
  const [articleData, setArticleData] = useState([]);
  const [articles, setArticles] = useState(null)
  const buttonName = "Neuen Artikel hinzufügen";
  const [products, setProducts] = useState([]);
  const [npks, setNpks] = useState([]);

  const closeNewArticleDialog = () => {
    setNewArticleDialogViewState(false);
    setArticleData([]);
  }

  const getArticles = () => {
    setArticles(API.getArticles(setErrorMessage, setArticles));
  }

  const openNewArticleDialog = () => {
    //API.getCustomers(setErrorMessage, setCustomerData);
    setNewArticleDialogViewState(true);
  }

  const submitNewArticle = (newArticleData) => {
    setNewArticleDialogViewState(false);
    console.log(JSON.stringify(newArticleData));
    API.submitNewArticle(newArticleData, function () { return API.getArticles(setErrorMessage, setArticles); });
  }

  const addNewArticleDialog =
      <AddArticleDialog
          show={showNewArticleDialog}
          articles={articleData}
          onCancel={closeNewArticleDialog}
          onSubmit={submitNewArticle}
          products={products}
          npks={npks}
          setNpks={setNpks}
      />

  return (
      <div>
        {addNewArticleDialog}
        <Button variant="outlined" color="primary" disableElevation onClick={openNewArticleDialog}>{buttonName}</Button>
        <AddArticle setErrorMessage={setErrorMessage} />
        <ArticleTable setErrorMessage={setErrorMessage} setProducts={setProducts} products={products}/>
      </div>
  );
}

export default ArticleOverview;