import { Delete } from "@mui/icons-material";
import {
  Grid,
  Box,
  Typography,
  Divider,
  IconButton,
  Tooltip,
  Button,
  Avatar,
} from "@mui/material";
import React from "react";

export interface PageHeaderProps {
  title: string;
  subtitle: string;
  iconType?: string;
}

export default function PageHeader({
  title,
  subtitle,
  iconType,
}: PageHeaderProps) {
  const icon = React.useMemo(() => {
    if (iconType === "therapy") return "/images/drugs.png";
    if (iconType === "hospital-treatment")
      return "/images/hospital-treatments.png";
    if (iconType === "examination") return "/images/examinations.png";
    return undefined;
  }, [iconType]);
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
          <Grid container direction="row" alignItems="center">
            <Grid item>
              {icon && (
                <Avatar
                  src={icon}
                  sx={{ paddingRight: 2, height: 54, width: 54 }}
                />
              )}
            </Grid>
            <Grid item>
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
          </Grid>
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
