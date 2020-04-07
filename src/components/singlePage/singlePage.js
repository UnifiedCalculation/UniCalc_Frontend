import React from 'react';
import Navigation from '../layouts/navigation'
import Header from "../layouts/header/header";
import UserOptions from "../layouts/userOptions/userOptions";
import {makeStyles} from "@material-ui/core/styles";
import './singlePage.css'

const useStyles = makeStyles({
    }
);

const SinglePage = () => {

  const classes = useStyles();

  let addProjectCard = [];
  addProjectCard.push(
    <ProjectCard
      projectName={'Neues Projekt'}
      buttonName={'Neues Projekt hinzufügen...'}
      onClick={openNewProjectDialog}
    />
  );

  const projectCards =
    addProjectCard.concat(
      projectData.map((entry, index) =>
        <ProjectCard
          key={index + "-projectCard"}
          onClick={() => openProject(entry.project_id)}
          projectName={entry.project_name}
          description={entry.description} />
      )
    );

  return (
      <>
        <div className={"content"}>
          <Header/>
          <p>Nothing yet...</p>
          <UserOptions/>
        </div>
        <Navigation />
      </>
  );
};
export default SinglePage;