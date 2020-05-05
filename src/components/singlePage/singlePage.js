import React, { useEffect, useState } from 'react';
import Navigation from '../layouts/navigation'
import Header from "../header/header";
import './singlePage.css'

import DynamicCard from '../dynamicCard/dynamicCard';
import NewProjectDialog from '../newProjectDialog/newProjectDialog';
import ProjectDisplay from '../projectDisplay/projectDisplay';
import Loading from '../loading/loading';
import * as API from '../connectionHandler/connectionHandler';
import ProductOverview from "../layouts/ProductAdministration/ProductOverview";
import SnackbarOverlay from '../snackbar/snackbar';

const SinglePage = () => {

  const [errorMessage, setErrorMessage] = useState("");
  const [projects, setProjects] = useState(null);
  const [showAdminOptions, setShowAdminOptions] = useState(false)
  const [projectData, setProjectData] = useState(null);
  const [customerData, setCustomerData] = useState([]);
  const [showNewProjectDialog, setNewProjectDialogViewState] = useState(false);

  useEffect(() => {
    API.getUserProjects(setErrorMessage, setProjects);
  }, []);

  const triggerAdminOptions = () => {
    setShowAdminOptions(!showAdminOptions);
  }

  const adminOptionsDisplay = showAdminOptions ?
    <ProductOverview setErrorMessage={setErrorMessage} />
    : null;

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
    API.submitNewProject(newProjectData, setErrorMessage, function () {
      return API.getUserProjects(setErrorMessage, setProjects);
    });
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
    <DynamicCard
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
          <DynamicCard
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
      <Header onError={setErrorMessage} />
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