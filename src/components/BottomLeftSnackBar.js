import React from 'react'
import { Snackbar } from '@material-ui/core'
import { connect, useSelector } from 'react-redux'
import { hideSnackBar } from '../actions/snackBarActions'

const BottomLeftSnackBar = (props) => {

    const { snackBarOpen, snackBarMsg } = useSelector(
        (state) => state.snackBar
    );

    const { hideSnackBar } = props

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        hideSnackBar()
    };


    return (
        <div>
            <Snackbar anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
                message={snackBarMsg}
                open={snackBarOpen}
                onClose={handleClose}
                autoHideDuration={4000}
            />
        </div>
    )
}

export default connect((state) => ({
    snackBar: state.snackBar
}), { hideSnackBar })(BottomLeftSnackBar)
