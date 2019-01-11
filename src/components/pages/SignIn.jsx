import React, { Component } from "react";
import { connect } from "react-redux";
import autoBind from "auto-bind";
import * as userActions from "../../reducers/user/actions";
import * as userSelectors from "../../reducers/user/reducer";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { LinearProgress } from "@material-ui/core";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class SignIn extends Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      user: {}
    };

    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
  }

  render() {
    const { classes, isLoading, currentUser, error } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
        {isLoading && <LinearProgress variant="indeterminate" />}
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.handleFormSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                innerRef={() => this.emailInput}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                innerRef={()=>this.passwordInput}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const user = {
     email : this.emailInput.value,
     password : this.passwordInput.value,
    }

    this.props.onSignInRequest(user);
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    isLoading: userSelectors.isLoading(state),
    currentUser: userSelectors.getCurrentUser(state),
    error: userSelectors.getError(state)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onSignInRequest: (user) => dispatch(userActions.signIn(user))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn));
