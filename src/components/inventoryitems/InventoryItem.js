import React from 'react';
import {
  Button,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import DeleteInventoryItemButton from '../DeleteInventoryItemButton';
import { StyledTableRow, StyledTableCell } from './InventoryItems';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const InventoryItem = ({ item, onDeleteClicked }) => {
  return (
    <StyledTableRow key={item.itemId}>
      <StyledTableCell component='th' scope='row'>
        {item.itemName}
      </StyledTableCell>
      <StyledTableCell>
        {item.itemDesc === '' ? 'No description' : item.itemDesc}
      </StyledTableCell>
      <StyledTableCell align='right'>
        <Button
          size='small'
          component={Link}
          to={`item/${item.itemId}`}
          startIcon={<InfoOutlinedIcon />}>
          Details
        </Button>
        <DeleteInventoryItemButton onClick={onDeleteClicked} />
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default InventoryItem;
