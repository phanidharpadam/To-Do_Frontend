import React, { useState, useEffect } from "react";
import { Card, Grid, Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getTodosReport } from "../../features/todosSlice";
import { useDispatch, useSelector } from "react-redux";
import PieChart from "./PieChart";
import BarChart from "./BarChart";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function Reports(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [backdropOpen, setBackdropOpen] = useState(true);
  const { setMenubarTitle } = props;
  const todosState = useSelector((state) => state.todos);
  const { reportData } = todosState;

  let priorityData = reportData?.priorityChartData || [];
  let statusData = reportData?.statusChartData || [];

  useEffect(() => {
    setMenubarTitle("Reports");
  }, [setMenubarTitle]);

  useEffect(() => {
    dispatch(getTodosReport());
  }, [dispatch]);

  useEffect(() => {
    if (todosState.getTodosReportStatus === "success") {
      setBackdropOpen(false);
    } else if (todosState.getTodosReportStatus === "rejected") {
      alert("Error");
      setBackdropOpen(false);
      console.log(todosState.getTodosReportError);
    }
  }, [todosState]);

  return (
    <div className={classes.root}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={10} md={6}>
          <Card elevation={6}>
            <PieChart data={priorityData} title={"Priority Report"} />
          </Card>
        </Grid>
        <Grid item xs={12} sm={10} md={6}>
          <Card elevation={6}>
            <PieChart data={statusData} title="Status Report" />
          </Card>
        </Grid>
        <Grid item xs={12} sm={10} md={6}>
          <Card elevation={6}>
            <BarChart
              data={priorityData}
              title="Total Todos by Priorities"
              vAxisTitle="No. of Priorities"
              hAxisTitle="Priority"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={10} md={6}>
          <Card elevation={6}>
            <BarChart
              data={statusData}
              title="Total Todos by Status"
              vAxisTitle="No. of Status"
              hAxisTitle="Status"
            />
          </Card>
        </Grid>
      </Grid>
      <Backdrop className={classes.backdrop} open={backdropOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
