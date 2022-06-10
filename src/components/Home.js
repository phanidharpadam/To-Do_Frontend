import React, { useState } from "react";
import { Paper, Box, Grid, Typography } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import todo from "../assets/images/todo.jpg";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: `url(${todo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  signInPaperStyles: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  signUpPaperStyles: {
    margin: theme.spacing(5, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  typography: {
    padding: theme.spacing(1),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © Todo App "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Home() {
  const classes = useStyles();
  const [signInForm, setSignInForm] = useState(true);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        {signInForm ? (
          <SignIn classes={classes} setSignInForm={setSignInForm} />
        ) : (
          <SignUp classes={classes} setSignInForm={setSignInForm} />
        )}
        <Box>
          <Copyright />
        </Box>
      </Grid>
    </Grid>
  );
}
