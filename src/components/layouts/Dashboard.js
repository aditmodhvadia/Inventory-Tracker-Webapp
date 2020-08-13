import React, { Component } from 'react';
import InventoryItems from '../inventoryitems/InventoryItems';
import { Grid, Box, Fab, makeStyles, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link } from 'react-router-dom';
import { ADD_ITEM_ROUTE } from '../../routes';
import { useState } from 'react';
import LoadingSpinner from '../layouts/LoadingSpinner'
import { useSelector, connect } from 'react-redux';
import { toggleDrawer } from '../../actions/drawerActions'

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
  drawer: {
    width: 240
  }
}));

const Dashboard = (props) => {
  const classes = useStyles();
  const { drawerOpen } = useSelector(state => state.drawer)

  const toggleDrawerLocal = event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    const { toggleDrawer } = props
    toggleDrawer()
  }

  return (
    <React.Fragment>
      <Box m={2}>
        <Grid container direction='column'>
          <Grid item xs={12}>
            <InventoryItems />
          </Grid>
        </Grid>
      </Box>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawerLocal} className={classes.drawer}>
        <List className={classes.drawer}>
          {['Add Item', 'Add Bag', 'Items'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} onClick={toggleDrawerLocal} />
            </ListItem>
          ))}
        </List>
      </Drawer>
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

export default connect((state, props) => ({
  drawer: state.drawer
}), { toggleDrawer })(Dashboard);
