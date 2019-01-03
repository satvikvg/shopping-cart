import React, { Component } from "react";
import Container from "../components/core/container/Container";
import ProductCard from "./ProductCard";
import { Typography } from "@material-ui/core";

class LatestProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

export default LatestProducts;
