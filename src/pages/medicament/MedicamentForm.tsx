import {
  Button,
  Grid,
  InputAdornment,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Picker } from "../../components/Picker";
import { useAppSelector } from "../../hooks";
import { medicamentFormInputChanged, stateRestarted } from "./medicamentSlice";

const frequencies = [
  { key: "daily", value: "daily" },
  { key: "every other day", value: "every other day" },
  { key: "twice a day", value: "twice a day" },
  { key: "three times a day", value: "three times a day" },
  { key: "four times a day", value: "four times a day" },
  { key: "every bedtime", value: "every bedtime" },
  { key: "every 4 hours", value: "every 4 hours" },
  { key: "every 4 to 6 hours", value: "every 4 to 6 hours" },
  { key: "every week", value: "every week" },
];
const routes = [
  { key: "PO (by mouth)", value: "PO (by mouth)" },
  { key: "PR (per rectum)", value: "PR (per rectum)" },
  { key: "IM (intramuscular)", value: "IM (intramuscular)" },
  { key: "IV (intravenous)", value: "IV (intravenous)" },
  { key: "ID (intradermal)", value: "ID (intradermal)" },
  { key: "IN (intranasal)", value: "IN (intranasal)" },
  { key: "TP (topical)", value: "TP (topical)" },
  { key: "SL (sublingual)", value: "SL (sublingual)" },
  { key: "BUCC (buccal)", value: "BUCC (buccal)" },
  { key: "IP (intraperitoneal)", value: "IP (intraperitoneal)" },
];

interface MedicamentFormProps {
  onSubmit(): void;
  onClose(): void;
}

export default function MedicamentForm(props: MedicamentFormProps) {
  const dispatch = useDispatch();

  const { medicamentId, strength, amount, frequency, route, medicaments } = useAppSelector(
    (state) => ({
      ...state.medicament,
    })
  );

  const handleSelectChange = (event: SelectChangeEvent) => {
    dispatch(
      medicamentFormInputChanged({
        type: event.target.name,
        value: event.target.value as string,
      })
    );
  };
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      medicamentFormInputChanged({
        type: event.target.id,
        value: event.target.value,
      })
    );
  };
  const onSubmit = (event: any) => {
    event.preventDefault();
    props.onSubmit();
  };
  const onClose = () => {
    props.onClose();
    dispatch(stateRestarted());
  };

  return (
    <form onSubmit={onSubmit}>
      <Picker
        label="Medicament"
        name="medicamentId"
        options={medicaments}
        required
        selectedValue={medicamentId}
        onChange={handleSelectChange}
      />
      <TextField
        id="strength"
        label="Strength"
        variant="outlined"
        type="number"
        sx={{ marginTop: 1, marginBottom: 1 }}
        onChange={handleTextChange}
        value={strength}
        fullWidth
        required
        InputProps={{
          endAdornment: <InputAdornment position="end">mg</InputAdornment>,
        }}
      />
      <TextField
        id="amount"
        label="Amount"
        type="number"
        sx={{ marginTop: 1, marginBottom: 1 }}
        variant="outlined"
        value={amount}
        fullWidth
        required
        onChange={handleTextChange}
      />
      <Picker
        label="Route"
        name="route"
        options={routes}
        selectedValue={route}
        onChange={handleSelectChange}
        required
      />
      <Picker
        label="Frequency"
        name="frequency"
        options={frequencies}
        selectedValue={frequency}
        onChange={handleSelectChange}
        required
      />
      <Grid container direction="row" justifyContent="flex-end">
        <Button type="submit">Add Medicament</Button>
        <Button color="error" onClick={onClose}>
          Cancel
        </Button>
      </Grid>
    </form>
  );
}
