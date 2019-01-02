import React, { Component } from "react";
import Header from "../core/header/Header";
import { Typography } from "@material-ui/core";
import Footer from "../core/footer/Footer";
import Container from "../core/container/Container";
import ProductCard from "../../containers/ProductCard";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Header />
        <Container>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </Container>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Home;
