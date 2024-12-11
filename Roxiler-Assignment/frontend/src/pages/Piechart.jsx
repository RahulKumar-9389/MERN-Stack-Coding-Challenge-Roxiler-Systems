import { useState, useEffect } from "react";
import axios from "axios";
import { Pie } from "react-chartjs-2";
import { Chart, PieController, ArcElement } from "chart.js";
import { useNavigate } from "react-router-dom";

Chart.register(PieController, ArcElement);

export default function PieChart() {
  const navigate = useNavigate();
  const [pieChartData, setPieChartData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(3);

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/charts/pieChart?month=${selectedMonth}`
      );
      setPieChartData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const data = {
    labels: pieChartData.map((data) => data.category),
    datasets: [
      {
        label: "Number of Items",
        data: pieChartData.map((data) => data.count),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
      },
    ],
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Pie Chart</h2>
        <select
          className="mb-4 p-2 border border-gray-300 rounded-md"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>
        <button
          className="m-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          Click here to go back...
        </button>
        <div className="w-full flex justify-center">
          <Pie data={data} />
        </div>
      </div>
    </div>
  );
}
