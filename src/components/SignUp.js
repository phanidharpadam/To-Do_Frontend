import React, { useState, useEffect, memo } from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
  Popover,
} from "@material-ui/core";

import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearState } from "../features/authSlice";
import { setSnackbar } from "../features/snackbarSlice";

function SignUp(props) {
  const { classes, setSignInForm } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
  };
  const [signUpFormData, setSignUpFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleText = ({ target }) => {
    const { id, name, value } = target;
    const formString = id.concat("_bool");
    setErrors({ ...errors, [id]: "", [formString]: false });
    setSignUpFormData({
      ...signUpFormData,
      [name]: value,
    });
  };

  useEffect(() => {
    if (auth.registerStatus === "success") {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarMessage: "Registered Successfully!",
          snackbarType: "success",
        })
      );
      dispatch(clearState());
      setSignUpFormData({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
      });
      setSignInForm(true);
    } else if (auth.registerStatus === "rejected") {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarMessage: auth.registerError,
          snackbarType: "error",
        })
      );
    }
  }, [auth, dispatch, setSignInForm]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const { flag, _errors } = validateFormData();
    if (!flag) {
      dispatch(registerUser(signUpFormData));
    } else setErrors(_errors);
  };

  const validateFormData = () => {
    const _errors = {};
    let flag = false;
    const emailPattern =
      /^([a-zA-Z0-9.-]+)@([a-zA-Z0-9-]+).([a-z]{2,20})(.[a-z]{2,20})$/;
    const passwordPattern =
      /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/;
    if (!signUpFormData.firstName) {
      _errors.firstName_bool = true;
      _errors.firstName = "First Name is required!";
      flag = true;
    }
    if (!signUpFormData.lastName) {
      _errors.lastName_bool = true;
      _errors.lastName = "Last Name is required!";
      flag = true;
    }
    if (!signUpFormData.userName) {
      _errors.userName_bool = true;
      _errors.userName = "User Name is required!";
      flag = true;
    }
    if (!signUpFormData.email) {
      _errors.email_bool = true;
      _errors.email = "Email Address is required!";
      flag = true;
    } else if (!emailPattern.test(signUpFormData.email)) {
      _errors.email_bool = true;
      _errors.email = "Invaild email address!";
      flag = true;
    }
    if (!signUpFormData.password) {
      _errors.password_bool = true;
      _errors.password = "Password is required!";
      flag = true;
    } else if (!passwordPattern.test(signUpFormData.password)) {
      _errors.password_bool = true;
      _errors.password = "Please check the Password Criteria!";
      flag = true;
    }
    return { flag, _errors };
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.signUpPaperStyles}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              onChange={handleText}
              value={signUpFormData.firstName}
              error={errors.firstName_bool}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              onChange={handleText}
              value={signUpFormData.lastName}
              error={errors.lastName_bool}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              autoComplete="uname"
              onChange={handleText}
              value={signUpFormData.userName}
              error={errors.userName_bool}
              helperText={errors.userName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={handleText}
              value={signUpFormData.email}
              error={errors.email_bool}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleText}
              value={signUpFormData.password}
              error={errors.password_bool}
              helperText={errors.password}
            />
          </Grid>
          <Grid item container justifyContent="flex-end">
            <Grid item>
              <Link
                href="#"
                aria-describedby={id}
                onClick={handleClick}
                variant="body2"
              >
                Password Criteria
              </Link>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <Typography className={classes.typography}>
                  1) At least one upper case English letter
                </Typography>
                <Typography className={classes.typography}>
                  2) At least one lower case English letter
                </Typography>
                <Typography className={classes.typography}>
                  3) At least one digit
                </Typography>
                <Typography className={classes.typography}>
                  4) At least one special character
                </Typography>
                <Typography className={classes.typography}>
                  5) Minimum 8 in length
                </Typography>
              </Popover>
            </Grid>
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link
              component="button"
              onClick={() => setSignInForm(true)}
              variant="body2"
            >
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default memo(SignUp);
