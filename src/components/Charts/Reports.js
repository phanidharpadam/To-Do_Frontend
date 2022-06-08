import React, { useEffect } from "react";
import { Card, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { getTodosReport } from "../../features/todosSlice";
import { useDispatch, useSelector } from "react-redux";
import PieChart from "./PieChart";
import BarChart from "./BarChart";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

export default function Reports(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
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
    </div>
  );
}
