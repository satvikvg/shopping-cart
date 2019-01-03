import React, { Component } from "react";
import Header from "../core/header/Header";
import { Typography } from "@material-ui/core";
import Footer from "../core/footer/Footer";
import Container from "../core/container/Container";
import ProductCard from "../../containers/ProductCard";
import LatestProducts from "../../containers/LatestProducts";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <React.Fragment>
        <Header />
        {this.props.children}
        <Footer />
      </React.Fragment>
    );
  }
}

export default Home;
