import React, { useEffect, useState } from 'react';
import Navigation from '../layouts/navigation'
import Header from "../layouts/header/header";
import { makeStyles } from "@material-ui/core/styles";
import './singlePage.css'

import ProjectCard from '../projectCard/projectCard';
import NewProjectDialog from '../newProjectDialog/newProjectDialog';
import ProjectDisplay from '../projectDisplay/projectDisplay';
import * as API from '../connectionHandler/connectionHandler';

const useStyles = makeStyles({
}
);

const SinglePage = () => {

  const [projects, setProjects] = useState([]);
  const [showProject, setShowProjectViewState] = useState(false);
  const [projectData, setProjectData] = useState(null);
  const [customerData, setCustomerData] = useState([]);
  const [showNewProjectDialog, setNewProjectDialogViewState] = useState(false);

  useEffect(() => {
    API.getUserProjects(setProjects);
  }, []);

  const openProject = (projectId) => {
    API.getProjectData(projectId, openProjetDetailsWithData);
  };

  const openProjetDetailsWithData = (projectData) => {
    setProjectData(projectData);
    setShowProjectViewState(true);
  };

  const openNewProjectDialog = () => {
    API.getCustomers(setCustomerData);
    setNewProjectDialogViewState(true);
  }

  const closeNewProjectDialog = () => {
    setNewProjectDialogViewState(false);
    setCustomerData([]);
  }

  const submitNewProject = (newProjectData) => {
    setNewProjectDialogViewState(false);
    console.log(JSON.stringify(newProjectData));
    API.submitNewProject(newProjectData, API.getUserProjects(setProjects));
    ;
  }

  const addNewProjectDialog =
    <NewProjectDialog
      show={showNewProjectDialog}
      customers={customerData}
      onCancel={closeNewProjectDialog}
      onSubmit={submitNewProject}
    />


  const classes = useStyles();

  let addProjectCard = [];
  addProjectCard.push(
    <ProjectCard
      projectName={'Neues Projekt'}
      buttonName={'Neues Projekt hinzufügen...'}
      onClick={openNewProjectDialog}
    />
  );

  const projectCards = showProject ?
    null :
    addProjectCard.concat(
      projects.map((entry, index) =>
        <ProjectCard
          key={index + "-projectCard"}
          onClick={() => openProject(entry.project_id)}
          projectName={entry.project_name}
          description={entry.description} />
      )
    );

  return (
    <>
      <Header />
      {addNewProjectDialog}
      <div class="flexCards">
        {projectCards}
      </div>
      <ProjectDisplay show={showProject} />
      <Navigation />
    </>
  );
};
export default SinglePage;