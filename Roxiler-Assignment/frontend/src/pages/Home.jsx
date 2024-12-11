import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-wrap justify-center mt-36">
        <button
          className="m-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={() => {
            navigate("/table");
          }}
        >
          Transactions Table
        </button>
        <button
          className="m-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={() => {
            navigate("/stats");
          }}
        >
          Statistics
        </button>
        <button
          className="m-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
          onClick={() => {
            navigate("/bar");
          }}
        >
          Bar Chart
        </button>
        <button
          className="m-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          onClick={() => {
            navigate("/pie");
          }}
        >
          Pie Chart
        </button>
        <button
          className="m-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          onClick={() => {
            navigate("alldata");
          }}
        >
          All of the above
        </button>
      </div>
    </div>
  );
}
