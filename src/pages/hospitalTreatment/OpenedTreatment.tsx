import {
  Avatar,
  Button, Grid, Typography
} from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export function OpenedTreatment() {
  const location = useLocation();

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
          Successfully opened hospital treatment
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
            to={location.pathname.split("/open-treatment")[0]}
          >
            Back to the medical card
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
