import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, TextField, Alert } from "@mui/material";
import "../styles/AddCard.css";

const AddCard: React.FC = () => {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isNfcSupported, setIsNfcSupported] = useState<boolean>(true);

  // Check for NFC support on component mount
  useEffect(() => {
    if (!("NDEFReader" in window)) {
      setIsNfcSupported(false);
      log("NFC is not supported by your browser.");
    } else {
      log("NFC is supported by your browser.");
    }
  }, []);

  const log = (msg: string) => {
    setMessage((prev) => prev + "\n" + msg);
  };

  const handleScan = async () => {
    log("User clicked scan button");

    try {
      const ndef = new NDEFReader();
      await ndef.scan();
      log("> Scan started");

      ndef.addEventListener("readingerror", () => {
        log("Argh! Cannot read data from the NFC tag. Try another one?");
      });

      ndef.addEventListener("reading", (event) => {
        const ndefEvent = event as NDEFReadingEvent;
        const { message, serialNumber } = ndefEvent;

        log(`> Serial Number: ${serialNumber}`);
        log(`> Records: (${message.records.length})`);

        // Extract and set card number from NFC tag records if available
        if (message.records.length > 0) {
          const record = message.records[0];
          if (record.recordType === "text" && record.data) {
            const decoder = new TextDecoder();
            const decodedText = decoder.decode(record.data);
            setCardNumber(decodedText);
          }
        }
      });
    } catch (error) {
      log("Argh! " + error);
    }
  };

  const handleWrite = async () => {
    log("User clicked write button");

    try {
      const ndef = new NDEFReader();
      await ndef.write(cardNumber || "Hello world!");
      log("> Message written");
    } catch (error) {
      log("Argh! " + error);
    }
  };

  const handleMakeReadOnly = async () => {
    log("User clicked make read-only button");

    try {
      const ndef = new NDEFReader();
      await ndef.makeReadOnly();
      log("> NFC tag has been made permanently read-only");
    } catch (error) {
      log("Argh! " + error);
    }
  };

  return (
    <div className="add-card-container">
      <Grid container spacing={3} className="add-card-content">
        <Grid item xs={12}>
          <Typography variant="h4" className="add-card-header">
            Add Card
          </Typography>
        </Grid>

        {/* NFC Compatibility Message */}
        <Grid item xs={12}>
          {!isNfcSupported && (
            <Alert severity="error">
              NFC is not supported by your browser. Please try a compatible browser.
            </Alert>
          )}
          {isNfcSupported && (
            <Alert severity="success">
              NFC is supported by your browser.
            </Alert>
          )}
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Card Number"
            variant="outlined"
            fullWidth
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            className="input-field"
          />
        </Grid>

        <Grid item xs={12} className="add-card-actions">
          <Button
            variant="contained"
            color="primary"
            onClick={handleScan}
            className="scan-button"
            disabled={!isNfcSupported}
          >
            Scan NFC
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleWrite}
            className="write-button"
            disabled={!isNfcSupported}
          >
            Write NFC
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleMakeReadOnly}
            className="make-readonly-button"
            disabled={!isNfcSupported}
          >
            Make NFC Read-Only
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="body2" className="nfc-log" component="pre">
            {message}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddCard;
