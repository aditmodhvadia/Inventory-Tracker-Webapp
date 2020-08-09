import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'
import { Button } from '@material-ui/core';

class AppNavbar extends Component {
    state = {
        isAuthenticated: false
    }

    static getDerivedStateFromProps(props, state) {
        const { auth } = props
        if (auth.uid) {
            return { isAuthenticated: true }
        } else {
            return { isAuthenticated: false }
        }
    }

    onLogoutClicked = () => {
        const { firebase } = this.props
        firebase.logout()
    }

    render() {
        const { auth } = this.props
        const { isAuthenticated } = this.state
        return (
            <div style={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Button to="/" component={Link} color="inherit" size="large">Track Items</Button>
                        <div style={{ flexGrow: 1 }}></div>
                        {isAuthenticated ?
                            <Typography color="inherit" >{auth.email}</Typography>
                            : null}
                        {isAuthenticated ?
                            <Button size="large" to="/dashboard" component={Link} color="inherit">Dashboard</Button>
                            : null}
                        {isAuthenticated ? null :
                            <React.Fragment>
                                <Button size="large" to="/login" component={Link} color="inherit">Login</Button>
                                <Button size="large" to="/register" component={Link} color="inherit">Register</Button>
                            </React.Fragment>
                        }
                        {isAuthenticated ?
                            <Button size="large" color="secondary" variant="contained" onClick={this.onLogoutClicked}>Logout</Button>
                            : null
                        }
                    </Toolbar>
                </AppBar>
            </ div >
        )
    }
}

AppNavbar.propTypes = {
    firebase: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    })
    )
)(AppNavbar)