import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TransactionTable() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    fetchTransactions();
  }, [page, search]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/data/transactions?page=${page}&perPage=${perPage}&search=${search}`
      );
      if (Array.isArray(response.data)) {
        setTransactions(response.data);
      } else {
        setTransactions([]);
      }
    } catch (error) {
      console.error(error);
      setTransactions([]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-3/4">
        <h1 className="text-3xl mb-4">Product Transactions</h1>
        <button className="m-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={() => navigate("/")}>Click here to go back...</button>
        <div className="flex justify-between items-center mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="border border-gray-300 rounded px-4 py-2 mr-2 w-1/2"
          />
          <div>
            <button
              onClick={() => setPage((prevPage) => prevPage - 1)}
              disabled={page === 1}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((prevPage) => prevPage + 1)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        </div>
        <div className="overflow-y-auto max-h-80">
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 py-2 px-4">Title</th>
                <th className="border border-gray-400 py-2 px-4">
                  Description
                </th>
                <th className="border border-gray-400 py-2 px-4">Price</th>
                <th className="border border-gray-400 py-2 px-4">Sold</th>
                <th className="border border-gray-400 py-2 px-4">
                  Date of Sale
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 &&
                transactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td className="border border-gray-400 py-2 px-4">
                      {transaction.title}
                    </td>
                    <td className="border border-gray-400 py-2 px-4">
                      {transaction.description}
                    </td>
                    <td className="border border-gray-400 py-2 px-4">
                      ${transaction.price}
                    </td>
                    <td className="border border-gray-400 py-2 px-4">
                      {transaction.sold ? "Yes" : "No"}
                    </td>
                    <td className="border border-gray-400 py-2 px-4">
                      {new Date(transaction.dateOfSale).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
