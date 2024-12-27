import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const CurrencyMenu: React.FC = () => {
  const [currency, setCurrency] = React.useState("USD");

  const handleChange = (event: SelectChangeEvent) => {
    setCurrency(event.target.value); // Update selected currency
  };

  return (
    <FormControl sx={{ m: 1, maxWidth: 120 }} size="small">
      <Select
        variant="filled"
        sx={{
          color: "white", // Main text color
          "& .MuiSvgIcon-root": {
            color: "white", // Dropdown arrow color
            top: "40%",
          },
        }}
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={currency}
        label="Currency"
        onChange={handleChange}
      >
        <MenuItem value={"USD"}>USD</MenuItem>
        <MenuItem value={"BTC"}>BTC</MenuItem>
        <MenuItem value={"EUR"}>EUR</MenuItem>
        <MenuItem value={"ETH"}>ETH</MenuItem>
      </Select>
    </FormControl>
  );
};

export default CurrencyMenu;