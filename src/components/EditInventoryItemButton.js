import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'

const EditInventoryItemButton = ({ itemId }) => {
    return (
        <Button to={`item/edit/${itemId}`} component={Link}>
            Edit
        </Button >
    )
}

export default EditInventoryItemButton
