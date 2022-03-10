import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Picker } from "../../../components/Picker";
import { useAppSelector } from "../../../hooks";
import { createAlarm, fetchAlarmData } from "./newAlarmsActions";
import { dataChanged, stateRestarted } from "./newAlarmSlice";
import SuccessfullyCreatedAlarm from "./SuccessfullyCreatedAlarm";

export default function NewAlarm() {
  const dispatch = useDispatch();

  const {
    activeHospitalTreatments,
    hospitalTreatmentId,
    name,
    key,
    keys,
    value,
    operator,
    operators,
    created,
  } = useAppSelector((state) => state.newAlarm);

  React.useEffect(() => {
    dispatch(fetchAlarmData());
    return () => {
      dispatch(stateRestarted());
    };
  }, [dispatch]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    dispatch(
      dataChanged({
        type: event.target.name,
        value: event.target.value as string,
      })
    );
  };
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      dataChanged({
        type: event.target.id,
        value: event.target.value,
      })
    );
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    dispatch(createAlarm());
  };

  if (created === true) return <SuccessfullyCreatedAlarm />;

  return (
    <div>
      <Typography variant="h5" sx={{ paddingLeft: 2, paddingTop: 2 }}>
        Create new alarm
      </Typography>
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />

      <Box sx={{ padding: 2 }}>
        <form onSubmit={onSubmit}>
          <TextField
            label="Name"
            id="name"
            value={name}
            onChange={handleTextChange}
            fullWidth
            sx={{ marginBottom: 2 }}
            required
          />
          <Picker
            options={activeHospitalTreatments}
            selectedValue={hospitalTreatmentId}
            onChange={handleSelectChange}
            label="Hospital treatment"
            name="hospitalTreatmentId"
            required
          />
          <Paper
            variant="outlined"
            sx={{ padding: 2, marginTop: 1, marginBottom: 1 }}
          >
            <Grid
              container
              spacing={3}
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Grid item xs>
                <Typography>Triggers when</Typography>
              </Grid>
              <Grid item xs>
                <Picker
                  options={keys}
                  selectedValue={key}
                  onChange={handleSelectChange}
                  label="Alarm key"
                  name="key"
                  required
                  notFullWidth
                />
              </Grid>
              <Grid item xs>
                <Picker
                  options={operators}
                  selectedValue={operator}
                  onChange={handleSelectChange}
                  label="Operator"
                  name="operator"
                  notFullWidth
                  required
                />
              </Grid>
              <Grid item xs>
                <TextField
                  label="value"
                  value={value}
                  onChange={handleTextChange}
                  id="value"
                  required
                />
              </Grid>
            </Grid>
          </Paper>
          <Grid container direction="row" justifyContent="flex-end">
            <Button type="submit">Create</Button>
          </Grid>
        </form>
      </Box>
    </div>
  );
}
