import React from 'react'
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase'
import { useSelector, connect } from 'react-redux';
import LoadingSpinner from '../layouts/LoadingSpinner';
import BackToHomeButton from '../BackToHomeButton';
import { Grid, Box, Card, CardContent, Typography } from '@material-ui/core';
import EditInventoryItemButton from '../EditInventoryItemButton';
import DeleteInventoryItemButton from '../DeleteInventoryItemButton';
import { useHistory } from 'react-router-dom';
import { showSnackBar } from '../../actions/snackBarActions';

const BagItemDetail = props => {
    const firestore = useFirestore()
    const { auth } = useSelector((state) => state.firebase);

    useFirestoreConnect([{
        collection: `users/${auth.uid}/bags`,
        storeAs: 'bag',
        doc: props.match.params.id.toString()
    }])

    const bag = useSelector(state => state.firestore.ordered.bag && state.firestore.ordered.bag[0])

    const { showSnackBar } = props

    const history = useHistory()
    const onDeleteItemClicked = () => {
        firestore.delete({
            collection: `users/${auth.uid}/bags`,
            doc: bag.bagId.toString()
        }).then(() => {
            showSnackBar('Bag Deleted')
            history.goBack()
        })
    }

    if (bag) {
        return (
            <div>
                <Box m={4}>
                    <Grid container spacing={8} justify="space-between">
                        <Grid item>
                            <BackToHomeButton />
                        </Grid>
                        <Grid item>
                            <EditInventoryItemButton itemId={bag.bagId} />
                            <DeleteInventoryItemButton onClick={onDeleteItemClicked} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Card key={bag.bagId} variant="outlined">
                                <CardContent>
                                    <Typography variant='h5' component='h2'>
                                        Bag Name: {bag.bagName}
                                    </Typography>
                                    <Typography variant='subtitle1'>
                                        {bag.bagDesc === '' ? "No bag description" : "Description: " + bag.bagDesc}
                                    </Typography>
                                    <Typography variant='subtitle1'>
                                        {bag.bagColor === '' ? "No bag color" : <div style={{ display: 'flex' }}>Color: <div style={{ height: '30px', width: '80px', backgroundColor: bag.bagColor }}></div></div>}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        )
    }

    return (
        <LoadingSpinner />
    )
}

export default connect(null, { showSnackBar })(BagItemDetail)
