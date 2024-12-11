import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CombinedData() {
  const navigate = useNavigate();
  const [combinedData, setCombinedData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(1);

  useEffect(() => {
    fetchData();
  }, [selectedMonth]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/combinedData?month=${selectedMonth}`
      );
      setCombinedData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Combined Data</h2>
      <div className="mb-4">
        <label htmlFor="month" className="mr-2">
          Select Month:
        </label>
        <select
          id="month"
          className="px-4 py-2 border rounded-md"
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
      </div>
      <button className="m-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={() => navigate("/")}>Click here to go back...</button>
      {combinedData && (
        <div>
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">Bar Chart Data</h3>
            <pre className="bg-gray-100 p-4 rounded-md">
              {JSON.stringify(combinedData.barChartData, null, 2)}
            </pre>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-2">Pie Chart Data</h3>
            <pre className="bg-gray-100 p-4 rounded-md">
              {JSON.stringify(combinedData.pieChartData, null, 2)}
            </pre>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Statistics Data</h3>
            <pre className="bg-gray-100 p-4 rounded-md">
              {JSON.stringify(combinedData.statisticsData, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
