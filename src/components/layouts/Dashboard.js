import React, { Component } from 'react';
import InventoryItems from '../inventoryitems/InventoryItems';
import { Grid, Box, Fab, makeStyles } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link } from 'react-router-dom';
import { ADD_ITEM_ROUTE } from '../../routes';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Box m={2}>
        <Grid container direction='column'>
          <Grid item xs={12}>
            <InventoryItems />
          </Grid>
        </Grid>
      </Box>
      <Fab
        variant='extended'
        color='primary'
        to={ADD_ITEM_ROUTE}
        className={classes.fab}
        component={Link}>
        <AddCircleIcon className={classes.extendedIcon} />
        Add Item
      </Fab>
    </React.Fragment>
  );
};

export default Dashboard;
