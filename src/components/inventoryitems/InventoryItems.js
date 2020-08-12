import React from 'react';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import {
  Typography,
  Box,
  TableContainer,
  Paper,
  makeStyles,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Button,
  withStyles,
} from '@material-ui/core';
import InventoryItem from './InventoryItem';
import { Link } from 'react-router-dom';
import DeleteInventoryItemButton from '../DeleteInventoryItemButton';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


const InventoryItems = () => {
  const classes = useStyles()
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
      <Box mt={2}>
        <TableContainer component={Paper} mt={1}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Item Name</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryItems.map((item) => (
                <InventoryItem item={item} onDeleteClicked={(e) => onDeleteClicked(e, item.itemId)} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  return <div>{inventoryItems}</div>;
};

export default InventoryItems;
