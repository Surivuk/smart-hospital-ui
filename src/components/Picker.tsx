import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";

export interface PickerProps {
  name: string;
  label: string;
  options: { key: string; value: string }[];
  onChange(event: SelectChangeEvent): void;
  selectedValue: string;
  required?: boolean;
}

export function Picker(props: PickerProps) {
  const { name, label, options, selectedValue, onChange } = props;
  const required = props.required ? true : false

  return (
    <FormControl fullWidth sx={{ marginTop: 1, marginBottom: 1 }}>
      <InputLabel required={required} id={`${label.toLowerCase()}-picker-label`}>
        {label}
      </InputLabel>
      <Select
        name={name}
        labelId={`${label.toLowerCase()}-picker-label`}
        value={selectedValue}
        label={label}
        required={required}
        onChange={onChange}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option.key}>
            {option.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
