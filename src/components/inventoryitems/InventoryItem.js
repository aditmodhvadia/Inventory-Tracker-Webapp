import React from 'react'
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core'

const InventoryItem = ({ item, onDeleteClicked }) => {
    return (
        <Card key={item.itemId}>
            <CardContent>
                <Typography variant='h5' component='h2'>
                    {item.itemName}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small'>Details</Button>
                <Button size='small' variant='outlined' color='primary' onClick={(e) => onDeleteClicked(e, item.itemId)}>
                    Delete
                </Button>
            </CardActions>
        </Card>
    )
}

export default InventoryItem
