import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

interface PatientViewProps {
  id: string;
  name: string;
  birthYear: number;
  gender: string;
}

export default function PatientView({
  id,
  name,
  birthYear,
  gender,
}: PatientViewProps) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar
          alt="Remy Sharp"
          src={gender === "male" ? "/images/man.png" : "/images/woman.png"}
        />
      </ListItemAvatar>
      <ListItemText
        primary={`${name} (${birthYear})`}
        secondary={
          <React.Fragment>
            <Typography
              sx={{ display: "inline" }}
              component="span"
              variant="body2"
              color="text.primary"
            >
            </Typography>
            {`Medical card: ${id}`}
          </React.Fragment>
        }
      />
    </ListItem>
  );
}
