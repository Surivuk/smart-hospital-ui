import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
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
import { addMedicament, prescribeTherapy } from "./therapyActions";
import { changedToLocal, stateRestarted } from "./therapySlice";
import { stateRestarted as medicamentClear } from "./../medicament/medicamentSlice";
import { PrescribedTherapy } from "./PrescribedTherapy";

export default function PrescribeTherapy() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const medicaments = useAppSelector((state) => state.therapy.medicaments);
  const prescribed = useAppSelector((state) => state.therapy.prescribed);

  const handleClose = () => {
    setOpen(false);
    dispatch(medicamentClear());
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

  if (prescribed === true) return <PrescribedTherapy />;

  return (
    <div>
      <PageHeader
        title="Prescribe Therapy"
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
        <Box sx={{ padding: 1 }} />
      </Paper>
      <NewMedicament
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
      />
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        sx={{ paddingRight: 2, paddingBottom: 2 }}
      >
        <Button disabled={medicaments.length === 0} onClick={() => dispatch(prescribeTherapy(id as string))}>
          Prescribe
        </Button>
      </Grid>
    </div>
  );
}
