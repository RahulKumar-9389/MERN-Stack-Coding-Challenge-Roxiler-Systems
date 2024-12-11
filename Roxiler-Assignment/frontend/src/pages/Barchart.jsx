import { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
} from "chart.js";
import { useNavigate } from "react-router-dom";

Chart.register(CategoryScale, LinearScale, BarController, BarElement);

export default function BarChart() {
  const navigate = useNavigate();
  const [priceRangesData, setPriceRangesData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(3);

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/charts/barChart?month=${selectedMonth}`
      );
      setPriceRangesData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const data = {
    labels: priceRangesData.map((range) => range.range),
    datasets: [
      {
        label: "Number of Items",
        data: priceRangesData.map((range) => range.count),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
        offset: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Price Range Distribution</h2>
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
          className="m-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => navigate("/")}
        >
          Click here to go back...
        </button>
        <div className="w-full h-64">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
}
