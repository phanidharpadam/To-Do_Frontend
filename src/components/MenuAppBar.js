import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  Avatar,
  CssBaseline,
} from "@material-ui/core";
import { deepOrange } from "@material-ui/core/colors";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../features/authSlice";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  hoverStyles: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

export default function MenuAppBar(props) {
  const { menubarTitle } = props;

  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const { firstName, lastName } = JSON.parse(localStorage.getItem("user"));
  const avatarName =
    firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    navigate("/profile");
    handleClose();
  };

  const handleSignOut = () => {
    navigate("/");
    dispatch(logoutUser());
    handleClose();
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography
            onClick={() => navigate("/dashboard")}
            variant="h6"
            className={classes.title}
          >
            <span className={classes.hoverStyles}>ToDO</span>
          </Typography>
          <Typography variant="h6" className={classes.title}>
            {menubarTitle}
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <Avatar className={classes.orange}>{avatarName}</Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              transformOrigin={{ vertical: "top", horizontal: "center" }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
