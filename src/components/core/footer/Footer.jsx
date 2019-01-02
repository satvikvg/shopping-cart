import React, { Component } from "react";
import { Typography } from "@material-ui/core";

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Typography variant="subtitle2" align="center">
        This is footer component, [WIP - Will be implemented soon]
      </Typography>
    );
  }
}

export default Footer;
