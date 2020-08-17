import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import { Button, Box, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { toggleDrawer } from '../actions/drawerActions'

class AppNavbar extends Component {
  state = {
    isAuthenticated: false,
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;
    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  onMenuClicked = () => {
    const { toggleDrawer } = this.props;
    toggleDrawer()
  }

  onLogoutClicked = () => {
    const { firebase } = this.props;
    firebase.logout();
  };

  render() {
    const { auth } = this.props;
    const { isAuthenticated } = this.state;
    return (
      <div style={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            {isAuthenticated ? (
              <IconButton onClick={this.onMenuClicked} color='inherit'><MenuIcon /></IconButton>
            ) : null}
            <Button to='/' component={Link} color='inherit' size='large'>
              Track Items
            </Button>
            <div style={{ flexGrow: 1 }}></div>
            {isAuthenticated ? (
              <Box marginRight={2}>
                <Typography color='inherit'>{auth.email}</Typography>
              </Box>
            ) : null}
            {isAuthenticated ? null : (
              <React.Fragment>
                <Button
                  size='large'
                  to='/login'
                  component={Link}
                  color='inherit'>
                  Login
                </Button>
                <Button
                  size='large'
                  to='/register'
                  component={Link}
                  color='inherit'>
                  Register
                </Button>
              </React.Fragment>
            )}
            {isAuthenticated ? (
              <Button
                size='large'
                color='inherit'
                component={Link}
                onClick={this.onLogoutClicked}>
                Logout
              </Button>
            ) : null}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    drawer: state.drawer
  }), { toggleDrawer })
)(AppNavbar);
