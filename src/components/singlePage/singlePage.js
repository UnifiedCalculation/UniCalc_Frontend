import React, { useEffect, useState, createContext } from 'react';
import Header from "../header/header";
import { makeStyles } from '@material-ui/core/styles';

import DynamicCard from '../dynamicCard/dynamicCard';
import NewProjectDialog from '../newProjectDialog/newProjectDialog';
import ProjectDisplay from '../projectDisplay/projectDisplay';
import Loading from '../loading/loading';
import * as API from '../connectionHandler/connectionHandler';
import ProductOverview from "../layouts/ProductAdministration/ProductOverview";
import SnackbarOverlay from '../snackbar/snackbar';

export const UserContext = createContext();

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
  const [contracts, setContracts] = useState(null);
  const [showAdminOptions, setShowAdminOptions] = useState(false)
  const [projectData, setProjectData] = useState(null);
  const [customerData, setCustomerData] = useState([]);
  const [showNewProjectDialog, setNewProjectDialogViewState] = useState(false);


  const [user, setUser] = useState(null);


  useEffect(() => {
    API.getUserData(setErrorMessage, setUser);
  }, [])

  useEffect(() => {
    if (user) {
      switch(true) {
        case user.roles.includes("Admin"):
          API.getContracts(setErrorMessage, setContracts);
        case user.roles.includes("Verkäufer"):
          API.getProjects(setErrorMessage, setProjects);
          break;
        case user.roles.includes("Projektleiter"):
          API.getUserProjects(setErrorMessage, setProjects);
          break;
        case user.roles.includes("Mitarbeiter"):
          API.getUserContracts(setErrorMessage, setContracts);
        default:
          setErrorMessage("User hat keine Rollen. Kontaktiere deinen Administrator!");
      }
    }
  }, [user]);

  const toggleAdmingOptions = () => {
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
        user && !(user.roles.includes("Verkäufer") || user.roles.includes("Admin"))}
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

  const rolesLoaded = user && user.roles.length ?
    <>
      {addNewProjectDialog}
      {projectCards}
      {projectDisplay}
    </>
    : <Loading text={"Lade Userdata..."} />;


  return (
    <div className={classes.mainPage}>
      <UserContext.Provider value={user}>
        <Header onError={setErrorMessage} onSettingsClick={toggleAdmingOptions}/>
        {adminOptionsDisplay}
        {rolesLoaded}
        <div className={classes.content}>
          {snackbar}
        </div>
      </UserContext.Provider>
    </div>
  );
};
export default SinglePage;