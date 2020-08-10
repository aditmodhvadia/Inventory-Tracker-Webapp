import React from 'react'
import { Button, Box } from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const BackToHomeButton = () => {
    const history = useHistory()

    const onBackToHomeClicked = () => {
        history.goBack()
    }
    return <Button startIcon={<ArrowBackIcon />} color="primary" variant="contained" onClick={onBackToHomeClicked}>Back to Home</Button>

}

export default BackToHomeButton