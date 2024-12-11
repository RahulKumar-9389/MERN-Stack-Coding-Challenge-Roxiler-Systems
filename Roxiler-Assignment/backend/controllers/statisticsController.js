import Transaction from "../models/Transaction.js";

export const statistics = async (req, res) => {
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

    const totalSaleAmount = selectedMonthTransactions.reduce(
      (total, transaction) => {
        return total + transaction.price;
      },
      0
    );

    const totalSoldItems = selectedMonthTransactions.filter(
      (transaction) => transaction.sold
    ).length;
    const totalNotSoldItems = selectedMonthTransactions.filter(
      (transaction) => !transaction.sold
    ).length;

    res.json({
      totalSaleAmount,
      totalSoldItems,
      totalNotSoldItems,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
