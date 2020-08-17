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
    isBagDescriptionValid,
    isBagNameValid,
} from '../../helpers/utils';
import { useHistory } from 'react-router-dom';
import { MaterialPicker, SketchPicker } from 'react-color';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

const AddBag = () => {
    const classes = useStyles();

    const [bagName, setBagName] = useState('');
    const [bagDesc, setBagDesc] = useState('');
    const [bagColor, setBagColor] = useState('#d3d3d3');
    const { auth } = useSelector((state) => state.firebase);
    const firestore = useFirestore();

    const handleChange = (event, setState) => {
        setState(event.target.value);
    };

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!isBagNameValid(bagName)) {
            console.error('Bag Name is invalid');
            return;
        }

        if (!isBagDescriptionValid(bagDesc)) {
            console.error('Bag Description is invalid');
            return;
        }

        let newBag = {
            bagName: bagName,
            bagDesc: bagDesc,
            bagColor: bagColor,
        };

        firestore
            .add({ collection: `users/${auth.uid}/bags` }, newBag)
            .then((docRef) => {
                docRef.update({
                    bagId: docRef.id,
                });
            })
            .then(() => history.goBack());
    };

    const onColorChange = (value) => {
        console.log(value);
        setBagColor(value.hex)
    }


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
                        Add Bag
            </Typography>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <Grid item>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            value={bagName}
                            id='bagName'
                            label='Bag Name'
                            name='bagName'
                            fullWidth
                            onChange={(e) => handleChange(e, setBagName)}
                            autoFocus
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            id='bagDesc'
                            value={bagDesc}
                            label='Bag Description'
                            fullWidth
                            name='bagDesc'
                            type='text'
                            onChange={(e) => handleChange(e, setBagDesc)}
                        />
                        <label>
                            <SketchPicker onChangeComplete={onColorChange} color={bagColor} />
                        </label>
                        <Box mt={8}>
                            <Button
                                type='submit'
                                color='primary'
                                variant='contained'
                                fullWidth>
                                Add Bag
                </Button>
                        </Box>
                    </Grid>
                </form>
            </Grid>
        </React.Fragment>
    );

    return <LoadingSpinner />;
};

export default AddBag;
