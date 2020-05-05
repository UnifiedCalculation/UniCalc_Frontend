import React, { useEffect, useState } from 'react';
import Navigation from '../layouts/navigation'
import Header from "../header/header";
import { makeStyles } from '@material-ui/core/styles';

import DynamicCard from '../dynamicCard/dynamicCard';
import NewProjectDialog from '../newProjectDialog/newProjectDialog';
import ProjectDisplay from '../projectDisplay/projectDisplay';
import Loading from '../loading/loading';
import * as API from '../connectionHandler/connectionHandler';
import ProductOverview from "../layouts/ProductAdministration/ProductOverview";
import SnackbarOverlay from '../snackbar/snackbar';

const useStyles = makeStyles((theme) => ({
  flexCards: {
    display: 'flex',
    flexDirection: 'row',
    padding: '25px',
    margin: 'auto',
    flexWrap: 'wrap',
    alignSelf: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingBottom: '75px',
  },
  mainPage: {
    backgroundColor: 'lightgray',
    height: '100vh',
    overflowY: 'auto',
  },
}));

const SinglePage = () => {

  const classes = useStyles();

  const [errorMessage, setErrorMessage] = useState("");
  const [projects, setProjects] = useState(null);
  const [showAdminOptions, setShowAdminOptions] = useState(false)
  const [projectData, setProjectData] = useState(null);
  const [customerData, setCustomerData] = useState([]);
  const [showNewProjectDialog, setNewProjectDialogViewState] = useState(false);
  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    API.getUserData(setErrorMessage, parseUser);
  }, [])

  useEffect(() => {
    if (roles.includes("Admin") || roles.includes("Verkäufer")) {
      API.getProjects(setErrorMessage, setProjects);
    } else if (roles.includes("Projektleiter")) {
      API.getUserProjects(setErrorMessage, setProjects);
    } else if (roles.includes("Mitarbeiter")) {
    }
  }, [roles]);


  const parseUser = (userData) => {
    setUsername(userData.firstName + ' ' + userData.lastName);
    setRoles(userData.roles);
  }

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
      return API.getProjects(setErrorMessage, setProjects);
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
      hidden={
        Array.isArray(roles) && !(roles.includes("Verkäufer") || roles.includes("Admin"))}
      key={'0-projectCard'}
      projectName={'Neues Projekt'}
      description={'Hier eine neues Projekt erstellen!'}
      buttonName={'Neues Projekt hinzufügen...'}
      onClick={openNewProjectDialog}
    />
  );

  const projectCards = projectData ? null :
    <div className={classes.flexCards}>
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

  const rolesLoaded = roles.length ?
    <>
      {addNewProjectDialog}
      {projectCards}
      {projectDisplay}
    </>
    : <Loading text={"Lade Userdata..."} />;


  return (
    <div className={classes.mainPage}>
      <Header username={username} roles={roles} onError={setErrorMessage} />
      {rolesLoaded}
      <Navigation />
      <div className={classes.content}>
        {snackbar}
      </div>
    </div>
  );
};
export default SinglePage;