import React, { Component } from 'react'
import { Grid, Typography, TextField, Box, Button } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock';
import PropTypes from 'prop-types'
import { firebaseConnect } from 'react-redux-firebase'
import { isEmailValid, isPasswordValid, arePasswordsMatching } from '../../helpers/utils';
import { HOME_ROUTE } from './../../routes'


class Register extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: ''
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { email, password, confirmPassword } = this.state

        if (!isEmailValid(email)) {
            console.error('Email is invalid')
            return
        }

        if (!isPasswordValid(password)) {
            console.error('Password is invalid')
            return
        }

        if (!arePasswordsMatching(password, confirmPassword)) {
            console.error('Passwords do not match')
            return
        }

        // TODO: Validate input fields

        const { firebase, history } = this.props

        firebase.createUser({
            email: email,
            password: password
        }).catch(e => {
            // TODO: Notify user of the error
        }).then(() => {
            history.push(HOME_ROUTE)
        }).then(() => {
            this.setState({
                email: '',
                password: '',
                confirmPassword: ''
            })
        })
    }

    render() {
        const { email, password, confirmPassword } = this.state
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
                        <Typography variant="h3" color="primary"><LockIcon color="primary" fontSize="large" />Register</Typography>
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
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                id="confirmPassword"
                                value={confirmPassword}
                                label="Confirm Password"
                                fullWidth
                                name="confirmPassword"
                                type="password"
                                onChange={this.handleChange}
                            />
                            <Box mt={8}>
                                <Button type="submit" color="primary" variant="contained" fullWidth>Register</Button>
                            </Box>
                        </Grid>
                    </form>
                </Grid>
            </div >
        )
    }
}

Register.propTypes = {
    firebase: PropTypes.object.isRequired
}

export default firebaseConnect()(Register)