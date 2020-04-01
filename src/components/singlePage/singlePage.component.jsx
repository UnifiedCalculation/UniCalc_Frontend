import React, { useState } from 'react';
import Alert from '../alert/alert.component';


import Button from '@material-ui/core/Button';

const SinglePage = () => {


    const [open, setOpen] = useState(false);
    
    const [text, setText] = useState("Accept this request?");


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {        
        setOpen(false);
    };

    const handleCancel = () => {
        handleClose();
        setTimeout(function() {
            setText("Accept this request?");
        }, 300);
        
    }

    const handleAccept = () => {
        handleClose();
        setTimeout(function() {
            setText("You accepted the previous request!");
        }, 300);
    }


    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Open alert dialog
                </Button>
            <Alert title={"Title"} text={text} acceptText={"Accept this request"}
                cancelText={"Cancel this alert!"} show={open} onCancel={handleCancel} onAccept={handleAccept} />
        </>
    );
}
export default SinglePage;