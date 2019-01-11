import React, { Component } from "react";
import { connect } from "react-redux";
import * as userSelector from "./reducers/user/reducer";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";
import { MuiThemeProvider } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from "./components/pages/Home";
import { AuthContext } from "./contexts/AuthContext";
import Checkout from "./components/pages/Checkout";
import SignIn from "./components/pages/SignIn";
import ProductDetails from "./components/pages/ProductDetails";
import LatestProducts from "./containers/LatestProducts";
import CartPage from "./components/pages/CartPage";
// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: pink,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2
  },
  typography: {
    useNextVariants: true
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { isAuth } = this.props;
    return (
      <AuthContext.Provider>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route path={"/signin"} component={SignIn} />
              <Home>
                <Route exact path={"/"} component={LatestProducts} />
                <Route path={"/cart"} component={CartPage} />
                <Route path={"/product/:id"} component={ProductDetails} />
                <PrivateRoute
                  path={"/checkout"}
                  isAuth={isAuth}
                  component={Checkout}
                />
              </Home>
            </Switch>
          </Router>
        </MuiThemeProvider>
      </AuthContext.Provider>
    );
  }
}

function PrivateRoute({ component: Component, ...rest }) {
  console.debug("Entered Private route");
  return (
    <Route
      {...rest}
      render={props =>
        props.isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function mapStateToProps(state) {
  return {
    currentUser: userSelector.getCurrentUser(state),
    isAuth: userSelector.getCurrentUser(state) ? true : false
  };
}

export default connect(mapStateToProps)(App);
