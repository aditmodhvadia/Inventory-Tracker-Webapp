import React from 'react'
import { Card, CardContent, Typography, CardActions, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import DeleteInventoryItemButton from '../DeleteInventoryItemButton'

const InventoryItem = ({ item, onDeleteClicked }) => {
    return (
        <Card key={item.itemId}>
            <CardContent>
                <Typography variant='h5' component='h2'>
                    {item.itemName}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small' component={Link} to={`item/${item.itemId}`}>Details</Button>
                <DeleteInventoryItemButton onClick={onDeleteClicked} />
            </CardActions>
        </Card>
    )
}

export default InventoryItem
