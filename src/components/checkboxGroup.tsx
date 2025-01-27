import React from "react";
import { FormGroup, FormControlLabel, Checkbox, FormLabel } from "@mui/material";

interface CheckboxGroupProps {
  name: string;
  label: string;
  options: string[];
  selectedOptions: string[];
  onChange: (selectedOptions: string[]) => void;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ name, label, options, selectedOptions, onChange }) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    const updatedSelection = checked
      ? [...selectedOptions, value]
      : selectedOptions.filter((option) => option !== value);

    onChange(updatedSelection);
  };

  return (
    <FormGroup>
      <FormLabel>{label}</FormLabel>
      {options.map((option, index) => (
        <FormControlLabel
          key={index}
          control={
            <Checkbox
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={handleCheckboxChange}
            />
          }
          label={option}
        />
      ))}
    </FormGroup>
  );
};

export default CheckboxGroup;
