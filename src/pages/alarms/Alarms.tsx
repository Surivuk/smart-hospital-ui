import { Add, Delete } from "@mui/icons-material";
import {
  Box,
  Divider,
  Paper,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  List,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Alarm } from "../../common/repository/AlarmRepository";
import { useAppSelector } from "../../hooks";
import { fetchAlarms } from "./alarmsActions";

function AlarmItem({ alarm }: { alarm: Alarm }) {
  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Grid item xs>
        <Grid container alignItems="center" justifyContent="flex-start">
          <ListItemAvatar sx={{ marginRight: 1 }}>
            <IconButton>
              <Avatar src="/images/notification-bell.png" />
            </IconButton>
          </ListItemAvatar>
          <ListItemText
            primary={`${alarm.trigger.key} ${alarm.trigger.operator} ${alarm.trigger.value}`}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                ></Typography>
                {`ID - ${alarm.id}`}
              </React.Fragment>
            }
          />
        </Grid>
      </Grid>
      <Grid item xs>
        <Grid container justifyContent="flex-end">
          <IconButton>
            <Delete />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default function Alarms() {
  const alarms = useAppSelector((state) => state.alarms.alarms);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAlarms());
  }, [dispatch]);

  return (
    <Box>
      <Grid container direction="row" alignContent="center" sx={{ padding: 2 }}>
        <Grid item xs>
          <Typography variant="h5">Alarms</Typography>
        </Grid>
        <Grid item xs>
          <Grid container direction="row" justifyContent="flex-end">
            <Tooltip title="Add new alarm">
              <IconButton color="primary">
                <Add />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Paper
        variant="outlined"
        sx={{ marginLeft: 2, marginRight: 2, marginBottom: 2 }}
      >
        {alarms.length === 0 && (
          <Typography textAlign="center">No alarms</Typography>
        )}
        <List>
          {alarms.map((alarm, index) => (
            <ListItem key={index}>
              <AlarmItem alarm={alarm} />
            </ListItem>
          ))}
        </List>
      </Paper>
      <Divider />
    </Box>
  );
}
