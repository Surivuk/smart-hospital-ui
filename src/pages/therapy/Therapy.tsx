import { Add } from "@mui/icons-material";
import { Box, Grid, IconButton, Tooltip, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import MedicamentsTable from "../../components/MedicamentsTable";
import PageHeader from "../../components/PageHeader";
import { useAppSelector } from "../../hooks";
import { fetchTherapyData } from "./therapyActions";
import { stateRestarted } from "./therapySlice";

export default function Therapy() {
  const { therapyId } = useParams();
  const dispatch = useDispatch();

  const { label, medicaments } = useAppSelector((state) => ({
    label: state.therapy.label,
    medicaments: state.therapy.medicaments,
  }));

  React.useEffect(() => {
    return () => {
      dispatch(stateRestarted());
    };
  }, [dispatch]);

  React.useEffect(() => {
    if (therapyId) dispatch(fetchTherapyData(therapyId));
  }, [dispatch, therapyId]);

  return (
    <div>
      <PageHeader title="Therapy" subtitle={therapyId as string} />

      <Box sx={{ padding: 2 }}>
        <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
          Label: <strong>{label}</strong>
        </Typography>
        <Grid container direction="row">
          <Grid item xs>
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
              Medicaments
            </Typography>
          </Grid>
          <Grid item xs>
            <Grid container direction="row" justifyContent="flex-end">
              <Tooltip title="Introduce medicament in therapy">
                <IconButton>
                  <Add />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Grid>
        <MedicamentsTable medicaments={medicaments} />
      </Box>
    </div>
  );
}
