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
    this.state = {};
  }
  render() {
    const { classes, product } = this.props;
    return (
      <Card className={classes.card}>
        <Route
          render={({ history }) => (
            <CardActionArea
              onClick={() => {
                history.push("/product/" + product.id);
              }}
            >
              <CardMedia>
                <img src={product.image} alt={product.name} />
              </CardMedia>
              <CardContent>
                <Typography variant="h4">{product.name}</Typography>
                <Typography variant="subtitle1">
                  {product.description}
                </Typography>
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
