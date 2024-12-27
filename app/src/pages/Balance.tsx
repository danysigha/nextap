import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { Grid, Typography } from "@mui/material";
import "../styles/Balance.css";

const Balance: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await fetch(
          "http://localhost:3200/api/wallet/balance?name=Arslan Parker" // Replace this dynamically based on the logged-in user
        );

        if (!response.ok) {
          throw new Error("Failed to fetch balance");
        }

        const data = await response.json();
        setBalance(data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="balance-container">
      
      <Grid container spacing={3} className="balance-content">
        <Grid item xs={12} className="balance-header">
          <Typography variant="h4" className="balance-amount">
            Your Balance: ${balance.toFixed(2)}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Balance;