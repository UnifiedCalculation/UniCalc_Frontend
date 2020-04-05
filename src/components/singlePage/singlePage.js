import React from 'react';
import NewProjectDialog from '../newProjectDialog/newProjectDialog';

const SinglePage = () => {

    const customers = [
        {
            name: 'Albert Einstein',
            customerId: '1237120'
        },
        {
            name: 'Ferdinand Fritz',
            customerId: '1237230'
        },
        {
            name: 'Person X',
            customerId: '1237540'
        }
    ];


    return (
        <>
            <NewProjectDialog customers={customers} show={true} />
            <p>Nothing yet...</p>
        </>
    );
}
export default SinglePage;