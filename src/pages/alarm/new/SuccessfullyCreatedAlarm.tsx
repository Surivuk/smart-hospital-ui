import { Grid, Avatar, Typography, Button } from '@mui/material';
import React from 'react'
import { Link, useLocation } from 'react-router-dom';

export default function SuccessfullyCreatedAlarm() {
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
            Successfully created alarm
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
              to={location.pathname.split("/new-alarm")[0]}
            >
              Back to the alarms
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
}
