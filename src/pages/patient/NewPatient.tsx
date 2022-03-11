import {
  Box,
  Typography,
  Divider,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Picker } from "../../components/Picker";
import { useAppSelector } from "../../hooks";
import { AddedPatient } from "./AddedPatient";
import { addPatient } from "./patientActions";
import { dataChanged, stateRestarted } from "./patientSlice";

const genders = [
  { key: "male", value: "male" },
  { key: "female", value: "female" },
];

export default function NewPatient() {
  const { firstName, lastName, gender, birthYear, added } = useAppSelector(
    (state) => state.patient
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(stateRestarted());
    };
  }, [dispatch]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addPatient())
  };

  const changeInput = (e: any) => {
    dispatch(dataChanged({ type: e.target.id, value: e.target.value }));
  };
  const changeSelectInput = (e: any) => {
    dispatch(dataChanged({ type: e.target.name, value: e.target.value }));
  };

  if(added) return <AddedPatient />

  return (
    <div>
      <Typography variant="h5" sx={{ paddingLeft: 2, paddingTop: 2 }}>
        Add new patient
      </Typography>
      <Divider sx={{ marginTop: 2 }} />
      <Box sx={{ padding: 2 }}>
        <form onSubmit={onSubmit}>
          <TextField
            id="firstName"
            label="First name"
            value={firstName}
            required
            fullWidth
            sx={{ marginBottom: 2 }}
            onChange={changeInput}
          />
          <TextField
            id="lastName"
            label="Last name"
            value={lastName}
            required
            fullWidth
            sx={{ marginBottom: 2 }}
            onChange={changeInput}
          />
          <Picker
            options={genders}
            selectedValue={gender}
            onChange={changeSelectInput}
            label="Gender"
            required
            name="gender"
          />
          <TextField
            id="birthYear"
            label="Birth year"
            value={birthYear}
            type="number"
            required
            fullWidth
            sx={{ marginBottom: 2, marginTop: 2 }}
            onChange={changeInput}
          />
          <Grid container direction="row" justifyContent="flex-end">
            <Button type="submit">Add</Button>
          </Grid>
        </form>
      </Box>
    </div>
  );
}
