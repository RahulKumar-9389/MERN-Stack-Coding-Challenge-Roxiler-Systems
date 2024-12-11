import Transaction from "../models/Transaction.js";

export const barChart = async (req, res) => {
  const { month } = req.query;
  const parsedMonth = parseInt(month);

  const currentYear = new Date().getFullYear() - 2; //converting dates to the year 2022 due to database consisting of dates of year 2022
  const startDate = new Date(currentYear, parsedMonth - 1, 1);
  const endDate = new Date(currentYear, parsedMonth, 0);

  console.log("start", startDate);
  console.log("End", endDate);

  try {
    const selectedMonthTransactions = await Transaction.find({
      dateOfSale: { $gte: startDate, $lte: endDate },
    });

    const priceRanges = [
      { range: "0 - 100", count: 0 },
      { range: "101 - 200", count: 0 },
      { range: "201 - 300", count: 0 },
      { range: "301 - 400", count: 0 },
      { range: "401 - 500", count: 0 },
      { range: "501 - 600", count: 0 },
      { range: "601 - 700", count: 0 },
      { range: "701 - 800", count: 0 },
      { range: "801 - 900", count: 0 },
      { range: "901 - above", count: 0 },
    ];

    selectedMonthTransactions.forEach((transaction) => {
      const price = transaction.price;
      if (price >= 0 && price <= 100) {
        priceRanges[0].count++;
      } else if (price >= 101 && price <= 200) {
        priceRanges[1].count++;
      } else if (price >= 201 && price <= 300) {
        priceRanges[2].count++;
      } else if (price >= 301 && price <= 400) {
        priceRanges[3].count++;
      } else if (price >= 401 && price <= 500) {
        priceRanges[4].count++;
      } else if (price >= 501 && price <= 600) {
        priceRanges[5].count++;
      } else if (price >= 601 && price <= 700) {
        priceRanges[6].count++;
      } else if (price >= 701 && price <= 800) {
        priceRanges[7].count++;
      } else if (price >= 801 && price <= 900) {
        priceRanges[8].count++;
      } else {
        priceRanges[9].count++;
      }
    });

    res.json(priceRanges);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
