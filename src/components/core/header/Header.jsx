import React, { Component } from "react";
import autoBind from "auto-bind";
import { connect } from "react-redux";
import { Route, Link } from "react-router-dom";
import * as cartSelector from "../../../reducers/cart/reducer";
import * as userSelectors from "../../../reducers/user/reducer";
import * as userActions from "../../../reducers/user/actions";
import * as productActions from "../../../reducers/product/actions";
import classNames from "classnames";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  withStyles,
  Divider,
  InputBase,
  Badge,
  Avatar,
  Popper,
  Fade,
  Paper,
  DialogActions,
  Button,
  ListItem,
  ListItemAvatar,
  ListItemText
} from "@material-ui/core";
import { fade } from "@material-ui/core/styles/colorManipulator";
import SearchIcon from "@material-ui/icons/Search";
import CartIcon from "@material-ui/icons/ShoppingCartOutlined";
import AccountCircleIcon from "@material-ui/icons/AccountCircleOutlined";

const style = theme => ({
  root: {
    flexGrow: 1
  },
  transparent: {},
  grow: {
    flexGrow: 1
  },
  title: {
    color: theme.palette.common.white
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
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
  },
  popper: {},
  popperContent: {
    padding: theme.spacing.unit
  },
  menuBar: {
    margin: 0,
    padding: 0
  },
  menuItem: {
    marginLeft: theme.spacing.unit / 2,
    marginRight: theme.spacing.unit / 2,
    color: theme.palette.common.white
  }
});

class Header extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      accountPopper: {
        anchorEl: null,
        open: false
      }
    };

    this.toolbarAnchor = React.createRef();
  }
  render() {
    const { classes, cart, currentUser } = this.props;
    const { accountPopper } = this.state;
    const id = accountPopper.open ? "simple-popper" : null;

    return (
      <AppBar
        position="sticky"
        className={classNames(classes.root, classes.transparent)}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link
              to={"/"}
              className={classes.title}
              style={{ textDecoration: "none" }}
            >
              Shopping Cart Demo
            </Link>
          </Typography>
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
              onChange={this.handleSearchFieldChangeEvent}
            />
          </div>
        </Toolbar>

        <ListItem className={classes.menuBar}>
          <Button
            variant="text"
            onClick={() => this.props.onRequestProducts({ category: null })}
            className={classes.menuItem}
          >
            All
          </Button>
          <Button
            variant="text"
            onClick={() => this.props.onRequestProducts({ category: 0 })}
            className={classes.menuItem}
          >
            Vegetables
          </Button>
          <Button
            variant="text"
            onClick={() => this.props.onRequestProducts({ category: 1 })}
            className={classes.menuItem}
          >
            Gourds and squashes
          </Button>
          <Button
            variant="text"
            onClick={() => this.props.onRequestProducts({ category: 2 })}
            className={classes.menuItem}
          >
            Roots and tubers
          </Button>
          <Button
            variant="text"
            onClick={() => this.props.onRequestProducts({ category: 3 })}
            className={classes.menuItem}
          >
            Pods and seeds
          </Button>
          <Button
            variant="text"
            onClick={() => this.props.onRequestProducts({ category: 4 })}
            className={classes.menuItem}
          >
            Fruits
          </Button>
          <div className={classes.grow} />
          <Route
            render={({ history }) => (
              <IconButton
                onClick={() => {
                  history.push(`/cart`);
                }}
              >
                <Badge
                  badgeContent={cart.count}
                  color="secondary"
                  className={classes.title}
                >
                  <CartIcon />
                </Badge>
              </IconButton>
            )}
          />
          <IconButton aria-describedby={id} onClick={this.handleClickAccount}>
            {currentUser ? (
              <Avatar>
                {currentUser.firstName.substr(0, 2).toUpperCase()}
              </Avatar>
            ) : (
              <AccountCircleIcon className={classes.title} />
            )}
          </IconButton>
          <Popper
            id={id}
            open={accountPopper.open}
            anchorEl={accountPopper.anchorEl}
            transition
            className={classes.popper}
          >
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  {currentUser
                    ? this.renderSignOutAccountContent()
                    : this.renderSignInAccountContent()}
                </Paper>
              </Fade>
            )}
          </Popper>
        </ListItem>
      </AppBar>
    );
  }

  renderSignOutAccountContent() {
    const { classes, currentUser } = this.props;
    return (
      <div className={classes.popperContent}>
        <ListItem>
          <ListItemAvatar>
            <Avatar>{currentUser.firstName.substr(0, 2).toUpperCase()}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={`${currentUser.firstName} ${currentUser.lastName}`}
            secondary={`${currentUser.email} | ${currentUser.phone}`}
          />
        </ListItem>
        <DialogActions>
          <Button color="primary" onClick={this.props.onSignOutRequest}>
            Sign out
          </Button>
        </DialogActions>
      </div>
    );
  }

  renderSignInAccountContent() {
    return (
      <React.Fragment>
        <DialogActions>
          <Button
            color="primary"
            component={Link}
            to={{
              pathname: "/signin",
              state: {
                from: {
                  pathname: "/"
                }
              }
            }}
          >
            Sign In
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }

  handleClickAccount(event) {
    const { currentTarget } = event;
    this.setState(state => ({
      accountPopper: {
        anchorEl: currentTarget,
        open: !state.accountPopper.open
      }
    }));
  }

  handleSearchFieldChangeEvent(event) {
    console.debug("Searching for: " + event.target.value);
    this.props.onSearch(event.target.value);
  }
}

function mapStateToProps(state) {
  return {
    cart: {
      count: cartSelector.getCartItemsCount(state)
    },
    currentUser: userSelectors.getCurrentUser(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSignOutRequest: () => dispatch(userActions.signOut()),
    onRequestProducts: filter => dispatch(productActions.getProducts(filter)),
    onSearch: query => dispatch(productActions.searchProducts(query))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Header));
