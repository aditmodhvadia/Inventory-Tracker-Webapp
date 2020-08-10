import React, { Component } from 'react';
import InventoryItems from '../inventoryitems/InventoryItems';
import { Grid, Box } from '@material-ui/core';
import AddItemButton from '../inventoryitems/AddItemButton';

class Dashboard extends Component {
  render() {
    return (
      <React.Fragment>
        <Box m={2}>
          <Grid container direction='column'>
            <Grid container xs={12} alignItems='flex-end' justify='flex-end'>
              <AddItemButton />
            </Grid>
            <Grid item xs={12}>
              <InventoryItems />
            </Grid>
          </Grid>
        </Box>
      </React.Fragment>
    );
  }
}

export default Dashboard;
