import {
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Link,
  List,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

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
      dispatch(stateRestarted())
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (id) dispatch(fetchMedicalCardData(id));
  }, [dispatch, id]);

  return (
    <div>
      <Box sx={{ padding: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link underline="hover" color="inherit" href="/">
            MUI
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/getting-started/installation/"
          >
            Core
          </Link>
          <Typography color="text.primary">Breadcrumbs</Typography>
        </Breadcrumbs>
      </Box>
      <Divider sx={{ marginBottom: 4 }} />
      <Paper elevation={2} sx={{ marginLeft: 6, marginRight: 6 }}>
        {patient && <PatientView {...patient} />}
      </Paper>
      <Box sx={{ padding: 2 }} />
      <Paper elevation={2} sx={{ marginLeft: 6, marginRight: 6 }}>
        <List>
          {medicalCard ? (
            <MedicalCardView medicalCard={medicalCard} />
          ) : (
            <Typography variant="subtitle1" align="center">
              No medical history
            </Typography>
          )}
        </List>
      </Paper>
      <Box sx={{ padding: 2 }} />
    </div>
  );
}
