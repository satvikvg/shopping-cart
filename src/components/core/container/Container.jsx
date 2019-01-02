import React, { Component } from "react";
import { withStyles } from "@material-ui/core";

const style = theme => ({
  contentWrapper: {
    padding: theme.spacing.unit * 2,
    minHeight: "100vh"
  }
});

class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { classes } = this.props;
    return <div className={classes.contentWrapper}>{this.props.children}</div>;
  }
}

export default withStyles(style)(Container);
