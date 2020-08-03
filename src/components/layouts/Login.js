import React, { Component } from 'react'
import { Grid, Button, Typography, TextField, Box } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock';
import { firebaseConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'


class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { email, password } = this.state

        const { firebase, history } = this.props

        firebase.login({
            email: email,
            password: password
        }).catch(e => {
            // TODO: Notify user of the error
        }).then(() => {
            history.push('/home')
        }).then(() => {
            this.setState({
                email: '',
                password: ''
            })
        })
    }


    render() {
        const { email, password } = this.state
        return (
            <div>
                <Grid container
                    spacing={2}
                    alignItems="center"
                    direction="column"
                    justify="center"
                    style={{ minWidth: '100v', minHeight: '50vh' }}
                >
                    <Grid item md={6}>
                        <Typography variant="h3" color="primary"><LockIcon color="primary" fontSize="large" />Login</Typography>
                    </Grid>
                    <form onSubmit={this.handleSubmit}>
                        <Grid item>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                value={email}
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                fullWidth
                                onChange={this.handleChange}
                                autoFocus
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                id="password"
                                value={password}
                                label="Password"
                                fullWidth
                                name="password"
                                type="password"
                                onChange={this.handleChange}
                                autoComplete="current-password"
                            />
                            <Box mt={8}>
                                <Button type="submit" color="primary" variant="contained" fullWidth>Login</Button>
                            </Box>
                        </Grid>
                    </form>
                </Grid>
            </div >
        )
    }
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired
}

export default firebaseConnect()(Login)