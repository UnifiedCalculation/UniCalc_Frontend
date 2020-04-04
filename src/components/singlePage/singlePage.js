import React from 'react';
import Alert from '../alert/alert';

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
        </>
    );
}
export default SinglePage;