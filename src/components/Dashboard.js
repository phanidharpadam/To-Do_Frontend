import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import newTodoImage from "../assets/images/newtodo.jpg";
import todoListImage from "../assets/images/todolist.jpg";
import graphImage from "../assets/images/graphs.jpg";
import welcomeNote from "../assets/images/welcomenote.png";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  image: {
    backgroundImage: `url(${welcomeNote})`,
    backgroundSize: "cover",
    margin: theme.spacing(1),
    height: 50,
    boxShadow: "5px 5px 5px grey",
  },
  welcomeNote: {
    color: theme.palette.common.white,
    margin: theme.spacing(0.5),
    fontSize: 18,
  },
  welcomeNoteClose: {
    float: "right",
    position: "relative",
    bottom: "6px",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { setMenubarTitle } = props;
  const [showWelcomeNote, setShowWelcomeNote] = useState(true);

  useEffect(() => {
    setMenubarTitle("Dashboard");
  }, [setMenubarTitle]);

  const { firstName } = JSON.parse(localStorage.getItem("user"));

  const welcomeNote = () => {
    let date = new Date();
    let hour = date.getHours();
    if (hour < 12) {
      return "Good morning,";
    } else if (hour < 17) {
      return "Good afternoon,";
    } else {
      return "Good evening,";
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2} justifyContent="center">
        {showWelcomeNote ? (
          <Grid item xs={12} className={classes.image}>
            <Typography className={classes.welcomeNote}>
              {welcomeNote()} {firstName}.
              <span className={classes.welcomeNoteClose}>
                <CloseIcon
                  fontSize="small"
                  onClick={() => setShowWelcomeNote(false)}
                />
              </span>
            </Typography>
          </Grid>
        ) : null}
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={6} onClick={() => navigate("/addtodo")}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="New ToDo"
                height="140"
                image={newTodoImage}
                title="New ToDo"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  ToDo
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Create (add) a new task or adding a new ToDo in the ToDo List.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                fullWidth
                color="primary"
              >
                Create Todo
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={6} onClick={() => navigate("/listtodos")}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="ToDo List"
                height="140"
                image={todoListImage}
                title="ToDo List"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  ToDo List
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  See all the tasks or View all the ToDos that were added to the
                  app.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                fullWidth
                color="primary"
              >
                View Todos
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card elevation={6} onClick={() => navigate("/charts")}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt="Visualization Report"
                height="140"
                image={graphImage}
                title="Visualization Report"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Visualization
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  See Visualization reports for all the ToDo tasks that were
                  added to the app.
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                fullWidth
                color="primary"
              >
                Reports
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
