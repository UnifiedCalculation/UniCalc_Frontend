import React from 'react';
import Alert from '../alert/alert.component';

const SinglePage = () => {



    return (
        <>
            <Alert title={1} text={12} onCancel={() => console.log('okay!')} show={true}/>
            <p>Nothing yet...</p>
        </>
    );
}
export default SinglePage;