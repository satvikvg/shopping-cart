import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
  CardActions,
  Button,
  withStyles,
  Grid
} from "@material-ui/core";

const style = theme => ({
  card: {
    display: "inline-block",
    maxWidth: 320,
    margin: theme.spacing.unit
  },
  media: {
    height: 200
  }
});

class ProductCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return this.renderProductCard();
  }

  renderProductCard() {
    const { classes, product } = this.props;
    return (
      <Card className={classes.card}>
        <CardActionArea onClick={this.props.onClick}>
          <CardMedia
            className={classes.media}
            image={product.image}
            title={product.name}
          />
          <CardContent>
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography gutterBottom variant="h6">
                  {product.name.length > 20
                    ? product.name.substring(0, 20) + "..."
                    : product.name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography gutterBottom variant="subtitle2">
                  <b>{product.price}</b>
                </Typography>
              </Grid>
            </Grid>
            <Typography color="textSecondary">
              {product.description.length > 75
                ? product.description.substring(0, 75) + "..."
                : product.description}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            fullWidth
            onClick={this.props.onAddToCart}
          >
            Add to cart
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(style)(ProductCard);
