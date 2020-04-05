import React from 'react';
import Alert from '../Alert/alert';
import Navigation from '../layouts/navigation'



const SinglePage = () => {



    return (
        <>
            <Alert
                title={'title'}
                text={'text'}
                onCancel={() => console.log('cancel!')}
                onAccept={() => console.log('accept!')}
                show={true}
            />
            <p>Nothing yet...</p>
          <Navigation />
        </>
    );
}
export default SinglePage;