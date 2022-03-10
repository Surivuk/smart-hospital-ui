import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

interface DatePickerProps {
  selectedDate: string;
  onChange(newValue: string): void;
}

export default function DatePicker({
  selectedDate,
  onChange,
}: DatePickerProps) {
  return (
    <Stack component="form" noValidate sx={{ padding: 1 }}>
      <TextField
        id="date"
        label="Selected date"
        type="date"
        defaultValue={selectedDate}
        onChange={(event) => onChange(event.target.value)}
        InputLabelProps={{
          shrink: true,
        }}
        fullWidth
      />
    </Stack>
  );
}
