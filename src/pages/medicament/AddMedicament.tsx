import {
  Button,
  Divider,
  Grid,
  InputAdornment,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import AppBreadcrumbs from "../../components/AppBreadcrumbs";
import { Picker } from "../../components/Picker";
import { useAppSelector } from "../../hooks";
import { addMedicament } from "./medicamentActions";
import { medicamentFormInputChanged, stateRestarted } from "./medicamentSlice";
import { SuccessfullyAdded } from "./SuccessfullyAdded";

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

export default function AddMedicament() {
  const location = useLocation();
  const { therapyId } = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(stateRestarted());
    };
  }, [dispatch]);

  const { medicamentId, strength, amount, frequency, route, added } =
    useAppSelector((state) => ({ ...state.medicament }));

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
    dispatch(addMedicament(therapyId as string));
  };

  if (added) return <SuccessfullyAdded />;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5">Add medicament to the therapy</Typography>
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      <form onSubmit={onSubmit}>
        <Picker
          label="Medicament"
          name="medicamentId"
          options={[
            { key: "1", value: "Medicament-1" },
            { key: "2", value: "Medicament-2" },
          ]}
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
          <Button
            color="error"
            component={Link}
            to={`${location.pathname.split("/add-medicament")[0]}`}
          >
            Cancel
          </Button>
        </Grid>
      </form>
    </Box>
  );
}
