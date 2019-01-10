import React, { Component } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import pink from "@material-ui/core/colors/pink";
import red from "@material-ui/core/colors/red";
import { Typography, MuiThemeProvider } from "@material-ui/core";
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
    return (
      <AuthContext.Provider>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Home>
                <Switch>
                  <Route exact path={"/"} component={LatestProducts} />
                  <Route path={"/cart"} component={CartPage} />
                  <Route path={"/product/:id"} component={ProductDetails} />
                </Switch>
              </Home>
              <Route path={"/signin"} component={SignIn} />
              <PrivateRoute path={"/checkout"} component={Checkout} />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </AuthContext.Provider>
    );
  }
}

function PrivateRoute({ component: Component, ...rest }) {
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

export default App;
