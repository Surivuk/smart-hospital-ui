import {
  Avatar,
  Button, Grid, Typography
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { stateRestarted } from "./medicamentSlice";

export function SuccessfullyAdded() {
  const dispatch = useDispatch();
  const location = useLocation();

  const addNew = () => {
    dispatch(stateRestarted());
  };


  return (
    <Grid container direction="column" sx={{ padding: 2 }}>
      <Grid sx={{ padding: 2 }}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Avatar src={"/images/checked.png"} />
        </Grid>
      </Grid>

      <Grid>
        <Typography variant="subtitle1" align="center">
          Successfully added medicament to the therapy
        </Typography>
      </Grid>

      <Grid sx={{ padding: 2 }}>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            component={Link}
            to={location.pathname.split("/add-medicament")[0]}
          >
            Back to the therapy
          </Button>
          <Button onClick={addNew}>Add new medicament</Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
