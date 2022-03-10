import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MedicamentsTable from "../../components/MedicamentsTable";
import PageHeader from "../../components/PageHeader";
import { useAppSelector } from "../../hooks";
import NewMedicament from "../medicament/NewMedicament";
import { addMedicament, determineTherapy, prescribeTherapy } from "./therapyActions";
import { changedToLocal, labelChanged, stateRestarted } from "./therapySlice";
import { stateRestarted as medicamentClear } from "../medicament/medicamentSlice";
import { DeterminedTherapy } from "./DeterminedTherapy";

export default function DetermineTherapy() {
  const { treatmentId } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const label = useAppSelector((state) => state.therapy.label);
  const medicaments = useAppSelector((state) => state.therapy.medicaments);
  const determined = useAppSelector((state) => state.therapy.determined);

  const handleClose = () => {
    setOpen(false);
    dispatch(medicamentClear());
  };

  const handleSubmit = () => {
    dispatch(addMedicament());
    handleClose();
  };

  const onChange = (event: any) => {
    dispatch(labelChanged(event.target.value));
  };

  React.useEffect(() => {
    dispatch(changedToLocal());
    return () => {
      dispatch(stateRestarted());
    };
  }, [dispatch]);

  if (determined === true) return <DeterminedTherapy />;

  return (
    <div>
      <PageHeader
        title="Determine Therapy"
        subtitle="new therapy"
        iconType="therapy"
      />

      <Paper variant="outlined" sx={{ margin: 2 }}>
        <Box sx={{ padding: 2 }}>
          <TextField
            label="Label"
            value={label}
            onChange={onChange}
            fullWidth
          />
        </Box>
        <Divider />
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
        <Button
          disabled={medicaments.length === 0}
          onClick={() => dispatch(determineTherapy(treatmentId as string))}
        >
          Determine
        </Button>
      </Grid>
    </div>
  );
}
