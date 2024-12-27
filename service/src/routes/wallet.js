const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const Transaction = require("../models/Transaction");

// Transfer money between users
router.post("/transfer", async (req, res) => {
  const { fromName, toName, amount } = req.body;

  try {
    if (!fromName || !toName || amount <= 0) {
      return res.status(400).json({ message: "Invalid transfer details." });
    }

    const sender = await User.findOne({ name: fromName });
    const receiver = await User.findOne({ name: toName });

    if (!sender || !receiver) {
      return res.status(404).json({ message: "Sender or Receiver not found." });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ message: "Insufficient balance." });
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    const transaction = new Transaction({
      fromName,
      toName,
      amount,
    });
    await transaction.save();

    res.status(200).json({
      message: "Transfer successful.",
      senderBalance: sender.balance,
      receiverBalance: receiver.balance,
      transaction,
    });
  } catch (error) {
    console.error("Error during transfer:", error);
    res.status(500).json({ message: "Server error." });
  }
});

// Get all transactions for a user
router.get("/transactions", async (req, res) => {
  const { name } = req.query;

  try {
    const transactions = await Transaction.find({
      $or: [{ fromName: name }, { toName: name }],
    }).sort({ date: -1 });

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Server error." });
  }
});

module.exports = router;