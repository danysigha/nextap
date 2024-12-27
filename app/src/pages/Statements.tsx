import React, { useEffect, useState } from "react";
import { List, ListItem, ListItemText, Typography } from "@mui/material";
import "../styles/Statements.css";

interface Transaction {
  fromName: string;
  toName: string;
  amount: number;
  date: string;
}

const Statements: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const loggedInUserName = "Arslan Parker"; // Replace with dynamic user context

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `http://localhost:3200/api/wallet/transactions?name=${loggedInUserName}`
        );

        if (!response.ok) throw new Error("Failed to fetch transactions");

        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="statements-container">
      <Typography variant="h5">Recent Transactions</Typography>
      <List>
        {transactions.map((transaction, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={`Transaction ${index + 1}`}
              secondary={`From: ${transaction.fromName}, To: ${transaction.toName}, Amount: $${transaction.amount}, Date: ${new Date(transaction.date).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Statements;