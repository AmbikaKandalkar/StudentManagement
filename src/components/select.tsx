import React from "react";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

interface SelectInputProps {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (name: string, value: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = ({ label, name, value, options, onChange }) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(name, event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select value={value} onChange={handleChange}>
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
