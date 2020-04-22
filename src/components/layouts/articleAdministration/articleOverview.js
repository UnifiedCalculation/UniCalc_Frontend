import React from 'react';
import AddArticle from "./addArticle";
import ArticleTable from "./articleTable";


export default function ArticleOverview() {

  return (
      <div>
        <AddArticle/>
        <ArticleTable/>
      </div>
  );
}