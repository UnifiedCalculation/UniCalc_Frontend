import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import ProductOverview from "./articleAdministration/ProductOverview";
import UserOverview from "./userAdministration/userOverview";


export default function AdminOptions({setErrorMessage}) {

  const useStyles = makeStyles({
    overlay:{
      top: '50px',
      width: '100%',
      backgroundColor: 'white',
      position: "fixed",
      height: "100%",
      bottom: "50px",
      zIndex: 999,
      padding: "20px",
      boxSizing: 'border-box'
    },
  });

  const classes = useStyles();

  return (
      <div className={classes.overlay}>
        <ProductOverview setErrorMessage={setErrorMessage}/>
        <UserOverview setErrorMessage={setErrorMessage}/>
      </div>
  );
}