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

function ChangeLabelButton() {
  return (
    <IconButton>
      <Settings />
    </IconButton>
  );
}

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
      <PageHeader title="Therapy" subtitle={therapyId as string}  iconType="therapy"/>

      <Paper variant="outlined" sx={{ margin: 2 }}>
        <Box sx={{ padding: 2 }}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Grid item xs>
              <Typography variant="subtitle1">
                Label: <strong>{label}</strong>
              </Typography>
            </Grid>
            <Grid item xs>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                <ChangeLabelButton />
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Divider />
        <Box sx={{ paddingTop: 2, paddingLeft: 2, paddingRight: 2 }}>
          <Grid container direction="row" alignItems="center">
            <Grid item xs>
              <Typography variant="subtitle1">Medicaments</Typography>
            </Grid>
            <Grid item xs>
              <Grid container direction="row" justifyContent="flex-end">
                <Tooltip title="Add new medicament to the therapy">
                  <IconButton component={Link} to={"add-medicament"}>
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
    </div>
  );
}
