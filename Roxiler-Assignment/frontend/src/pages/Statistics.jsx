import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Statistics() {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(3);
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/data/statistics?month=${selectedMonth}`
      );
      setStatistics(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Statistics for Selected Month</h2>
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
      {statistics && (
        <table className="border-collapse border border-black">
          <thead>
            <tr>
              <th className="p-2 border border-black">Total Sale Amount</th>
              <th className="p-2 border border-black">Total Sold Items</th>
              <th className="p-2 border border-black">Total Not Sold Items</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border border-black">
                ${statistics.totalSaleAmount}
              </td>
              <td className="p-2 border border-black">
                {statistics.totalSoldItems}
              </td>
              <td className="p-2 border border-black">
                {statistics.totalNotSoldItems}
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
}
