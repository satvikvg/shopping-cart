import React, { Component } from "react";
import autoBind from "auto-bind";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import * as cartSelector from "../../../reducers/cart/reducer";
import classNames from "classnames";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  withStyles,
  Divider,
  InputBase,
  Badge
} from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import CartIcon from "@material-ui/icons/ShoppingCartOutlined";

const style = theme => ({
  root: {
    flexGrow: 1
  },
  transparent: {
    backgroundColor: "transparent",
    boxShadow: "none"
  },
  grow: {
    flexGrow: 1
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  }
});

class Header extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {};
  }
  render() {
    const { classes, cart } = this.props;
    return (
      <AppBar
        position="sticky"
        className={classNames(classes.root, classes.transparent)}
      >
        <Toolbar>
          <Typography variant="h6">Shopping Cart Demo</Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
            />
          </div>
          <div className={classes.grow} />
          <Route
            render={({ history }) => (
              <IconButton
                onClick={() => {
                  history.push(`/cart`);
                }}
              >
                <Badge badgeContent={cart.count} color="secondary">
                  <CartIcon />
                </Badge>
              </IconButton>
            )}
          />
        </Toolbar>
        <Divider />
      </AppBar>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: {
      count: cartSelector.getCartItemsCount(state)
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Header));
