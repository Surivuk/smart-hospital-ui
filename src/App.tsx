import { Box, Container, Divider, Grid, Paper } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import AppBreadcrumbs from "./components/AppBreadcrumbs";
import AppNavigation from "./components/AppNavigation";
import { Notification } from "./notification/Notification";

function App() {
  return (
    <Container>
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
          <AppBreadcrumbs />
          <Paper>
            <Outlet />
          </Paper>
        </Grid>
      </Grid>
      <Notification />
    </Container>
  );
}

export default App;
function socketIOClient(ENDPOINT: any) {
  throw new Error("Function not implemented.");
}
