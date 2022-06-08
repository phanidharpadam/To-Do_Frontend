import { Chart } from "react-google-charts";

export default function PieChart(props) {
  const { data, title } = props;
  const options = {
    title: `${title}`,
    is3D: true,
  };
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"300px"}
    />
  );
}
