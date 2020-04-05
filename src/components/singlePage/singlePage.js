import React from 'react';
import Alert from '../Alert/alert';
import Navigation from '../layouts/navigation'
import Header from "../layouts/header/header";
import UserOptions from "../layouts/userOptions/userOptions";
import NewOfferDialog from "../newOfferDialog/newOfferDialog";

const SinglePage = () => {

    return (
        <>
          <Header/>
          <p>Nothing yet...</p>
          <NewOfferDialog show={true} />
          <UserOptions/>
          <Navigation />
        </>
    );
}
export default SinglePage;