import { Add, Search } from "@mui/icons-material";
import {
  Typography,
  Box,
  TextField,
  InputAdornment,
  List,
  ListItem,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import PatientView from "../../components/PatientView";
import { useAppSelector } from "../../hooks";

import { fetchPatients } from "./homeActions";

function HomeHeader() {
  return (
    <Grid container direction="row" alignItems="center">
      <Grid item xs>
        <Typography textAlign="left" variant="h4" sx={{ padding: 2 }}>
          Active Cases
        </Typography>
      </Grid>
      <Grid item xs>
        <Grid
          container
          justifyContent="flex-end"
          sx={(theme) => ({ paddingRight: theme.spacing(2) })}
        >
          <Tooltip title="Add new case">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
            >
              <Add />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default function Home() {
  const dispatch = useDispatch();
  const patients = useAppSelector((state) => state.home.patients);

  React.useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  return (
    <div>
      <div>
        <HomeHeader />
        <Box sx={{ padding: 2 }}>
          <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            placeholder="Enter the name of the patient..."
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <List>
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
      </div>
    </div>
  );
}
