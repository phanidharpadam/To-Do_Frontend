import React, { useEffect } from "react";
import { TextField, Paper, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: "none",
    width: "100%",
    maxWidth: "40rem",
    margin: theme.spacing(1, "auto"),
    padding: theme.spacing(2),
    boxShadow: "none",
  },
  paper2: {
    background: "none",
    width: "100%",
    maxWidth: "50rem",
    margin: theme.spacing(2, "auto"),
    display: "flex",
    alignItems: "center",
  },
}));

export default function MyProfile(props) {
  const classes = useStyles();
  const { firstName, lastName, username, email, createdAt } = JSON.parse(
    localStorage.getItem("user")
  );
  const { setMenubarTitle } = props;

  useEffect(() => {
    setMenubarTitle("My Profile");
  }, [setMenubarTitle]);

  return (
    <Paper elevation={6} className={classes.paper2}>
      <Paper component="form" className={classes.paper}>
        <Grid container spacing={4} justifyContent="center">
          <Grid container item spacing={4} justifyContent="center">
            <Grid item xs={10} sm={11} md={6}>
              <TextField
                id="firstName"
                name="firstName"
                fullWidth
                label="First Name"
                variant="outlined"
                value={firstName}
                disabled
              />
            </Grid>
            <Grid item xs={10} sm={11} md={6}>
              <TextField
                id="lastName"
                name="lastName"
                fullWidth
                label="Last Name"
                variant="outlined"
                value={lastName}
                disabled
              />
            </Grid>
          </Grid>
          <Grid item xs={10} sm={11} md={12}>
            <TextField
              id="userName"
              name="userName"
              fullWidth
              label="Last Name"
              variant="outlined"
              value={username}
              disabled
            />
          </Grid>
          <Grid item xs={10} sm={11} md={12}>
            <TextField
              id="email"
              name="email"
              fullWidth
              label="Last Name"
              variant="outlined"
              value={email}
              disabled
            />
          </Grid>
          <Grid item xs={10} sm={11} md={12}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                variant="inline"
                format="MM/dd/yyyy"
                id="createdAt"
                name="createdAt"
                label="Created Date"
                fullWidth
                inputVariant="outlined"
                value={Date(createdAt)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                disabled
              />
            </MuiPickersUtilsProvider>
          </Grid>
        </Grid>
      </Paper>
    </Paper>
  );
}
