import React, {useState} from 'react';
import AddArticle from "./addArticle";
import ArticleTable from "./articleTable";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import * as API from "../../connectionHandler/connectionHandler";
import NewProjectDialog from "../../newProjectDialog/newProjectDialog";
import AddArticleDialog from "./addArticle";


export default function ArticleOverview() {

  const [showNewArticleDialog, setNewArticleDialogViewState] = useState(false);
  const [articleData, setArticleData] = useState([]);

  const closeNewArticleDialog = () => {
    setNewArticleDialogViewState(false);
    setArticleData([]);
  }

  const submitNewArticle = (newArticleData) => {
    setNewArticleDialogViewState(false);
    console.log(JSON.stringify(newProjectData));
    API.submitNewArticle(newArticleData, function(){ return API.getUserProjects(setProjects); });
    ;
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
        <Button variant="outlined" color="primary" disableElevation onClick={onClick}>{buttonName}>
          Artikel erstellen
        </Button>
        <AddArticle/>
        <ArticleTable/>
      </div>
  );
}