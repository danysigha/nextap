/**
 * SendReceive Component
 *
 * This component facilitates money transfer between users. It retrieves transfer details from
 * the previous state (passed via `useLocation`) or user input, and allows users to confirm,
 * edit, or cancel the transfer. The API request is sent to the backend to process the transfer.
 *
 * Features:
 * - Displays sender, receiver, and amount details
 * - API integration for wallet transfer
 * - Success and error handling with feedback messages
 * - Navigation to edit or cancel the transaction
 *
 * Dependencies:
 * - React
 * - Material-UI for UI components
 * - Axios for API requests
 * - React Router for navigation
 */

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import "../styles/SendReceive.css";

const SendReceive: React.FC = () => {
  // State variables for sender, receiver, amount, and feedback message
  const [fromName, setFromName] = useState<string>("");
  const [toName, setToName] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");

  const navigate = useNavigate(); // For navigation between routes
  const location = useLocation(); // Access state passed from the previous route
  const { passedAmount, passedToName, passedFromName } = location.state || {}; // Destructure passed state

  // Fetch the API base URL from environment variables
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3200";

  /**
   * Populate state variables with passed data on component mount
   */
  useEffect(() => {
    setAmount(passedAmount || 0); // Set the amount to passed amount or default to 0
    setToName(passedToName || ""); // Set the receiver's name
    setFromName(passedFromName || ""); // Set the sender's name
  }, [passedAmount, passedToName, passedFromName]);

  /**
   * Handles the transfer confirmation process
   * - Sends transfer details to the backend API
   * - Handles success or error responses
   */
  const handleTransfer = async () => {
    try {
      // Retrieve authentication token from local storage
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Unauthorized! Please log in again.");
        navigate("/login"); // Redirect to login if token is missing
        return;
      }

      // Send POST request to the API
      const response = await axios.post(
        `${apiUrl}/api/wallet/transfer`,
        {
          fromName, // Sender's name
          toName, // Receiver's name
          amount, // Transfer amount
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        }
      );

      // Display success message with updated balances
      setMessage(
        `Transfer successful! Sender Balance: $${response.data.senderBalance}, Receiver Balance: $${response.data.receiverBalance}`
      );
    } catch (error: any) {
      console.error("Transfer error:", error.response?.data || error.message);
      // Display error message from API response or fallback message
      setMessage(
        error.response?.data?.message || "An error occurred during the transfer."
      );
    }
  };

  /**
   * Cancels the transfer and navigates back to the homepage
   */
  const handleCancel = () => {
    navigate("/"); // Navigate to the homepage
  };

  return (
    <div className="send-receive-container">
      <Grid container className="send-receive-content" spacing={3}>
        {/* Sender Name */}
        <Grid item xs={12}>
          <TextField
            label="From Name (Sender)"
            variant="outlined"
            fullWidth
            value={fromName}
            onChange={(e) => setFromName(e.target.value)} // Update sender's name
            InputProps={{
              readOnly: !!passedFromName, // Make read-only if passed from state
              style: { color: "white" }, // Styling
            }}
          />
        </Grid>

        {/* Receiver Name */}
        <Grid item xs={12}>
          <TextField
            label="To Name (Receiver)"
            variant="outlined"
            fullWidth
            value={toName}
            onChange={(e) => setToName(e.target.value)} // Update receiver's name
            InputProps={{
              readOnly: !!passedToName, // Make read-only if passed from state
              style: { color: "white" }, // Styling
            }}
          />
        </Grid>

        {/* Amount */}
        <Grid item xs={12}>
          <TextField
            label="Amount"
            variant="outlined"
            fullWidth
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))} // Update amount
            InputProps={{
              readOnly: true, // Always read-only
              style: { color: "white" }, // Styling
            }}
          />
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12} className="action-buttons">
          <Button variant="contained" onClick={handleCancel} className="cancel-button">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate("/money-transfer")} // Navigate to edit transfer
            className="edit-button"
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleTransfer} // Trigger transfer confirmation
            className="confirm-button"
          >
            Confirm
          </Button>
        </Grid>

        {/* Feedback Message */}
        <Grid item xs={12}>
          <Typography className="message">{message}</Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default SendReceive;