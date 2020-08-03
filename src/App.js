import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/layouts/Login';
import Dashboard from './components/layouts/Dashboard';
import Register from './components/layouts/Register';
import AppNavbar from './components/AppNavbar';
import { Provider } from 'react-redux';
import store, { rrfProps } from './store';
import ErrorPage from './components/layouts/ErrorPage';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { UserIsAuthenticated, UserIsNotAuthenticated } from './helpers/auth'

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <ThemeProvider theme={theme}>
          <Router>
            <div className="App">
              <AppNavbar />
              <Switch>
                <Route exact path="/">
                  <Redirect to="/home" />
                </Route>
                <Route exact path="/home" component={UserIsAuthenticated(Dashboard)} />
                <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
                <Route exact path="/register" component={UserIsNotAuthenticated(Register)} />
                <Route component={ErrorPage} />
              </Switch>
            </div>
          </Router>
        </ThemeProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
