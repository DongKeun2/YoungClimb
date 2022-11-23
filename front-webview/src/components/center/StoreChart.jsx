import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import "./store.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["Jun", "Jul", "Aug"],
  datasets: [
    {
      id: 1,
      label: "인생",
      data: [5, 6, 7],
    },
    {
      id: 2,
      label: "역전",
      data: [3, 2, 1],
    },
  ],
};

function StoreChart() {
  return (
    <div className="centerContainer">
      <div className="chartTitle">차트</div>
      <Chart type="line" datasetIdKey="id" data={data} />
    </div>
  );
}

export default StoreChart;
