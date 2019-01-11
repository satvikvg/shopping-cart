import React, { Component } from "react";
import autoBind from "auto-bind";
import { Link } from "react-router-dom";
import * as cartSelector from "../../reducers/cart/reducer";
import {
  Typography,
  withStyles,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Divider,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  Button
} from "@material-ui/core";
import Container from "../core/container/Container";
import { connect } from "react-redux";
import DeleteIcon from "@material-ui/icons/DeleteOutlined";
import { REMOVE_CART_ITEM } from "../../reducers/cart/actionTypes";

const styles = theme => ({
  grow: {
    flexGrow: 1
  }
});

class CartPage extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {};
  }
  render() {
    return this.renderCartDetails();
  }

  renderCartDetails() {
    const { classes, cart } = this.props;

    return (
      <Container>
        <Grid container>
          <Grid item xs>
            <Typography variant="h5">Your cart</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/checkout"
            >
              Checkout
            </Button>
          </Grid>
        </Grid>
        <List>{this.getCartItems()}</List>
        <ListItem>
          <Typography variant="h6" className={classes.grow}>
            Cart summary
          </Typography>
          <div>
            <Typography variant="subtitle1">
              <b>{`$${this.props.cartTotal}`}</b>
            </Typography>
            <Typography variant="caption">Inclusive of all taxes</Typography>
          </div>
        </ListItem>
      </Container>
    );
  }

  getCartItems() {
    const { classes, items } = this.props;

    return (
      <React.Fragment>
        {items.map((item, index) => (
          <ListItem key={`cart-item-${index}`} divider>
            <ListItemAvatar>
              <Avatar src={item.product.image} alt={item.product.name}>
                {item.product.name.substr(0, 2)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              className={classes.grow}
              primary={
                item.product.name.length > 24
                  ? item.product.name.substring(0, 24) + "..."
                  : item.product.name
              }
              secondary={
                item.product.description.length > 45
                  ? item.product.description.substring(0, 45) + "..."
                  : item.product.description
              }
            />
            <Typography variant="h6" style={{ marginRight: 32 }}>
              {item.product.price}
            </Typography>
            <ListItemSecondaryAction>
              <IconButton
                onClick={() => this.props.handleCartItemDelete(index)}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: cartSelector.getCartItems(state),
    cartTotal: cartSelector.getCartTotal(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    handleCartItemDelete: index =>
      dispatch({ type: REMOVE_CART_ITEM, payload: { index } })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CartPage));
