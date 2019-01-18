import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Typography,
  withStyles,
  ListItem,
  Button,
  Divider,
  CircularProgress,
  LinearProgress
} from "@material-ui/core";
import Container from "../core/container/Container";
import * as productSelector from "../../reducers/product/reducer";
import { FETCH_PRODUCT_REQUEST } from "../../reducers/product/actionTypes";
import { connect } from "react-redux";
import * as cartActions from "../../reducers/cart/actions";
import * as cartSelector from "../../reducers/cart/reducer";

const styles = theme => ({
  productImage: {
    maxWidth: 400,
    maxHeight: 400,
    textAlign: "center",
    margin: theme.spacing.unit
  },
  productDetails: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  productProperty: {
    margin: theme.spacing.unit
  }
});

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      product: this.props.location.product
    };
  }

  componentDidMount() {
    const productId = this.props.match.params.id;

    if (productId) {
      this.props.onRequestProduct(productId);
    } else {
      this.setState({
        error: new Error("Product not found with id: NULL")
      });
    }
  }

  render() {
    const { isLoading, product, buyNow } = this.props;

    if (buyNow) {
      return <Redirect to={"/checkout"} />;
    }

    if (isLoading) {
      return this.renderLoading();
    } else if (!isLoading && product) {
      return this.renderProductDetails();
    } else {
      return this.renderError();
    }
  }

  renderLoading() {
    return <LinearProgress color="secondary" />;
  }

  renderProductDetails() {
    const { classes, product } = this.props;

    return (
      <Container>
        <ListItem>
          <div className={classes.productImage}>
            <img src={product.image} alt={product.name} />
          </div>
          <div className={classes.productDetails}>
            <ListItem>
              <div>
                <Typography variant="h5">{product.name}</Typography>

                <Typography variant="body2" align="justify">
                  {product.description}
                </Typography>
              </div>
            </ListItem>
            <Divider variant="middle" />
            <ListItem>
              <div className={classes.productProperty}>
                <Typography variant="title">
                  <b>{product.price}</b>
                </Typography>
                <Typography variant="caption">
                  Inclusive of all taxes
                </Typography>
              </div>

              <div className={classes.productProperty}>
                <Typography variant="title">
                  <b>{`${product.weight} Kg`}</b>
                </Typography>
                <Typography variant="caption">Net Weight</Typography>
              </div>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => this.props.onAddToCart({ product })}
              >
                Add to cart
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={() => this.props.onBuyNow(product)}
              >
                Buy now
              </Button>
            </ListItem>
          </div>
        </ListItem>
      </Container>
    );
  }

  renderError() {
    return (
      <Typography variant="h5" color="error">
        Error loading product details page.
      </Typography>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: productSelector.isLoading(state),
    product: productSelector.getProduct(state),
    buyNow: cartSelector.isBuyNow(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onRequestProduct: id => {
      dispatch({ type: FETCH_PRODUCT_REQUEST, payload: { id } });
    },
    onAddToCart: item => dispatch(cartActions.addToCart(item)),

    onBuyNow: product => dispatch(cartActions.buyNow({ product }))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProductDetails));
