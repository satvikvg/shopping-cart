import React, { Component } from "react";
import { Route } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
  Button,
  withStyles
} from "@material-ui/core";

const style = theme => ({
  card: {
    display: "inline-block",
    maxWidth: 320,
    margin: theme.spacing.unit
  }
});

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {
        name: "Product name",
        shortDesc: "This is product short description",
        description: "Product description",
        price: "Rs. 25"
      }
    };
  }
  render() {
    const { classes } = this.props;
    const { product } = this.state;
    return (
      <Card className={classes.card}>
        <Route
          render={({ history }) => (
            <CardActionArea
              onClick={() => {
                history.push("/product/PROD0001");
              }}
            >
              <CardMedia>
                <img src={"./public/icon.png"} alt="Product image" />
              </CardMedia>
              <CardContent>
                <Typography variant="h4">{product.name}</Typography>
                <Typography variant="subtitle1">{product.shortDesc}</Typography>
                <Typography variant="caption">{product.price}</Typography>
              </CardContent>
            </CardActionArea>
          )}
        />

        <CardActions>
          <Button size="small" color="primary">
            Add to cart
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(style)(ProductCard);
