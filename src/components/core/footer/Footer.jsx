import React, { Component } from "react";
import { Typography } from "@material-ui/core";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <footer color="">
        <Typography variant="h6" align="center" gutterBottom>
          Shopping cart demo
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="textSecondary"
          component="p"
        >
          Copyright 2019 - Shopping cart company
        </Typography>
      </footer>
    );
  }
}

export default Footer;
