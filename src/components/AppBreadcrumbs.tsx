import { Box, Breadcrumbs, Link, Paper, Typography } from "@mui/material";
import { keys } from "@mui/system";
import React from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

function name(value: string) {
  if (value === "hospital-treatments") return "hospital-treatments";
  if (value === "therapies") return "therapy";
  return value;
}

export default function AppBreadcrumbs() {
  const [map, setMap] = React.useState<{ [key: string]: string[] }>({});
  const [keys, setKeys] = React.useState<string[]>([]);
  const [showBreadcrumbs, setShowBreadcrumbs] = React.useState(false);

  const location = useLocation();

  React.useEffect(() => {
    if (!location.pathname.startsWith("/app/medical-card")) {
      setShowBreadcrumbs(false);
      return;
    }
    setShowBreadcrumbs(
      location.pathname.split("/medical-card")[1].split("/").length > 2
    );
  }, [location, setShowBreadcrumbs]);

  React.useEffect(() => {
    if (!location.pathname.startsWith("/app/medical-card")) return;
    const map: { [key: string]: string[] } = {};
    const parts = location.pathname
      .split("/")
      .filter((part) => part !== "")
      .filter((part) => part !== "app");
    parts.forEach((part, index) => {
      if (index % 2 === 0) {
        map[part] = parts.slice(0, index + 2);
      }
    });
    setMap(map);
    setKeys(Object.keys(map));
  }, [location, setMap, setKeys]);
  if (showBreadcrumbs === false) return null;
  return (
    <Paper sx={{ marginBottom: 2 }}>
      <Box sx={{ padding: 2 }}>
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb" separator="›">
            {keys.map((key, index) => {
              if (index === keys.length - 1)
                return (
                  <Typography key={index} color="text.primary">
                    {name(key)}
                  </Typography>
                );
              return (
                <Link
                  key={index}
                  component={RouterLink}
                  underline="hover"
                  color="inherit"
                  to={`/app/${map[key].join("/")}`}
                >
                  {name(key)}
                </Link>
              );
            })}
          </Breadcrumbs>
        </div>
      </Box>
    </Paper>
  );
}
