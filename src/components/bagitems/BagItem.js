import React from 'react';
import {
    Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import DeleteInventoryItemButton from '../DeleteInventoryItemButton';
import { StyledTableRow, StyledTableCell } from './BagItems';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const BagItem = ({ bag, onDeleteClicked }) => {
    return (
        <StyledTableRow key={bag.bagId}>
            <StyledTableCell component='th' scope='row'>
                {bag.bagName}
            </StyledTableCell>
            <StyledTableCell>
                {bag.bagDesc === '' ? 'No description' : bag.bagDesc}
            </StyledTableCell>
            <StyledTableCell align='right'>
                <Button
                    size='small'
                    component={Link}
                    to={`item/${bag.bagId}`}
                    startIcon={<InfoOutlinedIcon />}>
                    Details
        </Button>
                <DeleteInventoryItemButton onClick={onDeleteClicked} />
            </StyledTableCell>
        </StyledTableRow>
    );
};

export default BagItem;
