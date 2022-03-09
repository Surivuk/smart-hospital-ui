import { Add } from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import MedicamentsTable from "../../components/MedicamentsTable";
import PageHeader from "../../components/PageHeader";
import { useAppSelector } from "../../hooks";
import NewMedicament from "../medicament/NewMedicament";
import { addMedicament } from "./therapyActions";
import { changedToLocal, stateRestarted } from "./therapySlice";

export default function StaticTherapy() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const medicaments = useAppSelector((state) => state.therapy.medicaments);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    dispatch(addMedicament());
    handleClose();
  };

  React.useEffect(() => {
    dispatch(changedToLocal());
    return () => {
      dispatch(stateRestarted());
    };
  }, [dispatch]);

  return (
    <div>
      <PageHeader
        title="PrescribeTherapy"
        subtitle="new therapy"
        iconType="medical-card-therapy"
      />

      <Paper variant="outlined" sx={{ margin: 2 }}>
        <Box sx={{ padding: 2 }}>
          <Grid container direction="row" alignItems="center">
            <Grid item xs>
              <Typography variant="subtitle1">Medicaments</Typography>
            </Grid>
            <Grid item xs>
              <Grid container direction="row" justifyContent="flex-end">
                <Tooltip title="Add new medicament to the therapy">
                  <IconButton onClick={() => setOpen(true)}>
                    <Add />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ paddingButton: 2, paddingLeft: 2, paddingRight: 2 }}>
          <MedicamentsTable medicaments={medicaments} />
        </Box>
      </Paper>
      <Box sx={{ padding: 0.1 }} />
      <NewMedicament
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
