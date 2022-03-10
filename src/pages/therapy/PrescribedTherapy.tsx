import {
  Avatar,
  Button, Grid, Typography
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";

export function PrescribedTherapy() {
  const dispatch = useDispatch();
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
          Successfully prescribed therapy
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
            to={location.pathname.split("/prescribe-therapy")[0]}
          >
            Back to the medical card
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
