import { Box,  List, ListItem, Paper, Typography } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ProfileInfo } from "./ProfileInfo";

const pages = [
  { name: "Home", url: "/app/home" }
];

export default function AppNavigation() {
  const location = useLocation();

  return (
    <div>
      <Paper>
        <ProfileInfo />
      </Paper>
      <Box sx={{ height: 20 }} />
      <Paper>
        <List>
          {pages.map(({ name, url }, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              to={url}
              selected={location.pathname.startsWith(url)}
            >
              <Typography textAlign="center" variant="button">
                {name}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Paper>
    </div>
  );
}
