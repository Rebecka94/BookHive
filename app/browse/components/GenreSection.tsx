"use client";

import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";

export default function GenreSection() {
  const [value, setValue] = React.useState("fantasy");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={value}
        onChange={handleChange}
      >
        <FormControlLabel value="fantasy" control={<Radio />} label="Fantasy" />
        <FormControlLabel value="romance" control={<Radio />} label="Romance" />
      </RadioGroup>
    </FormControl>
  );
}
