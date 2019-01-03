import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import Container from "../core/container/Container";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <Typography align="center">
          Product Id: {this.props.match.params.id} This is product details page.
          WIP
        </Typography>
      </Container>
    );
  }
}

export default ProductDetails;
