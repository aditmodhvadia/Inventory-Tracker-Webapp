import React from 'react'
import { Typography } from '@material-ui/core'

export default function ErrorPage() {
    return (
        <React.Fragment>
            <Typography color="danger" varaint="h5">Error 404: page does not exist</Typography>
        </React.Fragment>
    )
}
