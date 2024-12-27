/**
 * MoneyTransfer Component
 *
 * This component provides a UI for users to transfer money via the "Request" or "Pay" options.
 * It includes a numeric input pad for entering the amount, a currency menu for selecting currencies,
 * and validation to ensure proper amounts are entered.
 *
 * Features:
 * - Numeric input pad for entering transfer amounts.
 * - Validation to ensure a valid numeric amount is entered.
 * - Navigation to the "Send/Receive" page with the entered transfer details.
 * - Integration with the `NumberPad` and `CurrencyMenu` components.
 *
 * Dependencies:
 * - React
 * - Material-UI for styling
 * - React Router for navigation
 * - Custom components: `NumberPad` and `CurrencyMenu`
 * - CSS file for styling (`MoneyTransfer.css`)
 */

import React, { useState } from "react";
import NumberPad from "../components/NumberPad"; // Component for numeric input
import CurrencyMenu from "../components/CurrencyMenu"; // Component for currency selection
import { useNavigate } from "react-router-dom";
import { Grid, TextField, Button } from "@mui/material";
import "../styles/MoneyTransfer.css"; // Styling for the component

interface MoneyTransferProps {
  user: {
    name: string;
    email: string;
    phone: string;
    cardNo: string;
    accNo: string;
  };
  setUser: (user: any) => void; // Function to update user state
}

const MoneyTransfer: React.FC<MoneyTransferProps> = ({ user, setUser }) => {
  const navigate = useNavigate(); // Hook for navigation
  const [amount, setAmount] = useState(""); // State to track the entered amount

  /**
   * Validates the entered amount.
   * Ensures the amount is a positive number.
   * @returns The numeric value if valid, otherwise 0.
   */
  const checkAmount = () => {
    const numericValue = parseFloat(amount);

    if (!isNaN(numericValue) && numericValue > 0) {
      return numericValue;
    } else {
      alert("Enter an amount greater than 0."); // Show error message
      setAmount(""); // Reset the amount
      return 0;
    }
  };

  /**
   * Handles the "Request" button click.
   * Navigates to the "Send/Receive" page with the entered amount and user details.
   */
  const handleReceive = () => {
    const numericValue = checkAmount();
    if (numericValue > 0) {
      navigate("/send-receive", {
        state: {
          passedAmount: numericValue,
          passedToName: user.name, // Requesting user
          passedFromName: "", // Payer is not specified
        },
      });
    }
  };

  /**
   * Handles the "Pay" button click.
   * Navigates to the "Send/Receive" page with the entered amount and user details.
   */
  const handlePay = () => {
    const numericValue = checkAmount();
    if (numericValue > 0) {
      navigate("/send-receive", {
        state: {
          passedAmount: numericValue,
          passedToName: "", // Recipient is not specified
          passedFromName: user.name, // Paying user
        },
      });
    }
  };

  /**
   * Handles number button clicks on the numeric pad.
   * Appends the clicked number to the current amount.
   * @param num - The number clicked
   */
  const handleNumberClick = (num: string) => {
    setAmount((prev) => prev + num);
  };

  /**
   * Handles the "." button click on the numeric pad.
   * Adds a decimal point to the current amount if not already present.
   */
  const handleDotClick = () => {
    if (!amount.includes(".")) setAmount((prev) => prev + ".");
  };

  /**
   * Handles the backspace button click on the numeric pad.
   * Removes the last character from the current amount.
   */
  const handleBackspace = () => {
    setAmount((prev) => prev.slice(0, -1));
  };

  return (
    <div className="money-transfer-container">
      <div className="money-transfer-content">
        {/* Amount Input Field */}
        <TextField
          InputLabelProps={{
            style: { color: "white" }, // Styling for the label
          }}
          value={amount} // Display the current amount
          variant="outlined"
          fullWidth
          sx={{
            marginBottom: "16px",
            "& .MuiInputBase-input": {
              padding: "0px",
              margin: "0px",
              color: "white",
              caretColor: "transparent",
              fontSize: "5rem",
              textAlign: "center", // Center align the amount
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "none", // Remove border for better aesthetics
              },
            },
          }}
        />

        {/* Currency Selector */}
        <CurrencyMenu />

        {/* Numeric Pad */}
        <NumberPad
          onNumberClick={handleNumberClick} // Handle number button clicks
          onDotClick={handleDotClick} // Handle "." button click
          onBackspace={handleBackspace} // Handle backspace button click
        />

        {/* Action Buttons */}
        <div className="send-receive-buttons">
          <Button className="receive-button" onClick={handleReceive}>
            Request
          </Button>
          <Button className="send-button" onClick={handlePay}>
            Pay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MoneyTransfer;