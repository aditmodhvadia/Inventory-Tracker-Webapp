import React from 'react'
import { Button } from '@material-ui/core'

const DeleteInventoryItemButton = ({ onClick }) => {
    return (
        <Button size='small' variant='outlined' color='primary' onClick={onClick}>
            Delete
        </Button>
    )
}

export default DeleteInventoryItemButton
