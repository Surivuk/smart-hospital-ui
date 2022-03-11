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
import { CreatedExamination } from "./CreatedExamination";
import { createExamination } from "./examinationActions";
import { dataChanged, stateRestarted } from "./examinationSlice";

export default function NewExamination() {
  const { id } = useParams();
  const { diagnosis, created } = useAppSelector((state) => state.examination);
  const dispatch = useDispatch();

  React.useEffect(() => {
    return () => {
      dispatch(stateRestarted());
    };
  }, [dispatch]);

  const changeInput = (event: any) => {
    console.log(event.target.id)
    dispatch(dataChanged({ type: event.target.id, value: event.target.value }));
  };

  const onSubmit = (event: any) => {
    event.preventDefault();
    dispatch(createExamination(id as string));
  };

  if (created) return <CreatedExamination />;

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5">New examination</Typography>
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
        <Grid container direction="row" justifyContent="flex-end" sx={{ marginTop: 2}}>
          <Button type="submit">Done</Button>
        </Grid>
      </form>
    </Box>
  );
}
