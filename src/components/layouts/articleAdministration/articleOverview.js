import React, {useState} from 'react';
import AddArticle from "./addArticle";
import ArticleTable from "./articleTable";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import * as API from "../../connectionHandler/connectionHandler";
import NewProjectDialog from "../../newProjectDialog/newProjectDialog";
import AddArticleDialog from "./addArticle";


const ArticleOverview = ({ setErrorMessage, customers, onCancel, onSubmit, show, ...props }) =>  {

  const [showNewArticleDialog, setNewArticleDialogViewState] = useState(false);
  const [articleData, setArticleData] = useState([]);
  const [articles, setArticles] = useState(null)
  const buttonName = "Neuen Artikel hinzufügen";

  const closeNewArticleDialog = () => {
    setNewArticleDialogViewState(false);
    setArticleData([]);
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
      />

  return (
      <div>
        {addNewArticleDialog}
        <Button variant="outlined" color="primary" disableElevation onClick={openNewArticleDialog}>{buttonName}</Button>
        <AddArticle/>
        <ArticleTable/>
      </div>
  );
}

export default ArticleOverview;