import { Grid, Typography } from "@mui/material";
import React from "react";

function MonitoringItem({ title, value }: { title: string; value: string }) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs>
        <Typography variant="subtitle1">SPO2</Typography>
      </Grid>
      <Grid item xs>
        <Typography variant="body1">98%</Typography>
      </Grid>
    </Grid>
  );
}

export default function Monitoring() {
  return (
    <div>
      <Grid container direction="row">
        <Grid item xs>
          <Typography variant="subtitle1">SPO2</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="subtitle1">PI</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="subtitle1">PULSE</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="subtitle1">BLOOD PRESSURE</Typography>
        </Grid>
      </Grid>
      <Grid container direction="row">
        <Grid item xs>
          <Typography variant="body1">98%</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="body1">2.5%</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="body1">75</Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="body1">124/75</Typography>
        </Grid>
      </Grid>
    </div>
  );
}
