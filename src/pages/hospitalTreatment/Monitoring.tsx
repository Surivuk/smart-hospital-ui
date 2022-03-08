import { Grid, Typography, Box } from "@mui/material";
import React from "react";
import { lightGreen, grey } from "@mui/material/colors";
import { useAppSelector } from "./../../hooks";

function MonitoringItem({ title, value }: { title: string; value: string }) {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs>
        <Typography variant="subtitle1" sx={{ color: lightGreen.A700 }}>
          <strong>{title}</strong>
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography variant="body1" sx={{ color: lightGreen.A400 }}>
          <strong>{value}</strong>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default function Monitoring() {
  const [bip, setBip] = React.useState(false);

  const { SPO2, PI, pulse, temperature, systolic, diastolic, timestamp } =
    useAppSelector((state) => ({
      SPO2: state.hospitalTreatment.monitoring["SPO2"],
      systolic: state.hospitalTreatment.monitoring["systolic-blood-pressure"],
      diastolic: state.hospitalTreatment.monitoring["diastolic-blood-pressure"],
      PI: state.hospitalTreatment.monitoring["PI"],
      pulse: state.hospitalTreatment.monitoring["pulse"],
      temperature: state.hospitalTreatment.monitoring["temperature"],
      timestamp: state.hospitalTreatment.monitoring["timestamp"],
    }));

  React.useEffect(() => {
    setBip(true);
    setTimeout(() => {
      setBip(false);
    }, 500);
  }, [timestamp]);

  return (
    <Box
      sx={{
        backgroundColor: grey[600],
        padding: 1,
        margin: 2,
        borderRadius: 16,
      }}
    >
      <Box
        sx={{
          backgroundColor: "black",
          padding: 2,
          borderRadius: 16,
        }}
      >
        <Grid container direction="row">
          <Grid item xs>
            <MonitoringItem title="SPO2 (%)" value={SPO2} />
          </Grid>
          <Grid item xs>
            <MonitoringItem title="PI (%)" value={PI} />
          </Grid>
          <Grid item xs>
            <MonitoringItem title="Temp. (℃)" value={temperature} />
          </Grid>
          <Grid item xs>
            <MonitoringItem title="PULSE (bpm)" value={pulse} />
          </Grid>
          <Grid item xs>
            <MonitoringItem
              title="BP (mmHg)"
              value={`${systolic}/${diastolic}`}
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ paddingTop: 2 }}
        >
          <Typography variant="caption" sx={{ color: lightGreen.A400 }}>
            {timestamp}
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ paddingTop: 2 }}
        >
          <Box
            sx={{
              backgroundColor: bip ? lightGreen.A400 : "black",
              padding: 0.8,
              borderRadius: 16,
            }}
          />
        </Grid>
      </Box>
    </Box>
  );
}
