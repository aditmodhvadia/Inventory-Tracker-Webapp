import React from 'react';
import { useFirestoreConnect } from 'react-redux-firebase';
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

const InventoryItems = () => {
  const { auth } = useSelector((state) => state.firebase);
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
      <Grid container column spacing={4} margi>
        {inventoryItems.map((item) => (
          <Grid item xs={12} sm={6} md={4}>
            <Card key={item.itemId}>
              <CardContent>
                <Typography variant='h5' component='h2'>
                  {item.itemName}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size='small'>Details</Button>
                <Button size='small' variant='outlined' color='primary'>
                  Delete
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    );
  }

  return <div>{inventoryItems}</div>;
};

export default InventoryItems;
