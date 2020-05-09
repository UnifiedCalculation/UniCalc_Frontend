import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import ProductOverview from "./articleAdministration/ProductOverview";
import UserOverview from "./userAdministration/userOverview";


export default function AdminOptions({setErrorMessage}) {

  const useStyles = makeStyles({
    overlay:{
      top: '50px',
      width: '100%',
      height: "100%",
      bottom: "50px",
      padding: "20px",
      boxSizing: 'border-box'
    },
    button:{
      marginRight: '10px',
      marginBottom: '10px'
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