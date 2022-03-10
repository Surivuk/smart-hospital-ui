import { Avatar, Button, Grid, Typography } from '@mui/material';
import React from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';

export default function ClosedTreatment() {
    const location = useLocation();
    const { treatmentId } = useParams()

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
            Hospital treatment is closed
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
              to={location.pathname.split(`/hospital-treatments/${treatmentId as string}`)[0]}
            >
              Back to the medical card
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
}
