import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearStatus } from "../features/authSlice";
import { setSnackbar } from "../features/snackbarSlice";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  if (localStorage.getItem("token")) {
    return children;
  }

  return <Navigate replace to="/" />;
};

export const ProtectedRoute2 = ({ children }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (auth.loginStatus === "success") {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarMessage: "Login Successfull!",
          snackbarType: "success",
        })
      );
      dispatch(clearStatus());
    } else if (auth.loginStatus === "rejected") {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarMessage: auth.loginError,
          snackbarType: "error",
        })
      );
    }
  }, [auth, dispatch]);

  if (localStorage.getItem("token")) {
    return <Navigate replace to="/dashboard" />;
  }

  return children;
};
