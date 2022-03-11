import { Box, Button, Divider, Grid, List, Paper, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import PatientView from "../../components/PatientView";
import { useAppSelector } from "../../hooks";
import { fetchMedicalCardData } from "./medicalCardActions";
import { stateRestarted } from "./medicalCardSlice";
import MedicalCardView from "./MedicalCardView";

export default function MedicalCard() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { patient, medicalCard } = useAppSelector((state) => ({
    patient: state.medicalCard.patient,
    medicalCard: state.medicalCard.medicalCard,
  }));

  React.useEffect(() => {
    return () => {
      dispatch(stateRestarted());
    };
  }, [dispatch]);

  React.useEffect(() => {
    if (id) dispatch(fetchMedicalCardData(id));
  }, [dispatch, id]);

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Medical Card
      </Typography>
      <Paper variant="outlined" sx={{ marginBottom: 2 }}>
        {patient && <PatientView {...patient} />}
      </Paper>

      <Paper variant="outlined" sx={{ marginBottom: 2 }}>
        <Grid container direction="row" alignItems="center">
          <Grid item xs><Button fullWidth component={Link} to="prescribe-therapy">New Therapy</Button></Grid>
          <Grid item xs><Button fullWidth component={Link} to="new-examination">New Examination</Button></Grid>
          <Grid item xs><Button fullWidth>New Treatment</Button></Grid>
        </Grid>
      </Paper>

      <Paper variant="outlined">
        <List>
          {medicalCard ? (
            <MedicalCardView medicalCard={medicalCard} />
          ) : (
            <Typography variant="body1" align="center">
              No medical history
            </Typography>
          )}
        </List>
      </Paper>
    </Box>
  );
}
