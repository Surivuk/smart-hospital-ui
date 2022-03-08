import { Avatar, Button, Grid, Typography } from "@mui/material";
import React from "react";

export function ProfileInfo() {
    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            sx={{ padding: 2, marginTop: 0 }}
        >
            <Avatar
                alt="Remy Sharp"
                src="/images/doctor.png"
                sx={{ width: 200, height: 200 }} />
            <Typography textAlign="center" variant="h4">
                Dr. John Doe
            </Typography>
            <Button size="small">Logout</Button>
        </Grid>
    );
}
