import React from 'react';
import { useFirestoreConnect, useFirebase, useFirestore } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Box,
} from '@material-ui/core';
import InventoryItem from './InventoryItem';

const InventoryItems = () => {
  const firestore = useFirestore()
  const { auth } = useSelector((state) => state.firebase);

  const onDeleteClicked = (e, itemId) => {
    firestore.delete({ collection: `users/${auth.uid}/inventoryItems`, doc: itemId.toString() })
      .then(console.log("Item deleted"))
  }
  useFirestoreConnect([
    {
      collection: `users/${auth.uid}/inventoryItems`,
      storeAs: 'inventoryItems',
    },
  ]);

  const inventoryItems = useSelector(
    (state) => state.firestore.ordered.inventoryItems
  );

  if (inventoryItems && inventoryItems.length === 0) {
    return (
      <React.Fragment>
        <Box mt={2}>
          <Typography variant='h5' component='h3' align='center'>
            No items added
          </Typography>
        </Box>
      </React.Fragment>
    );
  }

  if (inventoryItems && inventoryItems.length > 0) {
    return (
      <Grid container spacing={4}>
        {inventoryItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.itemId}>
            <InventoryItem item={item} onDeleteClicked={onDeleteClicked} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return <div>{inventoryItems}</div>;
};

export default InventoryItems;
