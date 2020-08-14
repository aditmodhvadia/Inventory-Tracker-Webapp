import React, { Component } from 'react';
import InventoryItems from '../inventoryitems/InventoryItems';
import { Grid, Box, Fab, makeStyles, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link, useHistory } from 'react-router-dom';
import { ADD_ITEM_ROUTE, ADD_BAG_ROUTE, HOME_ROUTE } from '../../routes';
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
  const history = useHistory()

  const toggleDrawerLocal = (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    const { toggleDrawer } = props
    toggleDrawer()
  }

  const handleDrawerItemClick = (event, route) => {
    toggleDrawerLocal(event)
    history.push(route)
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
          {[{ text: 'Add Item', route: ADD_ITEM_ROUTE }, { text: 'Add Bag', route: ADD_BAG_ROUTE }, { text: 'Items', route: HOME_ROUTE }].map(({ text, route }, index) => (
            <ListItem button key={index}>
              <ListItemText primary={text} onClick={e => handleDrawerItemClick(e, route)} />
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
