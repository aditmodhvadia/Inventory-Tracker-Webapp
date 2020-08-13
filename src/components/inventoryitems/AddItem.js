import React, { useState } from 'react';
import {
  TextField,
  Grid,
  Typography,
  Box,
  Button,
  Select,
  MenuItem,
  FormControl,
  makeStyles,
  InputLabel,
} from '@material-ui/core';
import { useFirestoreConnect, useFirestore } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../layouts/LoadingSpinner';
import {
  isItemNameValid,
  isItemDescriptionValid,
  isItemQuantityValid,
} from '../../helpers/utils';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AddItem = () => {
  const classes = useStyles();

  const [itemName, setItemName] = useState('');
  const [itemDesc, setItemDesc] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [bagId, setBagId] = useState('');
  const { auth } = useSelector((state) => state.firebase);
  const firestore = useFirestore();

  const handleChange = (event, setState) => {
    setState(event.target.value);
  };

  useFirestoreConnect([
    {
      collection: `users/${auth.uid}/bags`,
      storeAs: 'bags',
    },
  ]);

  const bags = useSelector((state) => state.firestore.ordered.bags);

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!isItemNameValid(itemName)) {
      console.error('Item Name is invalid');
      return;
    }

    if (!isItemDescriptionValid(itemDesc)) {
      console.error('Item Description is invalid');
      return;
    }

    if (!isItemQuantityValid(itemQuantity)) {
      console.error('Item Quantity is invalid');
      return;
    }

    let newItem = {
      itemName: itemName,
      itemDesc: itemDesc,
      itemQuantity: itemQuantity,
      bagOwnerId: bagId,
    };

    firestore
      .add({ collection: `users/${auth.uid}/inventoryItems` }, newItem)
      .then((docRef) => {
        docRef.update({
          itemId: docRef.id,
        });
      })
      .then(() => history.goBack());
  };

  if (bags) {
    return (
      <React.Fragment>
        <Grid
          container
          spacing={2}
          alignItems='center'
          direction='column'
          justify='center'
          style={{ minWidth: '100v', minHeight: '50vh' }}>
          <Grid item md={6}>
            <Typography variant='h3' color='primary'>
              Add Item
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit}>
            <Grid item>
              <TextField
                variant='outlined'
                margin='normal'
                required
                value={itemName}
                id='itemName'
                label='Item Name'
                name='itemName'
                fullWidth
                onChange={(e) => handleChange(e, setItemName)}
                autoFocus
              />
              <TextField
                variant='outlined'
                margin='normal'
                id='itemDesc'
                value={itemDesc}
                label='Item Description'
                fullWidth
                name='itemDesc'
                type='text'
                onChange={(e) => handleChange(e, setItemDesc)}
              />
              <TextField
                variant='outlined'
                margin='normal'
                required
                id='itemQuantity'
                value={itemQuantity}
                label='Item Quantity'
                fullWidth
                name='itemQuantity'
                type='number'
                onChange={(e) => handleChange(e, setItemQuantity)}
              />
              <FormControl className={classes.formControl}>
                <InputLabel id='bag-item-select'>Select Bag</InputLabel>
                <Select
                  id='bag-item-select'
                  value={bagId}
                  onChange={(e) => handleChange(e, setBagId)}>
                  {bags.map((bag) => (
                    <MenuItem value={bag.bagId}>{bag.bagName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Box mt={8}>
                <Button
                  type='submit'
                  color='primary'
                  variant='contained'
                  fullWidth>
                  Add Item
                </Button>
              </Box>
            </Grid>
          </form>
        </Grid>
      </React.Fragment>
    );
  }

  return <LoadingSpinner />;
};

export default AddItem;
