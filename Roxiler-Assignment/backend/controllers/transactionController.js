import Transaction from "../models/Transaction.js";

export const transactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search = "" } = req.query;
    const regex = new RegExp(search, "i");
    const transactions = await Transaction.find({
      $or: [
        { title: regex },
        { description: regex },
        { price: parseFloat(search) || 0 },
      ],
    })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .exec();
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
