import React from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { ADD_ITEM_ROUTE } from '../../routes';

const AddItemButton = () => {
  return (
    <Button
      startIcon={<AddCircleIcon />}
      variant='contained'
      color='primary'
      component={Link}
      to={ADD_ITEM_ROUTE}>
      Add Item
    </Button>
  );
};

export default AddItemButton;
