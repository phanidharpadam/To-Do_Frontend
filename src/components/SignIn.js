import React, { useState, memo } from "react";
import {
  Avatar,
  Button,
  TextField,
  Link,
  Grid,
  Typography,
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/authSlice";

function SignIn(props) {
  const { classes, setSignInForm } = props;
  const initialValues = { email: "", password: "" };
  const [signInFormData, setSignInFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const handleText = ({ target }) => {
    const { id, name, value } = target;
    const formString = id.concat("_bool");
    setErrors({ ...errors, [id]: "", [formString]: false });
    setSignInFormData({
      ...signInFormData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { flag, _errors } = validateFormData();
    if (!flag) {
      console.log(signInFormData);
      dispatch(loginUser(signInFormData));
    } else setErrors(_errors);
  };

  const validateFormData = () => {
    const _errors = {};
    let flag = false;
    const emailPattern =
      /^([a-zA-Z0-9.-]+)@([a-zA-Z0-9-]+).([a-z]{2,20})(.[a-z]{2,20})$/;

    if (!signInFormData.email) {
      _errors.email_bool = true;
      _errors.email = "Email Address is required!";
      flag = true;
    } else if (!emailPattern.test(signInFormData.email)) {
      _errors.email_bool = true;
      _errors.email = "Invaild email address!";
      flag = true;
    }
    if (!signInFormData.password) {
      _errors.password_bool = true;
      _errors.password = "Password is required!";
      flag = true;
    } else if (signInFormData.password.length < 8) {
      _errors.password_bool = true;
      _errors.password = "Minimum 8 characters required!";
      flag = true;
    }

    return { flag, _errors };
  };

  return (
    <div className={classes.signInPaperStyles}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="username"
          autoFocus
          onChange={handleText}
          value={signInFormData.email}
          error={errors.email_bool}
          helperText={errors.email}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handleText}
          value={signInFormData.password}
          error={errors.password_bool}
          helperText={errors.password}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs></Grid>
          <Grid item>
            <Link
              component="button"
              onClick={() => setSignInForm(false)}
              variant="body2"
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default memo(SignIn);
