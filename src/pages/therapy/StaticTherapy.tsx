import { Add, Settings } from "@mui/icons-material";
import {
  Box,
  Divider,
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
import { fetchTherapyData } from "./therapyActions";
import { stateRestarted } from "./therapySlice";


export default function StaticTherapy() {
  const { therapyId, treatmentId } = useParams();
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
      <PageHeader
        title="Therapy"
        subtitle={therapyId as string}
        iconType={
          treatmentId !== undefined ? "therapy" : "medical-card-therapy"
        }
      />

      <Paper variant="outlined" sx={{ margin: 2 }}>
        <Box sx={{ paddingTop: 2, paddingLeft: 2, paddingRight: 2 }}>
          <Typography variant="subtitle1">Medicaments</Typography>
        </Box>
        <Box sx={{ padding: 2 }}>
          <MedicamentsTable medicaments={medicaments} />
        </Box>
      </Paper>
      <Box sx={{ padding: 0.1 }} />
    </div>
  );
}
