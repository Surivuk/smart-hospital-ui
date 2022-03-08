import { Container, Grid, Paper } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import AppNavigation from "./components/AppNavigation";

function App() {
  return (
    <Container >
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        <Grid item xs={3}>
          <AppNavigation />
        </Grid>

        <Grid item xs={9}>
          <Paper>
            <Outlet />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
