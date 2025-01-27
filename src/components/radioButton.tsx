import React from "react";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";

interface RadioInputProps {
  name: string;
  label: string;
  value: string;
  options: string[];
  onChange: (name: string, value: string) => void;
}

const RadioInput: React.FC<RadioInputProps> = ({ name, label, value, options, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(name, event.target.value);
  };

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row value={value} onChange={handleChange}>
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option}
            control={<Radio />}
            label={option}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioInput;
