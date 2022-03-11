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
import { Link } from "react-router-dom";
import { Alarm } from "../../common/repository/AlarmRepository";
import AreYouSureDialog from "../../components/AreYouSureDialog";
import { useAppSelector } from "../../hooks";
import {
  activateAlarm,
  deactivateAlarm,
  deleteAlarm,
  fetchAlarms,
} from "./alarmsActions";

function DeleteButton({ alarmId }: { alarmId: string }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(deleteAlarm(alarmId));
    handleClose();
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton onClick={() => setOpen(true)}>
        <Delete />
      </IconButton>
      <AreYouSureDialog
        open={open}
        title="Delete alarm?"
        text="Are you sure that you want to delete alarm?"
        yesLabel="Delete"
        noLabel="Cancel"
        yesAction={handleSubmit}
        handleClose={handleClose}
      />
    </div>
  );
}

function AlarmItem({ alarm }: { alarm: Alarm }) {
  const dispatch = useDispatch();

  const toggle = (active: boolean, id: string) => {
    if (active) dispatch(deactivateAlarm(id));
    else dispatch(activateAlarm(id));
  };

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
            <IconButton onClick={() => toggle(alarm.active, alarm.id)}>
              <Avatar
                src={
                  alarm.active
                    ? "/images/notification-bell.png"
                    : "/images/notification-bell-inactive.png"
                }
              />
            </IconButton>
          </ListItemAvatar>
          <ListItemText
            primary={
              <Typography component={Link} to={`${alarm.id}`}>
                {`${alarm.name} (${alarm.trigger.key} ${alarm.trigger.operator} ${alarm.trigger.value})`}
              </Typography>
            }
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
          <DeleteButton alarmId={alarm.id} />
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
      <Grid container direction="row" alignItems="center" sx={{ padding: 2 }}>
        <Grid item xs>
          <Typography variant="h5">Alarms</Typography>
        </Grid>
        <Grid item xs>
          <Grid container direction="row" justifyContent="flex-end">
            <Tooltip title="Add new alarm">
              <IconButton color="primary" component={Link} to="new-alarm">
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
          <Typography textAlign="center" sx={{ paddingTop: 2 }}>
            No alarms
          </Typography>
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
