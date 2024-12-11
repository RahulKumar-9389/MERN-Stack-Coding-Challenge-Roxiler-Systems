import { Routes, Route } from "react-router-dom";
import TransactionTable from "../pages/TransactionTable";
import Statistics from "../pages/Statistics";
import BarChart from "../pages/Barchart";
import PieChart from "../pages/Piechart";
import CombinedData from "../pages/CombinedData";
import Home from "../pages/Home";


export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/table" element={<TransactionTable />} />
      <Route path="/stats" element={<Statistics />} />
      <Route path="/bar" element={<BarChart />} />
      <Route path="/pie" element={<PieChart />} />
      <Route path="/alldata" element={<CombinedData/>} />
    </Routes>
  );
}
