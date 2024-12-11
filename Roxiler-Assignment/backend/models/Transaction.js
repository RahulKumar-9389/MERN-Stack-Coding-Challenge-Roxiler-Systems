
import mongoose from 'mongoose';

class TransactionSchema extends mongoose.Schema {
  constructor() {
    super({
      title: String,
      price: Number,
      description: String,
      category: String,
      image: String,
      sold: Boolean,
      dateOfSale: Date,
    });
  }
}
const Transaction = mongoose.model("Transaction", new TransactionSchema());

export default Transaction;
