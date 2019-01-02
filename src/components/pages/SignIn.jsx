import React, { Component } from "react";
import { Typography, Button } from "@material-ui/core";
import Container from "../core/container/Container";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Container>
        <Typography variant="h2">This is Sign in Page WIP</Typography>
        <Button variant="text">Sign in</Button>
      </Container>
    );
  }
}

export default SignIn;
