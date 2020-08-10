import React, { Component } from 'react'
import { firebaseConnect, firestoreConnect, useFirestoreConnect } from 'react-redux-firebase'
import { connect, useSelector } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types';
import { ListItemSecondaryAction, Card, CardContent, Typography, CardActions, Button, makeStyles, Grid } from '@material-ui/core';

const InventoryItems = () => {
    const { auth } = useSelector(state => state.firebase)
    useFirestoreConnect([{
        collection: `users/${auth.uid}/inventoryItems`,
        storeAs: 'inventoryItems'
    }])



    const inventoryItems = useSelector(state => state.firestore.ordered.inventoryItems)

    if (inventoryItems && inventoryItems.length > 0) {
        return (
            <Grid container column spacing={4} margi>
                {inventoryItems.map(item => (
                    <Grid item xs={12} sm={6} md={4}>
                        <Card key={item.itemId}>
                            <CardContent>
                                <Typography variant="h5" component="h2">{item.itemName}</Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">Details</Button>
                                <Button size="small" variant="outlined" color="primary">Delete</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        )
    }

    return (
        <div>{inventoryItems}</div>
    )
}

export default InventoryItems