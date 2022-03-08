import {
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

export interface TherapyItemProps {
  label: string;
  createdAt: string;
}
export function TherapyItem({ label, createdAt }: TherapyItemProps) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar src={"/images/determined-therapy.png"} />
      </ListItemAvatar>
      <ListItemText
        primary={label}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            ></Typography>
            {createdAt}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
