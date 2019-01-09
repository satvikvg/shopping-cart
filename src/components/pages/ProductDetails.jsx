import React, { Component } from "react";
import {
  Typography,
  withStyles,
  ListItem,
  Button,
  Divider
} from "@material-ui/core";
import Container from "../core/container/Container";
import * as productSelector from "../../reducers/product/reducer";
import { FETCH_PRODUCT_REQUEST } from "../../reducers/product/actionTypes";
import { connect } from "react-redux";

const styles = theme => ({
  productImage: {
    maxWidth: 400,
    maxHeight: 400,
    textAlign: "center",
    margin: theme.spacing.unit
  },
  productDetails: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit
  },
  productProperty: {
    margin: theme.spacing.unit
  }
});

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      product: this.props.location.product
    };
  }

  componentDidMount() {
    const { product } = this.props.location;
    const productId = this.props.match.params.id;

    if (!product && productId) {
      this.setState({ isLoading: true });
      this.getProductById(productId);
    } else {
      this.setState({
        error: new Error("Product not found with id: NULL")
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { product } = this.props.location;

    console.debug(this.props);

    return (
      <Container>
        <ListItem>
          <div className={classes.productImage}>
            <img src={product.image} alt={product.name} />
          </div>
          <div className={classes.productDetails}>
            <ListItem>
              <div>
                <Typography variant="h5">{product.name}</Typography>

                <Typography variant="body2" align="justify">
                  {product.description}
                </Typography>
              </div>
            </ListItem>
            <Divider variant="middle" />
            <ListItem>
              <div className={classes.productProperty}>
                <Typography variant="title">
                  <b>{product.price}</b>
                </Typography>
                <Typography variant="caption">
                  Inclusive of all taxes
                </Typography>
              </div>

              <div className={classes.productProperty}>
                <Typography variant="title">
                  <b>{`${product.weight} Kg`}</b>
                </Typography>
                <Typography variant="caption">Net Weight</Typography>
              </div>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Add to cart
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                Buy now
              </Button>
            </ListItem>
          </div>
        </ListItem>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: productSelector.isLoading(state),
    product: productSelector.getProduct(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onRequestProduct: id => {
      dispatch({ type: FETCH_PRODUCT_REQUEST, payload: { id } });
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(ProductDetails));
