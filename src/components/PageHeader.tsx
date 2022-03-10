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
import { Action } from "redux";
import AreYouSureDialog from "./AreYouSureDialog";

export interface PageHeaderProps {
  title: string;
  subtitle: string;
  actionTitle?: string;
  action?(): void;
  iconType?: string;
}

export default function PageHeader(props: PageHeaderProps) {
  const { title, subtitle, iconType, action, actionTitle } = props;
  const [open, setOpen] = React.useState(false);

  const handleSubmit = () => {
    if (action) action();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const icon = React.useMemo(() => {
    if (iconType === "therapy") return "/images/drugs.png";
    if (iconType === "medical-card-therapy") return "/images/therapies.png";
    if (iconType === "hospital-treatment")
      return "/images/hospital-treatments.png";
    if (iconType === "examination") return "/images/examinations.png";
    if (iconType === "alarm") return "/images/ambulance-lights.png";
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
                  variant="square"
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
          {actionTitle && action && (
            <Grid
              container
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Button color="error" onClick={() => setOpen(true)}>{actionTitle}</Button>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Divider />
      <AreYouSureDialog
        title={`${actionTitle
          ?.substring(0, 1)
          .toUpperCase()}${actionTitle?.substring(1, actionTitle.length)}?`}
        text={`Are you sure that you want to ${actionTitle}?`}
        yesLabel={`${actionTitle?.split(" ")[0]}`}
        noLabel="Cancel"
        yesAction={handleSubmit}
        handleClose={handleClose}
        open={open}
      />
    </div>
  );
}
