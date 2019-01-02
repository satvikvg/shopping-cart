import React, { Component } from "react";
import { Typography } from "@material-ui/core";

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Typography align="center">
        Product Id: {this.props.match.params.id} This is product details page.
        WIP
      </Typography>
    );
  }
}

export default ProductDetails;
