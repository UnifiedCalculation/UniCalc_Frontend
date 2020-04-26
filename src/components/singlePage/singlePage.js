import React, { useEffect, useState } from 'react';
import Navigation from '../layouts/navigation'
import Header from "../layouts/header/header";
import './singlePage.css'

import ProjectCard from '../projectCard/projectCard';
import NewProjectDialog from '../newProjectDialog/newProjectDialog';
import ProjectDisplay from '../projectDisplay/projectDisplay';
import Loading from '../loading/loading';
import * as API from '../connectionHandler/connectionHandler';
import UserOverview from "../layouts/userAdministration/userOverview";



import SnackbarOverlay from '../snackbar/snackbar';

const SinglePage = () => {

  const [errorMessage, setErrorMessage] = useState("");
  const [projects, setProjects] = useState(null);

  const [projectData, setProjectData] = useState(null);
  const [customerData, setCustomerData] = useState([]);
  const [showNewProjectDialog, setNewProjectDialogViewState] = useState(false);

  useEffect(() => {
    API.getUserProjects(setErrorMessage, setProjects);
  }, []);

  const emptyErrorMessage = () => {
    setErrorMessage("");
  }

  const openNewProjectDialog = () => {
    API.getCustomers(setErrorMessage, setCustomerData);
    setNewProjectDialogViewState(true);
  }

  const closeNewProjectDialog = () => {
    setNewProjectDialogViewState(false);
    setCustomerData([]);
  }

  const submitNewProject = (newProjectData) => {
    setNewProjectDialogViewState(false);
    API.submitNewProject(newProjectData, setErrorMessage, function () { return API.getUserProjects(setErrorMessage, setProjects); });
  }

  const addNewProjectDialog =
    <NewProjectDialog
      show={showNewProjectDialog}
      customers={customerData}
      onCancel={closeNewProjectDialog}
      onSubmit={submitNewProject}
    />

  let addProjectCard = [];
  addProjectCard.push(
    <ProjectCard
      key={'0-projectCard'}
      projectName={'Neues Projekt'}
      description={'Hier eine neues Projekt erstellen!'}
      buttonName={'Neues Projekt hinzufügen...'}
      onClick={openNewProjectDialog}
    />
  );

  const projectCards = projectData ?
    null :
    <div className="flexCards">
      {addProjectCard.concat(projects ?
        projects.map((entry, index) =>
          <ProjectCard
            key={(index + 1) + "-projectCard"}
            onClick={() => setProjectData(entry)}
            projectName={entry.name}
            description={entry.description} />
        )
        : <Loading key={"home-loading-key"} text={"Lade projekte..."} />
      )}
    </div>;

  const projectDisplay = projectData ?
    <ProjectDisplay projectData={projectData} onError={setErrorMessage} onClose={() => setProjectData(null)} />
    : null;

  const snackbar =
    <SnackbarOverlay
      show={errorMessage !== ""}
      text={errorMessage}
      severity="error"
      onClose={emptyErrorMessage}
    />


  return (
    <div className="mainPage">
      <Header />
      {addNewProjectDialog}
      {projectCards}
      {projectDisplay}
      <Navigation />
      <div className="content">
        {snackbar}
      </div>
    </div>
  );
};
export default SinglePage;