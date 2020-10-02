import React from "react";
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./components/layouts/Login";
import Dashboard from "./components/layouts/Dashboard";
import Register from "./components/layouts/Register";
import AppNavbar from "./components/AppNavbar";
import { Provider } from "react-redux";
import store, { rrfProps } from "./store";
import ErrorPage from "./components/layouts/ErrorPage";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import { UserIsAuthenticated, UserIsNotAuthenticated } from "./helpers/auth";
import {
  HOME_ROUTE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  ADD_ITEM_ROUTE,
  ITEM_DETAIL_ROUTE,
  ADD_BAG_ROUTE,
  BAG_LIST_ROUTE,
  BAG_DETAIL_ROUTE,
} from "./routes";
import AddItem from "./components/inventoryitems/AddItem";
import InventoryItemDetail from "./components/inventoryitems/InventoryItemDetail";
import AddBag from "./components/bagitems/AddBag";
import BottomLeftSnackBar from "./components/BottomLeftSnackBar";
import BagItemDetail from "./components/bagitems/BagItemDetail";

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
                <Route
                  exact
                  path={HOME_ROUTE}
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path={BAG_LIST_ROUTE}
                  component={UserIsAuthenticated(Dashboard)}
                />
                <Route
                  exact
                  path={LOGIN_ROUTE}
                  component={UserIsNotAuthenticated(Login)}
                />
                <Route
                  exact
                  path={REGISTER_ROUTE}
                  component={UserIsNotAuthenticated(Register)}
                />
                <Route
                  exact
                  path={ADD_ITEM_ROUTE}
                  component={UserIsAuthenticated(AddItem)}
                />
                <Route
                  exact
                  path={ADD_BAG_ROUTE}
                  component={UserIsAuthenticated(AddBag)}
                />
                <Route
                  exact
                  path={ITEM_DETAIL_ROUTE}
                  component={UserIsAuthenticated(InventoryItemDetail)}
                />
                <Route
                  path={BAG_DETAIL_ROUTE}
                  component={UserIsAuthenticated(BagItemDetail)}
                />
                <Route component={ErrorPage} />
              </Switch>
              <BottomLeftSnackBar />
            </div>
          </Router>
        </ThemeProvider>
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
