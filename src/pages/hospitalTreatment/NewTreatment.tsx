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
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { OpenedTreatment } from "./OpenedTreatment";
import { openTreatment } from "./treatmentActions";
import { diagnosisChanged, stateRestarted } from "./treatmentSlice";

export default function NewTreatment() {
  const { id } = useParams();
  const { diagnosis, opened } = useAppSelector((state) => state.hospitalTreatment);
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(stateRestarted());
    };
  }, [dispatch]);

  const changeInput = (event: any) => {
    dispatch(diagnosisChanged(event.target.value));
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    dispatch(openTreatment(id as string));
  };

  if (opened) return <OpenedTreatment />;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5">Open new hospital treatment</Typography>
      <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
      <form onSubmit={onSubmit}>
        <TextField
          id="diagnosis"
          label="Diagnosis"
          multiline
          value={diagnosis}
          required
          fullWidth
          rows={5}
          onChange={changeInput}
        />
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          sx={{ marginTop: 2 }}
        >
          <Button type="submit">Open</Button>
        </Grid>
      </form>
    </Box>
  );
}
