import { Delete } from "@mui/icons-material";
import {
  Grid,
  Box,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import React from "react";

export interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        sx={{ padding: 2 }}
      >
        <Grid item xs>
          <Box>
            <Typography variant="h5">{title}</Typography>
          </Box>
          <Box sx={{ width: 10 }} />
          <Box>
            <Typography variant="caption" color="gray">
              ({subtitle})
            </Typography>
          </Box>
        </Grid>
        <Grid item xs>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Button color="error">Close treatment</Button>
          </Grid>
        </Grid>
      </Grid>
      <Divider />
    </div>
  );
}
