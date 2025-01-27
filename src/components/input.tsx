import React from "react";
import { TextField } from "@mui/material";

interface TextInputProps {
  label: string;
  name: string;
  value: string | number;
  type?: string;
  onChange: (name: string, value: string | number) => void;
}

const TextInput: React.FC<TextInputProps> = ({ label, name, value, type = "text", onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = type === "number" ? Number(event.target.value) : event.target.value;
    onChange(name, inputValue);
  };

  return (
    <TextField
      fullWidth
      label={label}
      name={name}
      type={type}
      value={value}
      onChange={handleChange}
      variant="outlined"
    />
  );
};

export default TextInput;
