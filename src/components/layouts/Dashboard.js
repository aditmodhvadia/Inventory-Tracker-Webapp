import React from 'react';
import InventoryItems from '../inventoryitems/InventoryItems';
import { Grid, Box, Fab, makeStyles, Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { ADD_ITEM_ROUTE, ADD_BAG_ROUTE, HOME_ROUTE, BAG_LIST_ROUTE } from '../../routes';
import { useSelector, connect } from 'react-redux';
import { toggleDrawer } from '../../actions/drawerActions'
import BagItems from '../bagitems/BagItems';

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
  const { pathname } = useLocation()

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
            {pathname === BAG_LIST_ROUTE ? <BagItems /> : <InventoryItems />}
          </Grid>
        </Grid>
      </Box>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawerLocal} className={classes.drawer}>
        <List className={classes.drawer}>
          {[
            { text: 'Add Item', route: ADD_ITEM_ROUTE },
            { text: 'Add Bag', route: ADD_BAG_ROUTE },
            { text: 'Items', route: HOME_ROUTE },
            { text: 'Bags', route: BAG_LIST_ROUTE }].map(({ text, route }, index) => (
              <ListItem button key={index}>
                <ListItemText primary={text} onClick={e => handleDrawerItemClick(e, route)} />
              </ListItem>
            ))}
        </List>
      </Drawer>
      <Fab
        variant='extended'
        color='primary'
        to={pathname === BAG_LIST_ROUTE ? ADD_BAG_ROUTE : ADD_ITEM_ROUTE}
        className={classes.fab}
        component={Link}>
        <AddCircleIcon className={classes.extendedIcon} />
        {pathname === BAG_LIST_ROUTE ? "Add Bag" : "Add Item"}
      </Fab>
    </React.Fragment>
  );
};

export default connect((state) => ({
  drawer: state.drawer
}), { toggleDrawer })(Dashboard);
