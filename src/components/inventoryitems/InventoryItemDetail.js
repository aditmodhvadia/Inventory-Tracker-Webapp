import React from 'react'
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase'
import { useSelector } from 'react-redux';
import LoadingSpinner from '../layouts/LoadingSpinner';
import BackToHomeButton from '../BackToHomeButton';
import { Grid, Box, Card, CardContent, Typography, Button, CardActions } from '@material-ui/core';
import EditInventoryItemButton from '../EditInventoryItemButton';
import DeleteInventoryItemButton from '../DeleteInventoryItemButton';
import { useHistory } from 'react-router-dom';

const InventoryItemDetail = props => {
    const firestore = useFirestore()
    const { auth } = useSelector((state) => state.firebase);

    useFirestoreConnect([
        {
            collection: `users/${auth.uid}/inventoryItems`,
            storeAs: 'item',
            doc: props.match.params.id.toString()
        }
    ])

    const item = useSelector(state => state.firestore.ordered.item && state.firestore.ordered.item[0])

    const history = useHistory()
    const onDeleteItemClicked = () => {
        firestore.delete({
            collection: `users/${auth.uid}/inventoryItems`,
            doc: item.itemId.toString()
        }).then(history.goBack())
    }

    if (item) {
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
                </Box>
            </div>
        )
    }

    return (
        <LoadingSpinner />
    )
}

export default InventoryItemDetail
