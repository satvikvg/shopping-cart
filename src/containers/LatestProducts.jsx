import React, { Component } from "react";
import PropTypes from "prop-types";
import Container from "../components/core/container/Container";
import ProductCard from "./ProductCard";
import {
  Typography,
  withStyles,
  CircularProgress,
  LinearProgress
} from "@material-ui/core";
import * as productsSelector from "../reducers/product/reducer";
import { FETCH_LATEST_PRODUCTS_REQUEST } from "../reducers/product/actionTypes";
import { connect } from "react-redux";
import { ADD_CART_ITEM } from "../reducers/cart/actionTypes";
import * as cartActions from "../reducers/cart/actions";

const styles = theme => ({});

class LatestProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.onRequestLatestProducts();
  }

  render() {
    const { isLoading } = this.props;

    if (isLoading) {
      return this.renderLoading();
    } else {
      return this.renderLatestProducts();
    }
  }

  renderLoading() {
    return <LinearProgress variant="indeterminate" color="secondary" />;
  }

  renderLatestProducts() {
    const { latestProducts } = this.props;
    return (
      <React.Fragment>
        {latestProducts.map(product => {
          console.log(product);
          return (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => this.handleProductClick(product.id)}
              onAddToCart={() => this.props.handleAddToCart(product)}
            />
          );
        })}
      </React.Fragment>
    );
  }

  handleProductClick(id) {
    this.props.history.push(`/product/${id}`);
  }
}

function mapStateToProps(state) {
  return {
    latestProducts: productsSelector.getLatestProducts(state)
      ? productsSelector.getLatestProducts(state)
      : [],
    isLoading: productsSelector.isLoading(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onRequestLatestProducts: () =>
      dispatch({ type: FETCH_LATEST_PRODUCTS_REQUEST }),

    handleAddToCart: product =>
      dispatch({ type: ADD_CART_ITEM, payload: { product } })
  };
}

LatestProducts.propTypes = {
  classes: PropTypes.object.isRequired,
  latestProducts: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(LatestProducts));
