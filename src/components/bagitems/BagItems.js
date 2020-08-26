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
import { showSnackBar } from '../../actions/snackBarActions'
import BagItem from './BagItem';

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

const BagItems = props => {
    const classes = useStyles();
    const firestore = useFirestore();
    const { auth } = useSelector((state) => state.firebase);
    const { showSnackBar } = props

    const onDeleteClicked = (e, itemId) => {
        firestore
            .delete({
                collection: `users/${auth.uid}/bags`,
                doc: itemId.toString(),
            })
            .then(() => {
                showSnackBar('Bag Deleted')
            });
    };
    useFirestoreConnect([
        {
            collection: `users/${auth.uid}/bags`,
            storeAs: 'bagItems',
        },
    ]);

    const bagItems = useSelector(
        (state) => state.firestore.ordered.bagItems
    );

    if (bagItems && bagItems.length === 0) {
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

    if (bagItems && bagItems.length > 0) {
        return (
            <Box mt={2}>
                <TableContainer component={Paper} mt={1}>
                    <Table className={classes.table} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Bag Name</StyledTableCell>
                                <StyledTableCell>Description</StyledTableCell>
                                <StyledTableCell align='right'>Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bagItems.map((bag) => (
                                <BagItem
                                    bag={bag}
                                    key={bag.bagId}
                                    onDeleteClicked={(e) => onDeleteClicked(e, bag.bagId)}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        );
    }

    return <div>{bagItems}</div>;
};

export default connect(null, { showSnackBar })(BagItems);
