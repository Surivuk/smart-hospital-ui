import { Add } from "@mui/icons-material";
import {
  Typography,
  List,
  ListItem,
  Grid,
  IconButton,
  Tooltip,
  Divider,
  Paper,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PatientView from "../../components/PatientView";
import { useAppSelector } from "../../hooks";

import { fetchPatients } from "./patientsActions";

function PatientsHeader() {
  return (
    <Grid container direction="row" alignItems="center">
      <Grid item xs>
        <Typography textAlign="left" variant="h5">
          Patients
        </Typography>
      </Grid>
      <Grid item xs>
        <Grid container justifyContent="flex-end">
          <Tooltip title="Add new patient">
            <IconButton color="primary" component={Link} to="add-patient">
              <Add />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default function Patients() {
  const dispatch = useDispatch();
  const patients = useAppSelector((state) => state.patients.patients);

  React.useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  return (
    <Box sx={{ padding: 2 }}>
      <PatientsHeader />

      <Paper variant="outlined" sx={{ marginTop: 2 }}>
        <List>
          {patients.length === 0 && (
            <Typography textAlign="center" sx={{ padding: 2 }}>
              {" "}
              No Patients
            </Typography>
          )}
          {patients.map((patient, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              to={`/app/medical-card/${patient.id}`}
            >
              <PatientView {...patient} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
