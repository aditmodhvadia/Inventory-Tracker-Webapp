import React from 'react';
import { ThemeProvider } from '@material-ui/core';
import theme from './theme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/layouts/Login';
import Dashboard from './components/layouts/Dashboard';
import Register from './components/layouts/Register';
import AppNavbar from './components/layouts/AppNavbar';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <div className="App">
          <AppNavbar />
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
