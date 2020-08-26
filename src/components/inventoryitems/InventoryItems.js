import React from 'react';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import { useSelector, connect } from 'react-redux';
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
  withStyles,
} from '@material-ui/core';
import InventoryItem from './InventoryItem';
import { showSnackBar } from '../../actions/snackBarActions'

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    marginBottom: theme.spacing(10),
  },
}));

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

const InventoryItems = props => {
  const classes = useStyles();
  const firestore = useFirestore();
  const { auth } = useSelector((state) => state.firebase);
  const { showSnackBar } = props

  const onDeleteClicked = (e, itemId) => {
    firestore
      .delete({
        collection: `users/${auth.uid}/inventoryItems`,
        doc: itemId.toString(),
      })
      .then(() => {
        showSnackBar('Item Deleted')
      });
  };
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
          <Table className={classes.table} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <StyledTableCell>Item Name</StyledTableCell>
                <StyledTableCell>Description</StyledTableCell>
                <StyledTableCell align='right'>Actions</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {inventoryItems.map((item) => (
                <InventoryItem
                  item={item}
                  key={item.itemId}
                  onDeleteClicked={(e) => onDeleteClicked(e, item.itemId)}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
  }

  return <div>{inventoryItems}</div>;
};

export default connect(null, { showSnackBar })(InventoryItems);
