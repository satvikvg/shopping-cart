import React, { Component } from "react";
import Container from "../components/core/container/Container";
import ProductCard from "./ProductCard";
import { Typography } from "@material-ui/core";
import * as productsSelector from "../reducers/product/reducer";
import { FETCH_LATEST_PRODUCTS_REQUEST } from "../reducers/product/actionTypes";
import { connect } from "react-redux";

class LatestProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.onRequestLatestProducts();
  }

  render() {
    return (
      <Container>
        <Typography variant="subtitle1">Latest products</Typography>
        <ProductCard />
        <ProductCard />
        <ProductCard />
        <ProductCard />
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    latestProducts: productsSelector.getLatestProducts(state),
    isLoading: productsSelector.isLoading(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onRequestLatestProducts: () =>
      dispatch({ type: FETCH_LATEST_PRODUCTS_REQUEST })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LatestProducts);
