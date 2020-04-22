import React, { useEffect, useState } from 'react';
import Navigation from '../layouts/navigation'
import Header from "../layouts/header/header";
import './singlePage.css'

import ProjectCard from '../projectCard/projectCard';
import NewProjectDialog from '../newProjectDialog/newProjectDialog';
import ProjectDisplay from '../projectDisplay/projectDisplay';
import OfferDisplay from '../offerDisplay/offerDisplay';
import * as API from '../connectionHandler/connectionHandler';
import UserOverview from "../layouts/userAdministration/userOverview";



const SinglePage = () => {

  const [projects, setProjects] = useState([]);
  const [showProject, setShowProjectViewState] = useState(false);
  const [offerData, setOfferData] = useState(null);
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

    API.submitNewProject(newProjectData, function(){ return API.getUserProjects(setProjects); });

    ;
  }

  const onShowOffer = (offerId) => {
    API.getOfferData(projectData.id, offerId, setOfferData);

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

  const projectCards = showProject ?
    null :
    addProjectCard.concat(
      projects.map((entry, index) =>
        <ProjectCard
          key={(index + 1) + "-projectCard"}
          onClick={() => openProject(entry.id)}
          projectName={entry.name}
          description={entry.description} />
      )
    );

  const projectDisplay = projectData && !offerData ?
    <ProjectDisplay projectData={projectData} onShowOffer={onShowOffer} />
    : null;

  const offerDisplay = offerData ? 
  <OfferDisplay offer={offerData} projectId={projectData.id} onClose={() => setOfferData(null)} />
  : null;


  return (
    <div class="mainPage">
      <Header />
      {addNewProjectDialog}
        <div className="flexCards">
          {projectCards}
        </div>
        {projectDisplay}
        {offerDisplay}
        <UserOverview/>
      <Navigation />
    </div>
  );
};
export default SinglePage;