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

const InventoryItemDetail = props => {
    const firestore = useFirestore()
    const { auth } = useSelector((state) => state.firebase);

    const item = useSelector(state => state.firestore.ordered.item && state.firestore.ordered.item[0])

    const fireStoreRequest = [{
        collection: `users/${auth.uid}/inventoryItems`,
        storeAs: 'item',
        doc: props.match.params.id.toString()
    }]

    if (item) {
        fireStoreRequest.push({
            collection: `users/${auth.uid}/bags`,
            storeAs: 'bag',
            // doc: item.bagOwnerId.toString()
            doc: '11'
        })
    }

    useFirestoreConnect(fireStoreRequest)

    const bag = useSelector(state => state.firestore.ordered.bag && state.firestore.ordered.bag[0])

    const { showSnackBar } = props

    const history = useHistory()
    const onDeleteItemClicked = () => {
        firestore.delete({
            collection: `users/${auth.uid}/inventoryItems`,
            doc: item.itemId.toString()
        }).then(() => {
            showSnackBar('Item Deleted')
            history.goBack()
        })
    }

    if (item && bag) {
        console.log(item);
        return (
            <div>
                <Box m={4}>
                    <Grid container spacing={8} justify="space-between">
                        <Grid item>
                            <BackToHomeButton />
                        </Grid>
                        <Grid item>
                            <EditInventoryItemButton itemId={item.itemId} />
                            <DeleteInventoryItemButton onClick={onDeleteItemClicked} />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Card key={item.itemId} variant="outlined">
                                <CardContent>
                                    <Typography variant='h5' component='h2'>
                                        Name: {item.itemName}
                                    </Typography>
                                    <Typography variant='subtitle1'>
                                        {item.itemDesc === '' ? "No description" : "Description: " + item.itemDesc}
                                    </Typography>
                                    <Typography variant='body1' component='h4'>
                                        Quantity: {item.itemQuantity}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={3}>
                            <Card key={bag.bagId} variant="outlined">
                                <CardContent>
                                    <Typography variant='h5' component='h2'>
                                        Bag Name: {bag.bagName}
                                    </Typography>
                                    <Typography variant='subtitle1'>
                                        {bag.bagDesc === '' ? "No bag description" : "Description: " + bag.bagDesc}
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

export default connect(null, { showSnackBar })(InventoryItemDetail)
