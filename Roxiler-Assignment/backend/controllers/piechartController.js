import Transaction from "../models/Transaction.js";

export const pieChart = async (req, res) => {
  const { month } = req.query;
  const parsedMonth = parseInt(month);
  const currentYear = new Date().getFullYear() - 2; //converting dates to the year 2022 due to database consisting of dates of year 2022
  const startDate = new Date(currentYear, parsedMonth - 1, 1);
  const endDate = new Date(currentYear, parsedMonth, 0);

  try {
    const selectedMonthTransactions = await Transaction.find({
      dateOfSale: { $gte: startDate, $lte: endDate },
    });
    const categoryCounts = {};

    selectedMonthTransactions.forEach((transaction) => {
      const category = transaction.category;
      if (category in categoryCounts) {
        categoryCounts[category]++;
      } else {
        categoryCounts[category] = 1;
      }
    });

    const pieChartData = Object.keys(categoryCounts).map((category) => ({
      category,
      count: categoryCounts[category],
    }));

    res.json(pieChartData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
