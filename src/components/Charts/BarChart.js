import React from "react";
import { Chart } from "react-google-charts";

export default function BarChart(props) {
  const { data, title, vAxisTitle, hAxisTitle } = props;
  const options = {
    title: `${title}`,
    vAxis: { title: `${vAxisTitle}` },
    hAxis: { title: `${hAxisTitle}` },
    seriesType: "bars",
    legend: "none",
  };
  return (
    <Chart
      chartType="ComboChart"
      width="100%"
      height="300px"
      data={data}
      options={options}
    />
  );
}
