import React from "react";
import { Grid, Button } from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";

interface NumberPadProps {
  onNumberClick: (value: string) => void; // Handles number button clicks
  onDotClick: () => void; // Handles dot (.) button click
  onBackspace: () => void; // Handles backspace button click
}

const NumberPad: React.FC<NumberPadProps> = ({
  onNumberClick,
  onDotClick,
  onBackspace,
}) => {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0"];

  return (
    <Grid container spacing={2}>
      {numbers.map((item, index) => (
        <Grid item xs={4} key={index} style={{ textAlign: "center" }}>
          <Button
            variant="text"
            onClick={() => (item === "." ? onDotClick() : onNumberClick(item))}
            sx={{
              height: "60px",
              borderRadius: "8px",
              fontSize: "1.5rem",
              width: "100%",
            }}
          >
            {item}
          </Button>
        </Grid>
      ))}
      <Grid item xs={4}>
        <Button
          variant="text"
          color="error"
          onClick={onBackspace}
          sx={{
            height: "60px",
            borderRadius: "8px",
            fontSize: "1.5rem",
            width: "100%",
          }}
        >
          <BackspaceIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export default NumberPad;