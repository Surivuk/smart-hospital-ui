import { Avatar, Button, Grid, Typography } from '@mui/material';
import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';

export default function RemovedTherapy() {
    const location = useLocation();
    const { therapyId } = useParams()

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
            Removed therapy from treatment
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
              to={location.pathname.split(`/therapies/${therapyId as string}`)[0]}
            >
              Back to the hospital treatment
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
}
