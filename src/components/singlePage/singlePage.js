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